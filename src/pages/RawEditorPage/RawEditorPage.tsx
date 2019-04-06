import * as React from "react";
import classnames from "classnames";

import {
  Theme,
  createStyles,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import PageContainer from "@/components/PageContainer";

import AbstractRawEditor from "@/services/oni-save/components/AbstractRawEditor";

import PathSelector from "./components/PathSelector";
import RedirectIfNoSave from "@/components/RedirectIfNoSave";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column"
    },
    selectorContainer: {
      width: "100%"
    },
    editorContainer: {
      flexGrow: 1,
      width: "100%",
      height: "100%"
    },
    editorError: {
      borderStyle: "solid",
      borderColor: "red"
    }
  });

type Props = WithStyles<typeof styles>;
const RawEditorPage: React.FC<Props> = ({ classes }) => {
  const [path, setPath] = React.useState(["header"]);
  return (
    <React.Fragment>
      <RedirectIfNoSave />
      <AbstractRawEditor path={path}>
        {({ value, valid, onChange, onReset, onApply }) => (
          <PageContainer title="Raw Editor" back>
            <div className={classes.root}>
              <div className={classes.selectorContainer}>
                <PathSelector path={path} onChange={setPath} />
              </div>
              <div
                className={classnames(
                  classes.editorContainer,
                  !valid && classes.editorError
                )}
              >
                {value && (
                  <div>
                    <textarea
                      value={value}
                      onChange={e => onChange(e.target.value)}
                    />
                    <button onClick={onReset}>Reset</button>
                    <button onClick={onApply}>Apply</button>
                  </div>
                )}
              </div>
            </div>
          </PageContainer>
        )}
      </AbstractRawEditor>
    </React.Fragment>
  );
};
export default withStyles(styles)(RawEditorPage);