import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CanvasToolsService {

  public fontSize: number = 20;

  constructor() { }

  public drawRectText(ctx: CanvasRenderingContext2D, x:number, y:number, text:string):void{

    ctx.strokeRect( x, y, text.length * 10.5, this.fontSize * 2);

    ctx.font = this.fontSize + "px Arial";
    ctx.fillText(text, x + 5, y + this.fontSize + 5);
  }

  public drawRectTextNeon(ctx: CanvasRenderingContext2D, x:number, y:number, text:string):void{

    ctx.fillStyle = ctx.strokeStyle;
    ctx.fillRect( x, y, text.length * 10.5, this.fontSize * 2);

    ctx.fillStyle = "#ffffff";
    ctx.font = this.fontSize + "px Arial";
    ctx.fillText(text, x + 5, y + this.fontSize + 5);
    ctx.fillStyle = "#000000";

  }

  public drawRectTextGrades(ctx: CanvasRenderingContext2D, x:number, y:number, text:string):void{

    ctx.strokeRect( x, y, 40, this.fontSize * 2);

    ctx.font = this.fontSize + "px Arial";
    ctx.fillText(text, x + 5, y + this.fontSize + 5);
  }

  public drawRectTextNotes(ctx: CanvasRenderingContext2D, x:number, y:number, text:string):void{

    ctx.strokeRect( x, y, 65, this.fontSize * 2);

    ctx.font = this.fontSize + "px Arial";
    ctx.fillText(text, x + 5, y + this.fontSize + 5);
  }

  public drawRectTextNotesNeon(ctx: CanvasRenderingContext2D, x:number, y:number, text:string):void{
    ctx.fillStyle = ctx.strokeStyle;
    ctx.fillRect( x, y, 65, this.fontSize * 2);
    
    ctx.fillStyle = "#ffffff";
    ctx.font = this.fontSize + "px Arial";
    ctx.fillText(text, x + 5, y + this.fontSize + 5);
    ctx.fillStyle = "#000000";

  }

  public drawRectTextNotesLarge(ctx: CanvasRenderingContext2D, x:number, y:number, text:string):void{

    ctx.strokeRect( x, y, 85, this.fontSize * 2);

    ctx.font = this.fontSize + "px Arial";
    ctx.fillText(text, x + 5, y + this.fontSize + 5);
  }

  public drawRectTextNotesLargeNeon(ctx: CanvasRenderingContext2D, x:number, y:number, text:string):void{
    ctx.fillStyle = ctx.strokeStyle;
    ctx.fillRect( x, y, 85, this.fontSize * 2);

    ctx.fillStyle = "#ffffff";
    ctx.font = this.fontSize + "px Arial";
    ctx.fillText(text, x + 5, y + this.fontSize + 5);
    ctx.fillStyle = "#000000";
  }

}
