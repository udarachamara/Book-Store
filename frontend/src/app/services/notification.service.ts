import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Constatnt } from '../shared/constant';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showSuccess(message, title) {
    this.toastr.success(message, title)
  }

  showError(message, title) {
    this.toastr.error(message, title)
  }

  showInfo(message, title) {
    this.toastr.info(message, title)
  }

  showWarning(message, title) {
    this.toastr.warning(message, title)
  }

  saveSuccess() {
    this.toastr.success(Constatnt.SAVED_SUCCESS, Constatnt.TITLE_SUCCESS)
  }

  saveError() {
    this.toastr.error(Constatnt.SAVED_ERROR, Constatnt.TITLE_ERROR)
  }

  updateSuccess() {
    this.toastr.success(Constatnt.UPADTE_SUCCESS, Constatnt.TITLE_SUCCESS)
  }

  updateError() {
    this.toastr.error(Constatnt.UPADTE_ERROR, Constatnt.TITLE_ERROR)
  }

  deleteSuccess() {
    this.toastr.success(Constatnt.DELETE_SUCCESS, Constatnt.TITLE_SUCCESS)
  }

  deleteError() {
    this.toastr.error(Constatnt.DELETE_ERROR, Constatnt.TITLE_ERROR)
  }

}
