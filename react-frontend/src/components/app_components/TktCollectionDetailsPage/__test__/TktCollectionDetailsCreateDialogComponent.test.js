import React from "react";
import { render, screen } from "@testing-library/react";

import TktCollectionDetailsCreateDialogComponent from "../TktCollectionDetailsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders tktCollectionDetails create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TktCollectionDetailsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("tktCollectionDetails-create-dialog-component")).toBeInTheDocument();
});
