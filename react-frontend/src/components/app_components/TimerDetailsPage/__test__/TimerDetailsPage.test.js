import React from "react";
import { render, screen } from "@testing-library/react";

import TimerDetailsPage from "../TimerDetailsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders timerDetails page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TimerDetailsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("timerDetails-datatable")).toBeInTheDocument();
    expect(screen.getByRole("timerDetails-add-button")).toBeInTheDocument();
});
