import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const UserChecklistDetailsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [], setError);
        }
        set_entity({...init});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.checkListName)) {
                error["checkListName"] = `CheckListName field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.checkListDescription)) {
                error["checkListDescription"] = `CheckListDescription field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.checkListItems)) {
                error["checkListItems"] = `CheckListItems field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.checkListOrder)) {
                error["checkListOrder"] = `CheckListOrder field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            checkListName: _entity?.checkListName,checkListDescription: _entity?.checkListDescription,checkListItems: _entity?.checkListItems,checkListOrder: _entity?.checkListOrder,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("userChecklistDetails").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info UserChecklistDetails created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in UserChecklistDetails" });
        }
        setLoading(false);
    };

    

    

    

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    

    return (
        <Dialog header="Create UserChecklistDetails" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="userChecklistDetails-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="checkListName">CheckListName:</label>
                <InputText id="checkListName" className="w-full mb-3 p-inputtext-sm" value={_entity?.checkListName} onChange={(e) => setValByKey("checkListName", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["checkListName"]) ? (
              <p className="m-0" key="error-checkListName">
                {error["checkListName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="checkListDescription">CheckListDescription:</label>
                <InputText id="checkListDescription" className="w-full mb-3 p-inputtext-sm" value={_entity?.checkListDescription} onChange={(e) => setValByKey("checkListDescription", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["checkListDescription"]) ? (
              <p className="m-0" key="error-checkListDescription">
                {error["checkListDescription"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="checkListItems">CheckListItems:</label>
                <InputText id="checkListItems" className="w-full mb-3 p-inputtext-sm" value={_entity?.checkListItems} onChange={(e) => setValByKey("checkListItems", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["checkListItems"]) ? (
              <p className="m-0" key="error-checkListItems">
                {error["checkListItems"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="checkListOrder">CheckListOrder:</label>
                <InputText id="checkListOrder" className="w-full mb-3 p-inputtext-sm" value={_entity?.checkListOrder} onChange={(e) => setValByKey("checkListOrder", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["checkListOrder"]) ? (
              <p className="m-0" key="error-checkListOrder">
                {error["checkListOrder"]}
              </p>
            ) : null}
          </small>
            </div>
            <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(UserChecklistDetailsCreateDialogComponent);
