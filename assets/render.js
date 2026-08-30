(function () {
  var data = window.RESUME_DATA;
  var app = document.getElementById("app");

  function el(tag, className, html) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  function esc(text) {
    return String(text).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  var ROLE_CLASS = {
    title: "f-title",
    em: "f-em",
    strong: "f-strong",
    mono: "f-mono",
    muted: "f-muted",
    accent: "f-accent"
  };

  function hasItems(block) {
    return block.items && block.items.length > 0;
  }

  /* ---------- 条目渲染器 ---------- */

  function renderParagraphs(block) {
    var wrap = el("div", "paragraphs");
    block.items.forEach(function (text) {
      wrap.appendChild(el("p", "summary-p", esc(text)));
    });
    return wrap;
  }

  function renderChips(block) {
    var wrap = el("div", "chips");
    block.items.forEach(function (text) {
      wrap.appendChild(el("span", "chip", esc(text)));
    });
    return wrap;
  }

  function renderEdu(block) {
    var list = el("ul", "edu-list");
    block.items.forEach(function (e) {
      var li = el("li");
      li.appendChild(el("p", "edu-school", esc(e.school)));
      li.appendChild(el("p", "edu-detail", esc(e.major) + " · " + esc(e.degree)));
      list.appendChild(li);
    });
    return list;
  }

  function renderCardItem(item, fields, gridMode) {
    var card = el("article", "card");
    Object.keys(fields).forEach(function (key) {
      var role = fields[key];
      if (item[key] === undefined || item[key] === "") return;
      if (role === "badge") {
        card.appendChild(el("span", "year-badge", esc(item[key])));
      } else {
        card.appendChild(el("p", ROLE_CLASS[role] || "f-title", esc(item[key])));
      }
    });
    return card;
  }

  function renderCards(block) {
    var wrap = el("div", block.type === "cardgrid" ? "cardgrid" : "cards");
    block.items.forEach(function (item) {
      wrap.appendChild(renderCardItem(item, block.fields, block.type === "cardgrid"));
    });
    return wrap;
  }

  function renderBlockBody(block) {
    switch (block.type) {
      case "paragraphs": return renderParagraphs(block);
      case "chips": return renderChips(block);
      case "edu": return renderEdu(block);
      case "cards":
      case "cardgrid": return renderCards(block);
      default: return el("div", null, "未知区块类型：" + block.type);
    }
  }

  /* ---------- 区块（带标题） ---------- */

  function renderSideBlock(block) {
    if (!hasItems(block)) return null;
    var box = el("div", "side-block");
    box.appendChild(el("h2", null, esc(block.title)));
    box.appendChild(renderBlockBody(block));
    return box;
  }

  function renderSection(block) {
    if (block.type === "group") {
      var visibleBlocks = block.blocks.filter(hasItems);
      if (!visibleBlocks.length) return null;
      var section = el("section");
      section.appendChild(el("h2", null, esc(block.title)));
      visibleBlocks.forEach(function (sub) {
        section.appendChild(el("h3", null, esc(sub.title)));
        section.appendChild(renderBlockBody(sub));
      });
      return section;
    }

    if (!hasItems(block)) return null;
    var section = el("section");
    section.appendChild(el("h2", null, esc(block.title)));
    section.appendChild(renderBlockBody(block));
    return section;
  }

  /* ---------- 左栏：头像/姓名 + 联系 ---------- */

  var sidebar = el("aside", "sidebar");

  var hero = el("div", "hero");
  if (data.profile.avatar) {
    var avatar = el("img", "avatar");
    avatar.src = data.profile.avatar;
    avatar.alt = data.profile.name;
    hero.appendChild(avatar);
  }
  hero.appendChild(el("h1", null, esc(data.profile.name)));
  hero.appendChild(el("p", "tagline", esc(data.profile.title)));
  hero.appendChild(el("p", "tagline-sub", esc(data.profile.fields)));

  var contact = el("p", "contact");
  contact.appendChild(el("span", "contact-label", "邮箱："));
  var emailLink = el("a", "email-link", "点击查看");
  emailLink.href = "#";
  emailLink.setAttribute("data-email", data.profile.emailBase64);
  contact.appendChild(emailLink);
  hero.appendChild(contact);
  sidebar.appendChild(hero);

  data.sidebar.forEach(function (block) {
    var node = renderSideBlock(block);
    if (node) sidebar.appendChild(node);
  });

  /* ---------- 右栏 ---------- */

  var main = el("main", "main-content");
  data.sections.forEach(function (block) {
    var node = renderSection(block);
    if (node) main.appendChild(node);
  });

  var layout = el("div", "layout");
  layout.appendChild(sidebar);
  layout.appendChild(main);
  app.appendChild(layout);

  /* ---------- 页脚声明 ---------- */

  var footer = el("footer", "declaration");
  footer.appendChild(el("h2", null, "声明"));
  footer.appendChild(el("p", null, esc(data.declaration)));
  app.appendChild(footer);

  /* ---------- 邮箱混淆解码 ---------- */

  var address = atob(emailLink.getAttribute("data-email"));
  emailLink.textContent = address;
  emailLink.href = "mailto:" + address;
  emailLink.removeAttribute("data-email");
})();
