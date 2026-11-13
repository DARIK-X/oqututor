import type { L3 } from "./i18n";

export type Subject = "math" | "phys" | "code" | "web";
export type Mentor = {
  id: number; name: L3; emoji: string; year: number; gpa: number; uni: string;
  subject: Subject; skills: string[]; quote: L3; online: boolean; location: L3;
  price: { kzt?: number; coins?: number };
};

export const mentors: Mentor[] = [
  { id: 1, name: { kz: "Алихан", ru: "Алихан", en: "Alikhan" }, emoji: "🧑🏻‍💻", year: 3, gpa: 3.9, uni: "KBTU", subject: "code",
    skills: ["C++", "Pointers", "STL"], online: true,
    quote: { kz: "Көрсеткіштерді 25 минутта түсіндіремін", ru: "Объясню указатели за 25 минут", en: "I'll explain pointers in 25 minutes" },
    location: { kz: "Онлайн (Jitsi/Meet)", ru: "Онлайн (Jitsi/Meet)", en: "Online (Jitsi/Meet)" }, price: { kzt: 1000 } },
  { id: 2, name: { kz: "Аружан", ru: "Аружан", en: "Aruzhan" }, emoji: "👩🏻‍🎓", year: 4, gpa: 3.95, uni: "IITU", subject: "math",
    skills: ["Матрицы", "Интегралы", "Linear Algebra"], online: false,
    quote: { kz: "Матрицалар — бұл жай кесте", ru: "Матрицы — это просто таблицы", en: "Matrices are just tables" },
    location: { kz: "Кітапхана, №3 үстел", ru: "Библиотека, стол №3", en: "Library, desk #3" }, price: { coins: 50 } },
  { id: 3, name: { kz: "Данияр", ru: "Данияр", en: "Daniyar" }, emoji: "🧑🏽‍🔬", year: 3, gpa: 3.7, uni: "Astana IT", subject: "phys",
    skills: ["Механика", "Электричество"], online: true,
    quote: { kz: "Физиканы тұрмыстық мысалдармен", ru: "Физика на бытовых примерах", en: "Physics through everyday examples" },
    location: { kz: "Онлайн (Meet)", ru: "Онлайн (Meet)", en: "Online (Meet)" }, price: { kzt: 800 } },
  { id: 4, name: { kz: "Мадина", ru: "Мадина", en: "Madina" }, emoji: "👩🏻‍💻", year: 4, gpa: 3.85, uni: "Astana IT", subject: "web",
    skills: ["React", "Tailwind", "JS"], online: true,
    quote: { kz: "Бірінші сайтыңды бірге жасаймыз", ru: "Соберём твой первый сайт вместе", en: "Let's build your first site together" },
    location: { kz: "Онлайн (Jitsi)", ru: "Онлайн (Jitsi)", en: "Online (Jitsi)" }, price: { kzt: 1200 } },
  { id: 5, name: { kz: "Ерлан", ru: "Ерлан", en: "Yerlan" }, emoji: "🧑🏻‍🏫", year: 3, gpa: 3.8, uni: "Polytech College", subject: "code",
    skills: ["Python", "Алгоритмы"], online: false,
    quote: { kz: "Python — алгоритмге ең оңай кіріспе", ru: "Python — самый простой вход в алгоритмы", en: "Python is the easiest way into algorithms" },
    location: { kz: "Коворкинг, 2 қабат", ru: "Коворкинг, 2 этаж", en: "Coworking, 2nd floor" }, price: { coins: 40 } },
];

export type SosTask = { id: number; title: L3; desc: L3; budget: string; mins: number };
export const sosTasks: SosTask[] = [
  { id: 1, title: { kz: "C++ көрсеткіштер — сегфолт", ru: "C++ указатели — сегфолт", en: "C++ pointers — segfault" },
    desc: { kz: "Ертең зертханалық, бағдарлама құлайды", ru: "Завтра лаба, программа падает", en: "Lab due tomorrow, program crashes" }, budget: "1 500 ₸", mins: 4 },
  { id: 2, title: { kz: "Матрицаның анықтауышы", ru: "Определитель матрицы 4×4", en: "4×4 matrix determinant" },
    desc: { kz: "Емтиханға дейін 2 сағат", ru: "До экзамена 2 часа", en: "Exam in 2 hours" }, budget: "60 Coins", mins: 9 },
  { id: 3, title: { kz: "React useEffect циклі", ru: "Бесконечный цикл useEffect", en: "Infinite useEffect loop" },
    desc: { kz: "Дипломдық жоба, көмек керек", ru: "Дипломный проект, нужна помощь", en: "Thesis project, need help" }, budget: "2 000 ₸", mins: 15 },
];

export const candidates = [
  { id: 1, name: { kz: "Нұрсұлтан", ru: "Нурсултан", en: "Nursultan" }, gpa: 3.92, subject: "C++", grade: "A" },
  { id: 2, name: { kz: "Айгерім", ru: "Айгерим", en: "Aigerim" }, gpa: 3.88, subject: "Math", grade: "A" },
  { id: 3, name: { kz: "Тимур", ru: "Тимур", en: "Timur" }, gpa: 3.75, subject: "Physics", grade: "A-" },
];

export const bottlenecks = [
  { topic: { kz: "C++ көрсеткіштер", ru: "Указатели в C++", en: "Pointers in C++" }, n: 24 },
  { topic: { kz: "Матрицалар", ru: "Матрицы", en: "Matrices" }, n: 19 },
  { topic: { kz: "Рекурсия", ru: "Рекурсия", en: "Recursion" }, n: 14 },
  { topic: { kz: "Интегралдар", ru: "Интегралы", en: "Integrals" }, n: 11 },
];
