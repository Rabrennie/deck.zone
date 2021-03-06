
export class ProjectComponent {
  constructor() {
    this.internalProject = {};
  }

  ngOnChanges(data) {
    const changedProject = data.project.currentValue;
    if(!changedProject) return false;
    this.internalProject = changedProject;
    return true;
  }
}