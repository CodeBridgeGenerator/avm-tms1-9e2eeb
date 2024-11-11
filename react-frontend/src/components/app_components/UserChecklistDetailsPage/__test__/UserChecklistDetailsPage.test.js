import React from "react";
import { render, screen } from "@testing-library/react";

import UserChecklistDetailsPage from "../UserChecklistDetailsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders userChecklistDetails page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <UserChecklistDetailsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("userChecklistDetails-datatable")).toBeInTheDocument();
    expect(screen.getByRole("userChecklistDetails-add-button")).toBeInTheDocument();
});
