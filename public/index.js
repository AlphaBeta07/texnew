// server/index.ts
import express3 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
var filename = fileURLToPath(import.meta.url);
var dirname = path.dirname(filename);
var app = express();
app.use("/audio", express.static(path.join(dirname, "public/audio")));
var MemStorage = class {
  programs;
  subjects;
  chapters;
  audioLessons;
  programsCounter;
  subjectsCounter;
  chaptersCounter;
  audioLessonsCounter;
  constructor() {
    this.programs = /* @__PURE__ */ new Map();
    this.subjects = /* @__PURE__ */ new Map();
    this.chapters = /* @__PURE__ */ new Map();
    this.audioLessons = /* @__PURE__ */ new Map();
    this.programsCounter = 1;
    this.subjectsCounter = 1;
    this.chaptersCounter = 1;
    this.audioLessonsCounter = 1;
    this.initializeData();
  }
  // Program methods
  async getAllPrograms() {
    return Array.from(this.programs.values());
  }
  async getProgramById(id) {
    return this.programs.get(id);
  }
  async createProgram(program) {
    const id = this.programsCounter++;
    const newProgram = { ...program, id };
    this.programs.set(id, newProgram);
    return newProgram;
  }
  // Subject methods
  async getSubjectsByProgramId(programId) {
    return Array.from(this.subjects.values()).filter(
      (subject) => subject.programId === programId
    );
  }
  async getSubjectById(id) {
    return this.subjects.get(id);
  }
  async createSubject(subject) {
    const id = this.subjectsCounter++;
    const newSubject = { ...subject, id };
    this.subjects.set(id, newSubject);
    return newSubject;
  }
  // Chapter methods
  async getChaptersBySubjectId(subjectId) {
    return Array.from(this.chapters.values()).filter(
      (chapter) => chapter.subjectId === subjectId
    );
  }
  async getChapterById(id) {
    return this.chapters.get(id);
  }
  async createChapter(chapter) {
    const id = this.chaptersCounter++;
    const newChapter = { ...chapter, id };
    this.chapters.set(id, newChapter);
    return newChapter;
  }
  // async updateChapterProgress(id: number, //progress: number, completedLessons: number): Promise<Chapter> {
  //   const chapter = this.chapters.get(id);
  //   if (!chapter) {
  //     throw new Error(`Chapter with ID ${id} not found`);
  //   }
  //   const updatedChapter: Chapter = { 
  //     ...chapter, 
  //     progress, 
  //     completedLessons 
  //   };
  //   this.chapters.set(id, updatedChapter);
  //   return updatedChapter;
  // }
  // Audio lesson methods
  async getAudioLessonsByChapterId(chapterId) {
    return Array.from(this.audioLessons.values()).filter(
      (lesson) => lesson.chapterId === chapterId
    );
  }
  async getAudioLessonById(id) {
    return this.audioLessons.get(id);
  }
  async createAudioLesson(audioLesson) {
    const id = this.audioLessonsCounter++;
    const newAudioLesson = { ...audioLesson, id };
    this.audioLessons.set(id, newAudioLesson);
    return newAudioLesson;
  }
  async markAudioLessonCompleted(id) {
    const audioLesson = this.audioLessons.get(id);
    if (!audioLesson) {
      throw new Error(`Audio lesson with ID ${id} not found`);
    }
    const updatedAudioLesson = {
      ...audioLesson,
      completed: true
    };
    this.audioLessons.set(id, updatedAudioLesson);
    return updatedAudioLesson;
  }
  // Initialize with sample educational content
  initializeData() {
    const programsData = [
      {
        name: "Textile Chemistry",
        imageUrl: "",
        subjectsCount: 5,
        totalAudioCount: 30
      },
      {
        name: "Textile Technology",
        imageUrl: "",
        subjectsCount: 5,
        totalAudioCount: 30
      },
      {
        name: "Man Made Textile Technology",
        imageUrl: "",
        subjectsCount: 5,
        totalAudioCount: 30
      },
      {
        name: "Technical Textiles",
        imageUrl: "",
        subjectsCount: 5,
        totalAudioCount: 30
      },
      {
        name: "Fashion\xA0Technology",
        imageUrl: "",
        subjectsCount: 5,
        totalAudioCount: 30
      }
    ];
    programsData.forEach((program) => {
      const id = this.programsCounter++;
      this.programs.set(id, { ...program, id });
    });
    const fiberScienceSubjects = [
      {
        programId: 1,
        name: "Chemistry of Natural Fibers",
        imageUrl: "",
        chaptersCount: 6
      }
      // {
      //   programId: 1,
      //   name: "",
      //   description: "",
      //   imageUrl: "",
      //   chaptersCount: 6,
      //   durationHours: 14
      // }
    ];
    const fabricSubjects = [];
    [...fiberScienceSubjects, ...fabricSubjects].forEach((subject) => {
      const id = this.subjectsCounter++;
      this.subjects.set(id, { ...subject, id });
    });
    const naturalFibersChapters = [
      {
        subjectId: 1,
        name: "Unit 01. Introduction to Textiles",
        audioCount: 5,
        durationMinutes: 30
      },
      {
        subjectId: 1,
        name: "Unit 02. Textile Fibres",
        audioCount: 7,
        durationMinutes: 37
      },
      {
        subjectId: 1,
        name: "Unit 03. Cotton Fibre",
        audioCount: 7,
        durationMinutes: 108
      },
      {
        subjectId: 1,
        name: "Unit 04. Unconventional Natural Fibres",
        audioCount: 9,
        durationMinutes: 90
      },
      {
        subjectId: 1,
        name: "Unit 05. Wool Fibre",
        audioCount: 6,
        durationMinutes: 120
      },
      {
        subjectId: 1,
        name: "Unit 06. Silk Fibre",
        audioCount: 7,
        durationMinutes: 120
      }
    ];
    naturalFibersChapters.forEach((chapter) => {
      const id = this.chaptersCounter++;
      this.chapters.set(id, { ...chapter, id });
    });
    const cottonLessons = [
      {
        chapterId: 1,
        title: "FLOW CHART OF YARN MANUFACTURING",
        audioUrl: "/audio/program1/subject1/chapter1/yarn_manufacturing_audio.mp3"
      },
      {
        chapterId: 1,
        title: "FLOW CHART OF WEAVING",
        audioUrl: "/audio/program1/subject1/chapter1/weaving_process.mp3"
      },
      {
        chapterId: 1,
        title: "FLOW CHART OF CHEMICAL PROCESSING",
        audioUrl: "/audio/program1/subject1/chapter1/chemical_processing.mp3"
      },
      {
        chapterId: 1,
        title: "FLOW CHART OF GARMENT MANUFACTURING PROCESS",
        audioUrl: "/audio/program1/subject1/chapter1/garment_manufacturing.mp3"
      },
      {
        chapterId: 1,
        title: "INTRODUCTION TO TEXTILES",
        audioUrl: "/audio/program1/subject1/chapter1/introduction_to_textiles.mp3"
      }
    ];
    cottonLessons.forEach((lesson) => {
      const id = this.audioLessonsCounter++;
      this.audioLessons.set(id, { ...lesson, id });
    });
    const unit2 = [
      {
        chapterId: 2,
        title: "01. Degree of Polymerization",
        audioUrl: "/audio/program1/subject1/chapter1/yarn_manufacturing_audio.mp3"
      },
      {
        chapterId: 2,
        title: "02. Cohesive Energy Density",
        audioUrl: "/audio/program1/subject1/chapter1/weaving_process.mp3"
      },
      {
        chapterId: 2,
        title: "03. MOISTURE REGAIN AND MOISTURE CONTENT",
        audioUrl: "/audio/program1/subject1/chapter1/chemical_processing.mp3"
      },
      {
        chapterId: 2,
        title: "04. Classification of textile Fibres",
        audioUrl: "/audio/program1/subject1/chapter1/garment_manufacturing.mp3"
      },
      {
        chapterId: 2,
        title: "05. ESSENTIAL PROPERTIES OF FIBRE",
        audioUrl: "/audio/program1/subject1/chapter1/introduction_to_textiles.mp3"
      },
      {
        chapterId: 2,
        title: "06. Desirable Properties of fibre",
        audioUrl: "/audio/program1/subject1/chapter1/introduction_to_textiles.mp3"
      },
      {
        chapterId: 2,
        title: "07. ORIENTATION",
        audioUrl: "/audio/program1/subject1/chapter1/introduction_to_textiles.mp3"
      }
    ];
    unit2.forEach((lesson) => {
      const id = this.audioLessonsCounter++;
      this.audioLessons.set(id, { ...lesson, id });
    });
    const CottonFibre = [
      {
        chapterId: 3,
        title: "01. CULTIVATION OF COTTON",
        audioUrl: "/audio/program1/subject1/chapter1/yarn_manufacturing_audio.mp3"
      },
      {
        chapterId: 3,
        title: "02. BOTANICAL CLASSIFICATION OF COTTON",
        audioUrl: "/audio/program1/subject1/chapter1/weaving_process.mp3"
      },
      {
        chapterId: 3,
        title: "03. MORPHOLOGICAL STRUCTURE OF COTTON",
        audioUrl: "/audio/program1/subject1/chapter1/chemical_processing.mp3"
      },
      {
        chapterId: 3,
        title: "04. CHEMICAL COMPOSITION OF COTTON",
        audioUrl: "/audio/program1/subject1/chapter1/garment_manufacturing.mp3"
      },
      {
        chapterId: 3,
        title: "05. Crystal structure of cellulose",
        audioUrl: "/audio/program1/subject1/chapter1/introduction_to_textiles.mp3"
      },
      {
        chapterId: 3,
        title: "06. REACTIONS OF CELLULOSE",
        audioUrl: "/audio/program1/subject1/chapter1/introduction_to_textiles.mp3"
      },
      {
        chapterId: 3,
        title: "07. Physical and chemical properties of Cotton",
        audioUrl: "/audio/program1/subject1/chapter1/introduction_to_textiles.mp3"
      }
    ];
    CottonFibre.forEach((lesson) => {
      const id = this.audioLessonsCounter++;
      this.audioLessons.set(id, { ...lesson, id });
    });
    const UnconventionalNaturalFibres = [
      {
        chapterId: 4,
        title: "01. General Information About Jute Fibre",
        audioUrl: "/audio/program1/subject1/chapter1/yarn_manufacturing_audio.mp3"
      },
      {
        chapterId: 4,
        title: "02. Chemical Composition of Jute Fibre",
        audioUrl: "/audio/program1/subject1/chapter1/weaving_process.mp3"
      },
      {
        chapterId: 4,
        title: "03. Cultivation of Jute Fibre",
        audioUrl: "/audio/program1/subject1/chapter1/chemical_processing.mp3"
      },
      {
        chapterId: 4,
        title: "04. Retting of Jute Fibre",
        audioUrl: "/audio/program1/subject1/chapter1/garment_manufacturing.mp3"
      },
      {
        chapterId: 4,
        title: "05. Morphological Structure of Jute Fibre",
        audioUrl: "/audio/program1/subject1/chapter1/introduction_to_textiles.mp3"
      },
      {
        chapterId: 4,
        title: "06. Physical and Chemical Properties of Jute Fibre",
        audioUrl: "/audio/program1/subject1/chapter1/introduction_to_textiles.mp3"
      },
      {
        chapterId: 4,
        title: "07. History of Flax Fibres",
        audioUrl: "/audio/program1/subject1/chapter1/introduction_to_textiles.mp3"
      },
      {
        chapterId: 4,
        title: "08. Cultivation and Retting of Flax Fibre",
        audioUrl: "/audio/program1/subject1/chapter1/introduction_to_textiles.mp3"
      },
      {
        chapterId: 4,
        title: "09. Physical and Chemical Properties of Flax Fibre",
        audioUrl: "/audio/program1/subject1/chapter1/introduction_to_textiles.mp3"
      }
    ];
    UnconventionalNaturalFibres.forEach((lesson) => {
      const id = this.audioLessonsCounter++;
      this.audioLessons.set(id, { ...lesson, id });
    });
    const WoolFibre = [
      {
        chapterId: 5,
        title: "01. Grading of Wool Fibre",
        audioUrl: "/audio/program1/subject1/chapter1/yarn_manufacturing_audio.mp3"
      },
      {
        chapterId: 5,
        title: "02. Morphological Structure of wool Fibre",
        audioUrl: "/audio/program1/subject1/chapter1/weaving_process.mp3"
      },
      {
        chapterId: 5,
        title: "03. Chemical Composition of wool fibre",
        audioUrl: "/audio/program1/subject1/chapter1/chemical_processing.mp3"
      },
      {
        chapterId: 5,
        title: "04. Chemical Structure of Wool Fibre",
        audioUrl: "/audio/program1/subject1/chapter1/garment_manufacturing.mp3"
      },
      {
        chapterId: 5,
        title: "05. Different types of forces are present in wool fibres",
        audioUrl: "/audio/program1/subject1/chapter1/introduction_to_textiles.mp3"
      },
      {
        chapterId: 5,
        title: "06. Physical and Chemical Properties of Wool Fibre",
        audioUrl: "/audio/program1/subject1/chapter1/introduction_to_textiles.mp3"
      }
    ];
    WoolFibre.forEach((lesson) => {
      const id = this.audioLessonsCounter++;
      this.audioLessons.set(id, { ...lesson, id });
    });
    const SilkFibre = [
      {
        chapterId: 6,
        title: "01. Varieties of Silk Fibre",
        audioUrl: "/audio/program1/subject1/chapter1/yarn_manufacturing_audio.mp3"
      },
      {
        chapterId: 6,
        title: "02. Sericulture of Silk",
        audioUrl: "/audio/program1/subject1/chapter1/weaving_process.mp3"
      },
      {
        chapterId: 6,
        title: "03. Production Of Raw Silk",
        audioUrl: "/audio/program1/subject1/chapter1/chemical_processing.mp3"
      },
      {
        chapterId: 6,
        title: "04. Morphological Structure Of Silk",
        audioUrl: "/audio/program1/subject1/chapter1/garment_manufacturing.mp3"
      },
      {
        chapterId: 6,
        title: "05. Chemical composition and chemical structure of Silk",
        audioUrl: "/audio/program1/subject1/chapter1/introduction_to_textiles.mp3"
      },
      {
        chapterId: 6,
        title: "06. Different types of forces are present in silk fibres",
        audioUrl: "/audio/program1/subject1/chapter1/introduction_to_textiles.mp3"
      },
      {
        chapterId: 6,
        title: "07. Physical and Chemical Properties of Silk",
        audioUrl: "/audio/program1/subject1/chapter1/introduction_to_textiles.mp3"
      }
    ];
    SilkFibre.forEach((lesson) => {
      const id = this.audioLessonsCounter++;
      this.audioLessons.set(id, { ...lesson, id });
    });
  }
};
var storage = new MemStorage();

