class Menu{
  constructor(){
    this.del = createButton("Delete")
    this.sav = createButton('Save')
    this.zoomOut = createButton("Zoom Out")
    this.zoomIn = createButton("Zoom In")
    this.shift = createButton("Turbo");
    this.magLock = createButton("Grid Snap")
    this.grid = createButton("Grid Overlay");
    this.clear = createButton("Clear");
    this.lock = createButton("Lock");
    
    this.sav.mousePressed(sav);
    this.del.mousePressed(del);
    this.zoomOut.mousePressed(zoomOut);
    this.zoomIn.mousePressed(zoomIn);
    this.shift.mousePressed(shiftLock);
    this.magLock.mousePressed(gridSnap)
    this.grid.mousePressed(gridOverlay);
    this.clear.mousePressed(clearTogg);
    this.lock.mousePressed(lockTogg);
    
    this.del.attribute("title", "Shortcut - DEL\nDeletes currently selected object");
    this.sav.attribute("title", "Shortcut - CTRL-S\nSaves canvas as a jpeg");
    this.zoomOut.attribute("title", "Shortcut - [\nZooms out currently selected object");
    this.zoomIn.attribute("title", "Shortcut - ]\nZooms in currently selected object");
    this.shift.attribute("title", "Shortcut - SHIFT\nIncreases speed of all movement")
    this.magLock.attribute("title", "Shortcut - SPACE\nSnaps movement to the grid");
    this.grid.attribute("title", "Shortcut - G\nToggles the grid visibility");
    this.clear.attribute("title", "Shortcut - C\nToggles clear on new frames")
    this.lock.attribute("title", "Shortcut - L\nLocks/Unlocks canvas")
    
    this.del.style('background-color',"#ff5c33")
    this.clear.style('background-color',"#4d9900")
  }

}
