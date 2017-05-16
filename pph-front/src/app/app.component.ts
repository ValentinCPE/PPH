import {ApplicationRef, Component, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { AppState } from './app.service';
import { HttpRequester, Constants } from './utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    name = 'PPH'; // Name of the App
    private isLeftMenuOpen:boolean = false; //open automatically
    private menuPortal = '';
    private displayImportPopin: boolean = false;
    private displayExportPopin: boolean =false;

    private _currentUser:any = null;
    private browserName: any;
    private browserVersion: any;

    comeFromContact: boolean = true;
    applicationList: any[];
    displayRightsClass:string = "";

    constructor(
      public appState: AppState,
      private translate: TranslateService,
      public router: Router,
      private requester: HttpRequester, private appRef: ApplicationRef) {

      let language = (<any>(window.navigator)).userLanguage || window.navigator.language; // crossbrowsering like a boss
      this.setLanguage(language);
      this.appState.set("comeFromContact", this.comeFromContact);

      this.appState.subscribe(Constants.events.userLoggedSuccessful, (user) => {
        this.handleFirstLogin(user);
        this.isLeftMenuOpen = true;
        this._currentUser = user;
        this.appState.set("isLogged", true);
      });
      this.appState.subscribe(Constants.events.authenticationError, this.goToAuthenticatePage.bind(this));
      //this.appState.subscribe(Constants.events.accessRightsChanged, this.manageDisplayRights.bind(this));
    }

    ngOnInit() {

    }

    handleFirstLogin(user:any) {
      /*if(!user) {
        console.error('UserDto is null after login.');
        return;
      }

      // Last login is updated after every login
      // At first login, the lastLogin == 0 and it will setted after first password change.
      if(user.lastLogin == 0) this.passwordChangePopin.open((inputData) => this.changePasswordProcess(inputData), 'PASSWORD_EDIT', 'PASSWORD_EDIT', [
        new GenericInput('password', 'password', 'PASSWORD', true, [new InputValidator((e) => this.checkInitInputPasswordLength(e), 'LOCAL_SECURITY.ERROR_EDITION_INPUT_PASSWORD_LENGTH')]),
        new GenericInput('passwordRepeat', 'password', 'PASSWORD_REPEAT', true, [new InputValidator((e) => this.checkInitInputPasswordLength(e), 'LOCAL_SECURITY.ERROR_EDITION_INPUT_PASSWORD_LENGTH')])
      ], [
        new InputValidator((e) => this.checkInitInputPasswordRepeatIsSame(e), 'LOCAL_SECURITY.ERROR_EDITION_INPUT_PASSWORD_NOT_SAME')
      ], false); */
    }

    changePasswordProcess(inputData) {
      if(inputData.password != inputData.passwordRepeat) return;
      let loginDto = {login: '', pwd : inputData.password, domain: ''};
      let url = Constants.publicUrlBase + "/auth/initPassword";
      this.requester.post(url, null, () => console.error('Failed to initialize password'), loginDto);
    }

    checkInitInputPasswordLength(value) {
      return value.length >= 3;
    }

    checkInitInputPasswordRepeatIsSame(values:string[]) {
      return values && values.length == 2 && values[0] === values[1];
    }

    /**This function logs out the user.
     * It also redirects him to the auth component.
     */
    logout() {
      this.menuPortal = "";
      this.isLeftMenuOpen= false;
      let logoutUrl: string = Constants.publicUrlBase + "/authentification/logout";
      this.requester.get(logoutUrl, this.goToAuthenticatePage.bind(this), this.goToAuthenticatePage.bind(this));
    }

    goToAuthenticatePage(data: any) {
      this._currentUser = null;
      this.appState.set("applicationList", null);
      this.appState.set("isLogged", false);
      this.applicationList = null;
      this.router.navigate(['authentication']);
    }

    setLanguage(language: string) {
      let translatorLanguage:string = language, locale:string = language;

      if (language.indexOf('-') > 0){ // format is xx-XX
        translatorLanguage = language.split('-')[0];
        locale = language.replace("-", "_");
      } else if (language.indexOf('_') > 0) {// format is xx_XX
        translatorLanguage = language.split('_')[0];
      } else { //format SHOULD be xx
        let locales={fr:"fr_FR", en:"en_US", de:"de_DE"}
        locale = locales[language];
      }
      // we need the xx format for the translator
      this.translate.use(translatorLanguage);
      // we keep the xx_XX format locale for later use
      this.appState.set("locale", locale);
      this.appState.set("shortLocale", language);
      this.appState.set("translatorLanguage", translatorLanguage);
    }

    displayGlobalLeftMenu(){
      this.isLeftMenuOpen = !this.isLeftMenuOpen;
    }

  /*  openImportPopin() {
      this.displayImportPopin = true;
      this.appRef.tick();
      this.importPopin.open();
    }

    openExportPopin() {
      this.displayExportPopin = true;
      this.appRef.tick();
      this.exportPopin.open();
    }

    // changes the top level css classes to change the overall display
    manageDisplayRights(rights){
      let classes:string[] = [];
      if (rights.scripts) classes.push("has-scripts");
      if (rights.selectors) classes.push("has-selectors");
      if (rights["selectors-agent"]) classes.push("has-selectors-agent");
      if (rights["selectors-svi"]) classes.push("has-selectors-svi");
      if (rights["resources-survey"]) classes.push("has-selectors-survey");
      if (rights.history) classes.push("has-history");
      if (rights.administration) classes.push("has-administration");
      if (rights.resources) classes.push("has-resources");
      if (rights["resources-tabs"]) classes.push("has-resources-tabs");
      if (rights["resources-agent"]) classes.push("has-resources-agent");
      if (rights["resources-svi"]) classes.push("has-resources-svi");
      if (rights["resources-survey"]) classes.push("has-resources-survey");

      this.displayRightsClass = classes.join(" ");
    } */

    togglePortal(){
      if(this.menuPortal == "") this.menuPortal = "active";
      else this.menuPortal = "";
    }

    // the labels for the modules are stored separately on the backend,
    // we have to fetch them and include them in the other labels
    addModuleTranslations() {
      let url: string = Constants.privateUrlBase + "/module/translations";
      this.requester.get(url, this.setNewTranslations.bind(this), this.errorGetModuleTranslations.bind(this));
    }

    setNewTranslations(data: any) {
      for(let locale in data) {
        let language:string = locale.substring(0, locale.indexOf('_'));
        if (this.isLanguageLoading(language)) {
          this.translate.setTranslation(language, data[locale], true);
        }
      }
    }

    isLanguageLoading(language:string) {
      let languageExist:boolean = false;
      for (let translatorLanguage of this.translate.getLangs()) {
        if (translatorLanguage === language) {
          languageExist = true;
          break;
        }
      }
      return languageExist;
    }

    errorGetModuleTranslations(err: any) {
      console.error("error : ", err);
    }
}
