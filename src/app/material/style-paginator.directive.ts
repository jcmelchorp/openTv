import {
    ElementRef,
    AfterViewInit,
    Directive,
    Host,
    Optional,
    Renderer2,
    Self,
    ViewContainerRef,
    Input
  } from "@angular/core";
  import { MatPaginator } from "@angular/material/paginator";
  import { MatButton } from "@angular/material/button";
  
  interface PageObject {
    length: number;
    pageIndex: number;
    pageSize: number;
    previousPageIndex: number;
  }
  
  @Directive({
    selector: "[style-paginator]"
  })
  export class StylePaginatorDirective {
    private _pageGapTxt = "...";
    private _rangeStart: number;
    private _rangeEnd: number;
    private _buttons = [];
    private _curPageObj: PageObject = {
      length: 0,
      pageIndex: 0,
      pageSize: 0,
      previousPageIndex: 0
    };
  
    @Input()
    get showTotalPages(): number {
      return this._showTotalPages;
    }
    set showTotalPages(value: number) {
      this._showTotalPages = value % 2 == 0 ? value + 1 : value;
    }
    private _showTotalPages = 2;
  
    get inc(): number {
      return this._showTotalPages % 2 == 0
        ? this.showTotalPages / 2
        : (this.showTotalPages - 1) / 2;
    }
  
    get numOfPages(): number {
      return this.matPag.getNumberOfPages();
    }
  
    get lastPageIndex(): number {
      return this.matPag.getNumberOfPages() - 1;
    }
  
    constructor(
      @Host() @Self() @Optional() private readonly matPag: MatPaginator,
      private vr: ViewContainerRef,
      private ren: Renderer2
    ) {
      //to rerender buttons on items per page change and first, last, next and prior buttons
      this.matPag.page.subscribe((e: PageObject) => {
        if (
          this._curPageObj.pageSize != e.pageSize &&
          this._curPageObj.pageIndex != 0
        ) {
          e.pageIndex = 0;
          this._rangeStart = 0;
          this._rangeEnd = this._showTotalPages - 1;
        }
        this._curPageObj = e;
  
        this.initPageRange();
      });
    }
  
    private buildPageNumbers() {
      const actionContainer = this.vr.element.nativeElement.querySelector(
        "div.mat-paginator-range-actions"
      );
      const nextPageNode = this.vr.element.nativeElement.querySelector(
        "button.mat-paginator-navigation-next"
      );
      const prevButtonCount = this._buttons.length;
  
      // remove buttons before creating new ones
      if (this._buttons.length > 0) {
        this._buttons.forEach(button => {
          this.ren.removeChild(actionContainer, button);
        });
        //Empty state array
        this._buttons.length = 0;
      }
  
      //initialize next page and last page buttons
      if (this._buttons.length == 0) {
        let nodeArray = this.vr.element.nativeElement.childNodes[0].childNodes[0]
          .childNodes[2].childNodes;
        setTimeout(() => {
          for (let i = 0; i < nodeArray.length; i++) {
            if (nodeArray[i].nodeName === "BUTTON") {
              if (nodeArray[i].innerHTML.length > 100 && nodeArray[i].disabled) {
                this.ren.setStyle(
                  nodeArray[i],
                  "background-color",
                  "rgba(190, 130, 130, 1)"
                );
                this.ren.setStyle(nodeArray[i], "color", "white");
                this.ren.setStyle(nodeArray[i], "margin", ".5%");
              } else if (
                nodeArray[i].innerHTML.length > 100 &&
                !nodeArray[i].disabled
              ) {
                this.ren.setStyle(
                  nodeArray[i],
                  "background-color",
                  "hsla(19, 100.00%, 50.00%, 0.75)"
                );
                this.ren.setStyle(nodeArray[i], "color", "white");
                this.ren.setStyle(nodeArray[i], "margin", ".5%");
              } else if (nodeArray[i].disabled) {
                this.ren.setStyle(nodeArray[i], "background-color", "lightgray");
              }
            }
          }
        });
      }
  
      for (let i = 0; i < this.numOfPages; i++) {
        if (i >= this._rangeStart && i <= this._rangeEnd) {
          this.ren.insertBefore(
            actionContainer,
            this.createButton(i, this.matPag.pageIndex),
            nextPageNode
          );
        }
  
        if (i == this._rangeEnd) {
          this.ren.insertBefore(
            actionContainer,
            this.createButton(this._pageGapTxt, this._rangeEnd),
            nextPageNode
          );
        }
      }
    }
  
    private createButton(i: any, pageIndex: number): any {
      const linkBtn: MatButton = this.ren.createElement("button");
      this.ren.addClass(linkBtn, "mat-mini-fab");
      this.ren.setStyle(linkBtn, "margin", "1%");
      this.ren.setStyle(linkBtn, "background-color", "white");
  
      const pagingTxt = isNaN(i) ? this._pageGapTxt : +(i + 1);
      const text = this.ren.createText(pagingTxt + "");
  
      this.ren.addClass(linkBtn, "mat-custom-page");
      switch (i) {
        case pageIndex:
          this.ren.setAttribute(linkBtn, "disabled", "disabled");
          break;
        case this._pageGapTxt:
          let newIndex = this._curPageObj.pageIndex + this._showTotalPages;
  
          if (newIndex >= this.numOfPages) newIndex = this.lastPageIndex;
  
          if (pageIndex != this.lastPageIndex) {
            this.ren.listen(linkBtn, "click", () => {
              console.log("working: ", pageIndex);
              this.switchPage(newIndex);
            });
          }
  
          if (pageIndex == this.lastPageIndex) {
            this.ren.setAttribute(linkBtn, "disabled", "disabled");
          }
          break;
        default:
          this.ren.listen(linkBtn, "click", () => {
            this.switchPage(i);
          });
          break;
      }
  
      this.ren.appendChild(linkBtn, text);
      //Add button to private array for state
      this._buttons.push(linkBtn);
      return linkBtn;
    }
    //calculates the button range based on class input parameters and based on current page index value. Used to render new buttons after event.
    private initPageRange(): void {
      const middleIndex = (this._rangeStart + this._rangeEnd) / 2;
  
      this._rangeStart = this.calcRangeStart(middleIndex);
      this._rangeEnd = this.calcRangeEnd(middleIndex);
  
      this.buildPageNumbers();
    }
  
    //Helper function To calculate start of button range
    private calcRangeStart(middleIndex: number): number {
      switch (true) {
        case this._curPageObj.pageIndex == 0 && this._rangeStart != 0:
          return 0;
        case this._curPageObj.pageIndex > this._rangeEnd:
          return this._curPageObj.pageIndex + this.inc > this.lastPageIndex
            ? this.lastPageIndex - this.inc * 2
            : this._curPageObj.pageIndex - this.inc;
        case this._curPageObj.pageIndex > this._curPageObj.previousPageIndex &&
          this._curPageObj.pageIndex > middleIndex &&
          this._rangeEnd < this.lastPageIndex:
          return this._rangeStart + 1;
        case this._curPageObj.pageIndex < this._curPageObj.previousPageIndex &&
          this._curPageObj.pageIndex < middleIndex &&
          this._rangeStart > 0:
          return this._rangeStart - 1;
        default:
          return this._rangeStart;
      }
    }
    //Helpter function to calculate end of button range
    private calcRangeEnd(middleIndex: number): number {
      switch (true) {
        case this._curPageObj.pageIndex == 0 &&
          this._rangeEnd != this._showTotalPages:
          return this._showTotalPages - 1;
        case this._curPageObj.pageIndex > this._rangeEnd:
          return this._curPageObj.pageIndex + this.inc > this.lastPageIndex
            ? this.lastPageIndex
            : this._curPageObj.pageIndex + 1;
        case this._curPageObj.pageIndex > this._curPageObj.previousPageIndex &&
          this._curPageObj.pageIndex > middleIndex &&
          this._rangeEnd < this.lastPageIndex:
          return this._rangeEnd + 1;
        case this._curPageObj.pageIndex < this._curPageObj.previousPageIndex &&
          this._curPageObj.pageIndex < middleIndex &&
          this._rangeStart >= 0 &&
          this._rangeEnd > this._showTotalPages - 1:
          return this._rangeEnd - 1;
        default:
          return this._rangeEnd;
      }
    }
    //Helper function to switch page on non first, last, next and previous buttons only.
    private switchPage(i: number): void {
      console.log("switch", i);
      const previousPageIndex = this.matPag.pageIndex;
      this.matPag.pageIndex = i;
      this.matPag["_emitPageEvent"](previousPageIndex);
      this.initPageRange();
    }
    //Initialize default state after view init
    public ngAfterViewInit() {
      this._rangeStart = 0;
      this._rangeEnd = this._showTotalPages - 1;
      this.initPageRange();
    }
  }
  