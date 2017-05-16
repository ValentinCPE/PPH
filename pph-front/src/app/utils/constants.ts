/**
 * Created by A665772 on 16/05/2017.
 */
var Constants = {
  name_short: "PPH",
  name_long: "Personal Photo Hosting",

  publicUrlBase: "/pph/api/",
  privateUrlBase: "/pph/api/auth",
  assetsUrl: "/pph/assets/i18n",

  events: {
    userLoggedSuccessful: "user.login.success",
    appListLoaded: "application.list.loaded",
    appChange: "application.change",
    setApp: "application.set",
    setAppFromName: "application.set.fromName",
    scriptLoaded: "script.loaded",
    scriptListModified: "script.list.modified",
    nodeChange: "script.node.change",
    scriptsListLoaded: "script.list.loaded",
    deleteScript: "script.delete",
    deleteResource: "resource.delete",
    authenticationError: "authentication.error",
    alertCreate: "alert.create",
    changeScriptType: "change.script.type",
    generationSuccessful: "application.generation.successful",
    accessRightsChanged:" application.rights.change",
    currentLocation: "current.location",
    scriptImported: "script.imported"
  },

  regex: {
    inputName: /^[A-Za-z0-9-_]+$/,
    inputModuleName: /[A-Za-z0-9-_ ]+$/
  }
};

export { Constants };
