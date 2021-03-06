import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { PropTypes as MobxPropTypes } from "mobx-react";
import UiState from "../../stores/view/UiState";
import TestRow from "../TestRow";
import "./style.css";

@observer export default class TestTable extends React.Component {
  static propTypes = {
    commands: MobxPropTypes.arrayOrObservableArray,
    selectedCommand: PropTypes.string,
    selectCommand: PropTypes.func,
    addCommand: PropTypes.func,
    removeCommand: PropTypes.func,
    swapCommands: PropTypes.func,
    clearAllCommands: PropTypes.func
  };
  render() {
    return (
      <div className="test-table">
        <table>
          <thead>
            <tr>
              <th>Command</th>
              <th>Target</th>
              <th colSpan={this.props.commands && this.props.commands.length ? "2" : "1"}>Value</th>
            </tr>
          </thead>
          <tbody>
            { this.props.commands ? this.props.commands.map((command, index) => (
              <TestRow
                key={command.id}
                id={command.id}
                index={index}
                command={command.command}
                target={command.target}
                value={command.value}
                state={ this.props.selectedCommand === command.id ? "Selected" : null }
                dragInProgress={UiState.dragInProgress}
                onClick={this.props.selectCommand ? () => { this.props.selectCommand(command); } : null}
                addCommand={this.props.addCommand ? (command) => { this.props.addCommand(index, command); } : null}
                remove={this.props.removeCommand ? () => { this.props.removeCommand(command); } : null}
                swapCommands={this.props.swapCommands}
                setDrag={UiState.setDrag}
                clipboard={UiState.clipboard}
                copyToClipboard={() => { UiState.copyToClipboard(command); }}
                clearAllCommands={this.props.clearAllCommands}
              />
            )) : null }
          </tbody>
        </table>
      </div>
    );
  }
}
