export class Project {
    constructor(
        public name: string,
        public emoji: string,
        public route: string,
        public description: string,
        public year: number,
        public internal: boolean,
        public active: boolean,
        public underConstruction: boolean,
        public technology: Technology[]
    ) { }
}

export enum Technology {
    Angular,
    Bootstrap,
    HTML5,
    Javascript
}

export const projects: Project[] = [
    new Project("Trottadvisor", "🏖️", "/projects/trottadvisor", "Travel trotta like the man, the myth, the legend: Harro.", 2026, true, true, true, [Technology.Angular, Technology.Bootstrap]),
    new Project("The Big One FAQ", "🌏", "/projects/the-big-one", "A recount of my six-month trip, all around the world, in anticipation for all the 'What was your favourite...' questions I would receive upon return.", 2024, true, true, false, [Technology.HTML5, Technology.Bootstrap, Technology.Javascript]),
    new Project("Bogan of Meteorology", "🌦️", "/projects/bogan-of-meteorology", "The ultimate Australian weather site. Weather data direct from the Bureau of Meteorology, translated into bogan.", 2023, true, true, false, [Technology.Angular, Technology.Bootstrap]),
    new Project("Funny Password Checker", "🔑", "/projects/funny-password-checker", "A password strength checker, with a humorous side.", 2018, true, true, false, [Technology.Angular, Technology.Bootstrap]),
    new Project("It's Five O'Clock Somewhere", "🕔", "/projects/its-five-oclock-somewhere", "Where it is currently five o'clock in the world so that you can justify your beer consumption.", 2018, true, true, false, [Technology.HTML5, Technology.Bootstrap, Technology.Javascript]),
    new Project("Rip Me A New One", "🍻", "/projects/rip-me-a-new-one", "Find out how much tax the case/bottle you buy is subject to thanks to the Australian Government.", 2023, true, true, false, [Technology.HTML5, Technology.Bootstrap, Technology.Javascript]),
    new Project("Tappy OS", "👧🏽", "/projects/tappy-os", "The one-of-a-kind Tappy Operating System (3).", 2025, true, true, false, []),
    new Project("Tappy Standard Time", "⏰", "/projects/tappy-os/tappy-season-time", "The timezone my illustrious, beloved girlfriend currently operates in.", 2025, true, true, false, [Technology.HTML5, Technology.Bootstrap, Technology.Javascript]),
    new Project("Tappy Season Time", "🌸", "/projects/tappy-os/tappy-standard-time", "The season my beloved, illustrious girlfriend currently lives in.", 2025, true, true, false, [Technology.HTML5, Technology.Bootstrap, Technology.Javascript]),
    new Project("Orkinisms", "📖", "/projects/tappy-os/orkinisms", "What is the difference between a wookie and a tookie? Well, now you can find out.", 2025, true, true, false, [Technology.Angular, Technology.Bootstrap]),
    new Project("Be Quiet Near a Little Stream and Listen", "💧", "/projects/quiet-near-a-little-stream", "Inspired by Ruth Krauss and the Marginalian, a meditative Marcus Sendak illustration, brought to life.", 2025, true, true, false, [Technology.Angular, Technology.Bootstrap]),
    new Project("INTERNET RECIPE", "🍝", "/projects/internet-recipe", "JUST YOUR AVERAGE INTERNET RECIPE ©", 2025, true, true, false, [Technology.Angular, Technology.Bootstrap]),
    new Project("Bingo", "🎲", "/projects/bingo", "Esoteric, situational bingo. Legs eleven et al.", 2026, true, true, false, [Technology.Angular, Technology.Bootstrap]),
    new Project("Family IT Support Invoice Generator", "🧾", "/projects/family-it-invoice-generator", "Stop your family from taking advantage of you and your IT skills. Price gouge them accordingly.", 2026, true, true, false, [Technology.Angular, Technology.Bootstrap]),
    new Project("Orkin Brown & Associates", "📒", "https://www.orkinbrown.co.za/", "The undisputed heavyweight accounting firm of South Africa.", 2025, false, true, false, [Technology.Angular, Technology.Bootstrap]),
    new Project("Palisi's Persistent Pursuit of Places FAQ", "🌏", "https://palisis-persistent-pursuit-of-places.netlify.app/", "Anthony's worldwide 1.5 year long trip.", 2025, false, true, false, [Technology.Angular, Technology.Bootstrap]),
    new Project("Path to Peace", "🌻", "/projects", "My brother's non-for-profit mission for mental health (on pause since October 2025).", 2023, false, false, false, [Technology.Angular, Technology.Bootstrap]),
    // new Project("", "", "", "", 2026, true, true, true, []),

];

export const sortedProjects = projects.sort(
  (a, b) =>
    b.year - a.year || a.name.localeCompare(b.name)
);

export const tappyOsProjectPattern: RegExp = /^\/projects\/tappy-os\/.+/i;

