import React from "react";
import { render, screen } from "@testing-library/react";

import TktCollectionDetailsPage from "../TktCollectionDetailsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders tktCollectionDetails page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TktCollectionDetailsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("tktCollectionDetails-datatable")).toBeInTheDocument();
    expect(screen.getByRole("tktCollectionDetails-add-button")).toBeInTheDocument();
});
