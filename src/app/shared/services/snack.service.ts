import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class SnackService {
  constructor(
    private snackBar: MatSnackBar
  ) { }

  justMessage(message: string) {
    this.snackBar.open(message, 'Ok', {
      duration: 2000
    });
    return this.snackBar._openedSnackBarRef;
  }
  messageWithAction(message: string, action: string) {
    this.snackBar.open(message, action);
    return this.snackBar._openedSnackBarRef;
  }

  messageWithComponent(data: any, conf: {
    vPos: MatSnackBarVerticalPosition;
    hPos: MatSnackBarHorizontalPosition;
    setAutoHide: boolean;
    hide: number;
    action: boolean;
    actionString: string;
    extra: boolean;
    message: string,
  }) {
    const config = new MatSnackBarConfig();
    config.verticalPosition = conf.vPos;
    config.horizontalPosition = conf.hPos;
    config.duration = conf.setAutoHide ? conf.hide : 0;
    config.data = data;
    return this.snackBar.open(conf.message, conf.action ? conf.actionString : undefined, config);
  }
}
