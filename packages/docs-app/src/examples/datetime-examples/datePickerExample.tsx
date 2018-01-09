/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

import { Classes, Intent, Switch, Tag } from "@blueprintjs/core";
import { BaseExample, handleBooleanChange } from "@blueprintjs/docs-theme";
import * as classNames from "classnames";
import * as moment from "moment";
import * as React from "react";

import { DatePicker } from "@blueprintjs/datetime";

const FORMAT = "dddd, LL";

export const Moment: React.SFC<{ date: Date; format?: string }> = ({ date, format = FORMAT }) => {
    const m = moment(date);
    if (m.isValid()) {
        return (
            <Tag className={Classes.LARGE} intent={Intent.PRIMARY}>
                {m.format(format)}
            </Tag>
        );
    } else {
        return <Tag className={classNames(Classes.LARGE, Classes.MINIMAL)}>no date</Tag>;
    }
};

export interface IDatePickerExampleState {
    date?: Date;
    reverseMonthAndYearMenus?: boolean;
    showActionsBar?: boolean;
}

export class DatePickerExample extends BaseExample<IDatePickerExampleState> {
    public state: IDatePickerExampleState = {
        date: null,
        reverseMonthAndYearMenus: false,
        showActionsBar: false,
    };

    private toggleActionsBar = handleBooleanChange(showActionsBar => this.setState({ showActionsBar }));
    private toggleReverseMonthAndYearMenus = handleBooleanChange(reverseMonthAndYearMenus =>
        this.setState({ reverseMonthAndYearMenus }),
    );

    protected renderExample() {
        return (
            <div className="docs-datetime-example">
                <DatePicker
                    className={Classes.ELEVATION_1}
                    onChange={this.handleDateChange}
                    reverseMonthAndYearMenus={this.state.reverseMonthAndYearMenus}
                    showActionsBar={this.state.showActionsBar}
                />
                <Moment date={this.state.date} />
            </div>
        );
    }

    protected renderOptions() {
        return [
            [
                <Switch
                    checked={this.state.showActionsBar}
                    label="Show actions bar"
                    key="Actions"
                    onChange={this.toggleActionsBar}
                />,
                <Switch
                    checked={this.state.reverseMonthAndYearMenus}
                    label="Reverse month and year menus"
                    key="Reverse month and year menus"
                    onChange={this.toggleReverseMonthAndYearMenus}
                />,
            ],
        ];
    }

    private handleDateChange = (date: Date) => this.setState({ date });
}
