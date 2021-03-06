import { action, computed, observable } from "mobx";
import SuiteState from "./SuiteState";

class UiState {
  @observable selectedTest = {};
  @observable selectedCommand = null;
  @observable filterTerm = "";
  @observable dragInProgress = false;
  @observable clipboard = null;

  constructor() {
    this.suiteStates = {};
    this.filterFunction = this.filterFunction.bind(this);
  }

  @computed get filteredTests() {
    return this._project.tests.filter(this.filterFunction);
  }

  @action.bound copyToClipboard(item) {
    this.clipboard = item;
  }

  @action.bound selectTest(testId, suiteId) {
    this.selectedTest = { testId, suiteId };
  }

  @action.bound selectCommand(command) {
    this.selectedCommand = command;
  }

  @action.bound changeFilter(term) {
    this.filterTerm = term;
  }

  @action.bound setDrag(dragProgress) {
    this.dragInProgress = dragProgress;
  }

  addStateForSuite(suite) {
    this.suiteStates[suite.id] = new SuiteState(this, suite);
  }

  filterFunction({name}) {
    return (name.indexOf(this.filterTerm) !== -1);
  }
}

if (!window._state) window._state = new UiState();

export default window._state;
