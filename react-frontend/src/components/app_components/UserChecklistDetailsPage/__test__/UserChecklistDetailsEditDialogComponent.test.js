import React from "react";
import { render, screen } from "@testing-library/react";

import UserChecklistDetailsEditDialogComponent from "../UserChecklistDetailsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders userChecklistDetails edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <UserChecklistDetailsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("userChecklistDetails-edit-dialog-component")).toBeInTheDocument();
});
