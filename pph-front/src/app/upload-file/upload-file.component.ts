import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import {Constants} from "../utils/constants";

@Component({
  selector: 'app-upload-file',
  template: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  public uploader:FileUploader = new FileUploader({url: Constants.privateUrlBase + '/' + Constants.publicUrlBase+'upload'});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  ngOnInit() {

  }

}