// server/routes.ts
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

// shared/schema.ts
import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var programs = pgTable("programs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  //description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  subjectsCount: integer("subjects_count").notNull().default(5),
  totalAudioCount: integer("total_audio_count").notNull().default(0)
});
var insertProgramSchema = createInsertSchema(programs).omit({
  id: true
});
var subjects = pgTable("subjects", {
  id: serial("id").primaryKey(),
  programId: integer("program_id").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  chaptersCount: integer("chapters_count").notNull().default(6)
  //durationHours: integer("duration_hours").notNull(),
});
var insertSubjectSchema = createInsertSchema(subjects).omit({
  id: true
});
var chapters = pgTable("chapters", {
  id: serial("id").primaryKey(),
  subjectId: integer("subject_id").notNull(),
  name: text("name").notNull(),
  //description: text("description").notNull(),
  //iconType: text("icon_type").notNull(),
  audioCount: integer("audio_count").notNull().default(6),
  durationMinutes: integer("duration_minutes").notNull(),
  progress: integer("progress").notNull().default(0),
  // 0-100 percent
  completedLessons: integer("completed_lessons").notNull().default(0)
});
var insertChapterSchema = createInsertSchema(chapters).omit({
  id: true
});
var audioLessons = pgTable("audio_lessons", {
  id: serial("id").primaryKey(),
  chapterId: integer("chapter_id").notNull(),
  title: text("title").notNull(),
  //description: text("description").notNull(),
  //durationSeconds: integer("duration_seconds").notNull(),
  //completed: boolean("completed").notNull().default(false),
  audioUrl: text("audio_url").notNull()
});
var insertAudioLessonSchema = createInsertSchema(audioLessons).omit({
  id: true
});

