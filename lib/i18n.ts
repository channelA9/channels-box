export type Language = "en" | "jp";

export interface Translations {
  nav: {
    home: string;
    blog: string;
    papers: string;
    cv: string;
  };
  home: {
    subtitle: string;
    theLatest: string;
    recentBlog: string;
    recentPapers: string;
    viewAll: string;
    noPosts: string;
    noPapers: string;
    profile: {
      name: string;
      title: string;
      bio: string;
    };
  };
  blog: {
    title: string;
    subtitle: string;
    noPosts: string;
  };
  papers: {
    title: string;
    subtitle: string;
    filterPlaceholder: string;
    noPapers: string;
    bib: string;
  };
  cv: {
    title: string;
    subtitle: string;
    downloadPdf: string;
    sections: {
      contact: string;
      summary: string;
      education: string;
      experience: string;
      research: string;
      presentations: string;
      projects: string;
      skills: string;
      coursework: string;
      awards: string;
      languages: string;
      extracurricular: string;
    };
  };
  footer: {
    copyright: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: "home",
      blog: "blog",
      papers: "papers",
      cv: "cv",
    },
    home: {
      subtitle: "CS researcher & developer",
      theLatest: "Latest",
      recentBlog: "Blog",
      recentPapers: "Papers",
      viewAll: "View all →",
      noPosts: "No blog posts yet.",
      noPapers: "No papers yet.",
      profile: {
        name: "Shaun Colegado",
        title: "CS Researcher & Web Developer",
        bio: "I'm an undergraduate researcher at the [Leonard Transportation Center](https://www.csusb.edu/leonard-transportation-center) at CSUSB under [Dr. Yunfei Hou](https://sites.google.com/site/yunfeihouhomepage/). I also previously worked as a Mitacs Globalink Research Intern at the [VVISE Lab](https://www.sfu.ca/vvise/vvise.html) under [Dr. Wolfgang Stuerzlinger](https://www.sfu.ca/siat/people/research-faculty/wolfgang-stuerzlinger.html) and as an informal research assistant at [International Christian University](https://www.icu.ac.jp/en/). My research interests are in Social Informatics, Human-Computer Interaction, Human-AI interaction, embodied AI, and web technologies.",
      },
    },
    blog: {
      title: "Blog",
      subtitle: "Thoughts and notes",
      noPosts: "No blog posts found.",
    },
    papers: {
      title: "Papers",
      subtitle: "Publications in reverse chronological order",
      filterPlaceholder: "Type to filter",
      noPapers: "No papers found.",
      bib: "BIB",
    },
    cv: {
      title: "CV",
      subtitle: "Academic curriculum vitae",
      downloadPdf: "Download PDF",
      sections: {
        contact: "Contact Information",
        summary: "Professional Summary",
        education: "Education",
        experience: "Experience",
        research: "Research",
        presentations: "Academic Presentations",
        projects: "Projects",
        skills: "Skills",
        coursework: "Coursework",
        awards: "Awards",
        languages: "Languages",
        extracurricular: "Extracurricular",
      },
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} Shaun Colegado`,
    },
  },
  jp: {
    nav: {
      home: "ホーム",
      blog: "ブログ",
      papers: "論文",
      cv: "履歴書",
    },
    home: {
      subtitle: "CS研究者 & 開発者",
      theLatest: "最新",
      recentBlog: "ブログ",
      recentPapers: "論文",
      viewAll: "すべて見る →",
      noPosts: "ブログ投稿はまだありません。",
      noPapers: "論文はまだありません。",
      profile: {
        name: "ショーン・コレガド",
        title: "CS研究者 & ウェブ開発者",
        bio: "私はカリフォルニア州立大学サンバーナーディーノ校の[Leonard Transportation Center](https://www.csusb.edu/leonard-transportation-center)にて[Yunfei Hou博士](https://sites.google.com/site/yunfeihouhomepage/)の指導の下で学部研究者を務めています。以前は、Mitacs Globalink Research Intern として[VVISE Lab](https://www.sfu.ca/vvise/vvise.html)にて[Wolfgang Stuerzlinger博士](https://www.sfu.ca/siat/people/research-faculty/wolfgang-stuerzlinger.html)のもとで働いていた。また、[国際基督教大学](https://www.icu.ac.jp/)では心理学研究の助手として研究に従事していました。私の研究関心は、Social Informatics、Human-Computer Interaction、Human-AI Interaction、Embodied AI、およびWeb技術です。",
      },
    },
    blog: {
      title: "ブログ",
      subtitle: "考えとメモ",
      noPosts: "ブログ投稿が見つかりません。",
    },
    papers: {
      title: "論文",
      subtitle: "逆年代順の出版物",
      filterPlaceholder: "フィルター",
      noPapers: "論文が見つかりません。",
      bib: "BIB",
    },
    cv: {
      title: "履歴書",
      subtitle: "学術的履歴書",
      downloadPdf: "PDFダウンロード",
      sections: {
        contact: "連絡先",
        summary: "概要",
        education: "学歴",
        experience: "職歴",
        research: "研究",
        presentations: "学術発表",
        projects: "プロジェクト",
        skills: "スキル",
        coursework: "履修科目",
        awards: "受賞",
        languages: "言語",
        extracurricular: "課外活動",
      },
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} ショーン・コレガド`,
    },
  },
};

export function getTranslations(language: Language): Translations {
  return translations[language];
}
