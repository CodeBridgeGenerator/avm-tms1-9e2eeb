import React from "react";
import { render, screen } from "@testing-library/react";

import TktCollectionDetailsEditDialogComponent from "../TktCollectionDetailsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders tktCollectionDetails edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TktCollectionDetailsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("tktCollectionDetails-edit-dialog-component")).toBeInTheDocument();
});