// server/routes.ts
async function registerRoutes(app3) {
  app3.get("/api/programs", async (req, res) => {
    try {
      const programs2 = await storage.getAllPrograms();
      res.json(programs2);
    } catch (error) {
      console.error("Error fetching programs:", error);
      res.status(500).json({ message: "Failed to fetch programs" });
    }
  });
  app3.get("/api/programs/:id", async (req, res) => {
    try {
      const programId = parseInt(req.params.id);
      const program = await storage.getProgramById(programId);
      if (!program) {
        return res.status(404).json({ message: "Program not found" });
      }
      res.json(program);
    } catch (error) {
      console.error("Error fetching program:", error);
      res.status(500).json({ message: "Failed to fetch program" });
    }
  });
  app3.get("/api/programs/:programId/subjects", async (req, res) => {
    try {
      const programId = parseInt(req.params.programId);
      const subjects2 = await storage.getSubjectsByProgramId(programId);
      res.json(subjects2);
    } catch (error) {
      console.error("Error fetching subjects:", error);
      res.status(500).json({ message: "Failed to fetch subjects" });
    }
  });
  app3.get("/api/subjects/:id", async (req, res) => {
    try {
      const subjectId = parseInt(req.params.id);
      const subject = await storage.getSubjectById(subjectId);
      if (!subject) {
        return res.status(404).json({ message: "Subject not found" });
      }
      res.json(subject);
    } catch (error) {
      console.error("Error fetching subject:", error);
      res.status(500).json({ message: "Failed to fetch subject" });
    }
  });
  app3.get("/api/subjects/:subjectId/chapters", async (req, res) => {
    try {
      const subjectId = parseInt(req.params.subjectId);
      const chapters2 = await storage.getChaptersBySubjectId(subjectId);
      res.json(chapters2);
    } catch (error) {
      console.error("Error fetching chapters:", error);
      res.status(500).json({ message: "Failed to fetch chapters" });
    }
  });
  app3.get("/api/chapters/:id", async (req, res) => {
    try {
      const chapterId = parseInt(req.params.id);
      const chapter = await storage.getChapterById(chapterId);
      if (!chapter) {
        return res.status(404).json({ message: "Chapter not found" });
      }
      res.json(chapter);
    } catch (error) {
      console.error("Error fetching chapter:", error);
      res.status(500).json({ message: "Failed to fetch chapter" });
    }
  });
  app3.patch("/api/chapters/:id/progress", async (req, res) => {
    try {
      const chapterId = parseInt(req.params.id);
      const { progress, completedLessons } = req.body;
      if (typeof progress !== "number" || typeof completedLessons !== "number") {
        return res.status(400).json({ message: "Invalid progress or completedLessons values" });
      }
      const updatedChapter = await storage.updateChapterProgress(
        chapterId,
        progress,
        completedLessons
      );
      res.json(updatedChapter);
    } catch (error) {
      console.error("Error updating chapter progress:", error);
      res.status(500).json({ message: "Failed to update chapter progress" });
    }
  });
  app3.get("/api/chapters/:chapterId/audio-lessons", async (req, res) => {
    try {
      const chapterId = parseInt(req.params.chapterId);
      const audioLessons2 = await storage.getAudioLessonsByChapterId(chapterId);
      res.json(audioLessons2);
    } catch (error) {
      console.error("Error fetching audio lessons:", error);
      res.status(500).json({ message: "Failed to fetch audio lessons" });
    }
  });
  app3.get("/api/audio-lessons/:id", async (req, res) => {
    try {
      const lessonId = parseInt(req.params.id);
      const audioLesson = await storage.getAudioLessonById(lessonId);
      if (!audioLesson) {
        return res.status(404).json({ message: "Audio lesson not found" });
      }
      res.json(audioLesson);
    } catch (error) {
      console.error("Error fetching audio lesson:", error);
      res.status(500).json({ message: "Failed to fetch audio lesson" });
    }
  });
  app3.patch("/api/audio-lessons/:id/complete", async (req, res) => {
    try {
      const lessonId = parseInt(req.params.id);
      const updatedLesson = await storage.markAudioLessonCompleted(lessonId);
      res.json(updatedLesson);
    } catch (error) {
      console.error("Error marking audio lesson as completed:", error);
      res.status(500).json({ message: "Failed to mark audio lesson as completed" });
    }
  });
  app3.post("/api/programs", async (req, res) => {
    try {
      const programData = insertProgramSchema.parse(req.body);
      const newProgram = await storage.createProgram(programData);
      res.status(201).json(newProgram);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        console.error("Error creating program:", error);
        res.status(500).json({ message: "Failed to create program" });
      }
    }
  });
  app3.post("/api/subjects", async (req, res) => {
    try {
      const subjectData = insertSubjectSchema.parse(req.body);
      const newSubject = await storage.createSubject(subjectData);
      res.status(201).json(newSubject);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        console.error("Error creating subject:", error);
        res.status(500).json({ message: "Failed to create subject" });
      }
    }
  });
  app3.post("/api/chapters", async (req, res) => {
    try {
      const chapterData = insertChapterSchema.parse(req.body);
      const newChapter = await storage.createChapter(chapterData);
      res.status(201).json(newChapter);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        console.error("Error creating chapter:", error);
        res.status(500).json({ message: "Failed to create chapter" });
      }
    }
  });
  app3.post("/api/audio-lessons", async (req, res) => {
    try {
      const lessonData = insertAudioLessonSchema.parse(req.body);
      const newLesson = await storage.createAudioLesson(lessonData);
      res.status(201).json(newLesson);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        console.error("Error creating audio lesson:", error);
        res.status(500).json({ message: "Failed to create audio lesson" });
      }
    }
  });
  const httpServer = createServer(app3);
  return httpServer;
}

// server/vite.ts
import express2 from "express";
import fs from "fs";
import path3 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path2 from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path2.resolve(import.meta.dirname, "client", "src"),
      "@shared": path2.resolve(import.meta.dirname, "shared"),
      "@assets": path2.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path2.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path2.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app3, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app3.use(vite.middlewares);
  app3.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path3.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app3) {
  const distPath = path3.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app3.use(express2.static(distPath));
  app3.use("*", (_req, res) => {
    res.sendFile(path3.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app2 = express3();
app2.use(express3.json());
app2.use(express3.urlencoded({ extended: false }));
app2.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app2);
  app2.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app2.get("env") === "development") {
    await setupVite(app2, server);
  } else {
    serveStatic(app2);
  }
  app2.listen(5e3, () => {
    console.log("Server running on http://localhost:5000");
  });
})();
