import * as React from "react";
import injectSheet, { StyledComponentProps, StyleCreator } from "react-jss";
import classNames from "classnames";

import { ITheme } from "../../styles/theme";
import CardHeader from "./CardHeader";

export interface ICardProps extends StyledComponentProps {
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

const Card: React.FC<ICardProps> = ({
  classes,
  title,
  description,
  children,
  className,
  action
}) => {
  return (
    <div
      className={classNames({
        [classes.root]: true,
        [className]: className
      })}
    >
      {(title || description || action) && (
        <CardHeader title={title} description={description} action={action} />
      )}
      {children && <div className={classes.content}>{children}</div>}
    </div>
  );
};

const styles: StyleCreator = (theme: ITheme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.colors.dark[2],
    borderRadius: theme.layout.borderRadius,
    border: `1px solid ${theme.colors.dark[5]}`,
    padding: theme.layout.gutter,
    boxShadow: theme.layout.boxShadow,
    position: "relative"
  },
  content: {
    width: "100%",
    height: "100%"
  }
});

export default injectSheet(styles)(Card);
