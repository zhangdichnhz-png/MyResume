window.RESUME_DATA = {
  profile: {
    name: "张迪",
    title: "计算机视觉智能应用专家",
    fields: "计算机视觉 / 多维物联感知 / 大规模数据治理 / AIGC",
    emailBase64: "emhhbmdkaWNobmh6QGdtYWlsLmNvbQ==",
    avatar: "assets/avatar.jpg"
  },

  sections: [
    {
      title: "个人简介",
      type: "list",
      items: [
        "西安电子科技大学电子信息工程本科、硕士研究生，华东师范大学电子信息专业博士研究生。",
        "海康威视研究院，任职算法经理 + 智能应用专家。",
        "信息技术高级工程师，计算机应用高级工程师。",
        "浙江省科技厅技术入库专家，浙江省人工智能学会会员+专家，杭州市人工智能学会会员+专家。",
        "孵化垂类产品成果覆盖十余个子行业。发表SCI/会议学术论文若干篇，发明专利三十余篇。",
      ]
    },
    {
      title: "主要成果",
      type: "group",
      blocks: [
        {
          title: "代表论文",
          type: "cards",
          fields: { title: "em", journal: "strong", year: "badge" },
          items: [
            { title: "Robust water level measurement method based on computer vision", journal: "Journal of Hydrology", year: "2023" },
            { title: "Cascade method for water level measurement based on computer vision", journal: "Environmental Modelling & Software", year: "2024" }
          ]
        },
        {
          title: "代表专利",
          type: "cardgrid",
          fields: { name: "title", no: "mono", date: "muted" },
          items: [
            { name: "检测模型的更新方法、装置及存储介质", no: "CN111915020B", date: "授权 2024-02-23" },
            { name: "一种基于水位尺测量图像获取水位信息的方法、装置和系统", no: "CN112013921B", date: "授权 2023-06-23" },
            { name: "一种行为检测方法及装置", no: "CN113033239B", date: "授权 2023-07-07" },
            { name: "水位监测方法及装置", no: "CN111220235B", date: "授权 2022-03-08" },
            { name: "一种包裹提取及跟踪方法、装置及电子设备", no: "CN111223104B", date: "授权 2023-10-10" },
            { name: "一种目标跟踪方法及装置", no: "CN109584265B", date: "授权 2020-10-02" },
            { name: "立体视觉摄像机及其高度获取方法", no: "CN108510540B", date: "授权 2020-02-07" },
            { name: "确定刀闸的开合状态的方法和装置", no: "CN110163833B", date: "授权 2021-11-09" }
          ]
        },
        {
          title: "参与项目",
          type: "cards",
          fields: { program: "accent", name: "title", code: "badge" },
          items: [
            { program: "江西省水利科技项目", name: "图像识别技术在水位监测中的应用", code: "201920TGKT05" },
            { program: "浙江省水利科技计划", name: "基于人工智能的水位感知系统研发与应用", code: "RA1911" },
            { program: "浙江省省级重点研发计划", name: "亚运智能安保风险监测预警关键技术、装备研发及应用示范", code: "2021C03155" }
          ]
        },
        {
          title: "荣誉与获奖",
          type: "cards",
          fields: { name: "title", org: "muted", year: "badge" },
          items: [
            // { name: "奖项名称", org: "颁发机构", year: "2024" },
          ]
        }
      ]
    }
  ],

  declaration: "仅作为个人日常经历梳理、信息归档与自我管理的内部工具使用，不面向任何第三方、无任何法律约束力，不保证所有信息始终处于实时同步的最新状态。"
};
