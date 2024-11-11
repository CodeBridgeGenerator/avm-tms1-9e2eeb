import React from "react";
import { render, screen } from "@testing-library/react";

import UserChecklistDetailsCreateDialogComponent from "../UserChecklistDetailsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders userChecklistDetails create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <UserChecklistDetailsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("userChecklistDetails-create-dialog-component")).toBeInTheDocument();
});
