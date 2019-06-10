interface Config {
  apiBaseUrl: string;
  isProd: boolean;
}

const local = {
  // API base url (i.e: http://localhost:8080)
  apiBaseUrl: "TODO"
};

const dev = {
  // API base url
  apiBaseUrl: "TODO"
};

const prod = {
  // API base url
  apiBaseUrl: "TODO"
};

const appStage = process.env.REACT_APP_STAGE;

let stage = local;
switch (appStage) {
  case "dev":
    stage = dev;
    break;
  case "prod":
    stage = prod;
    break;
  default:
    break;
}

const config: Config = {
  ...stage,

  // All configs below are shared across all stages.
  isProd: appStage === "prod"
};

export default config;
