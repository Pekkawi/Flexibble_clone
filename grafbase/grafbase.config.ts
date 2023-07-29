import { g, auth, config } from "@grafbase/sdk";

const User = g.model("User", {
  name: g.string().length({ min: 2, max: 20 }), // a string of min len 2 and max len 20
  email: g.string().unique(), // a unique string
  avatarUrl: g.url(), //it's an url
  description: g.string().length({ min: 20, max: 200 }).optional(),
  githubUrl: g.url().optional(),
  linkedInUrl: g.url().optional(), // an optional string
  projects: g
    .relation(() => Project)
    .list()
    .optional(), // a relation with Project model , display a list of projects(if there are multiple) ,optional
});

const Project = g.model("Project", {
  title: g.string().length({ min: 3 }),
  description: g.string().optional(),
  image: g.url(),
  liveSiteUrl: g.url(),
  gitHubUrl: g.url(),
  category: g.string().search(), // Allows us to search through the categories
  createdBy: g.relation(() => User), // relation to a user
});

const jwt = auth.JWT({
  issuer: "grafbase",
  secret: g.env('NEXTAUTH_SECRET');
});

export default config({
  schema: g,
});
