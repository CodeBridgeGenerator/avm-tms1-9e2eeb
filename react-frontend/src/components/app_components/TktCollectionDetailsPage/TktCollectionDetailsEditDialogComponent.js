import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const TktCollectionDetailsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [userName, setUserName] = useState([])
const [userMailAddress, setUserMailAddress] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount users
                    client
                        .service("users")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleUsersId } })
                        .then((res) => {
                            setUserName(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Users", type: "error", message: error.message || "Failed get users" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            machineID: _entity?.machineID,
userName: _entity?.userName?._id,
userMailAddress: _entity?.userMailAddress?._id,
location: _entity?.location,
userCheckList: _entity?.userCheckList,
tktStatus: _entity?.tktStatus,
        };

        setLoading(true);
        try {
            
        await client.service("tktCollectionDetails").patch(_entity._id, _data);
        const eagerResult = await client
            .service("tktCollectionDetails")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "userName",
                    service : "users",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info tktCollectionDetails updated successfully" });
        props.onEditResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
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

    const userNameOptions = userName.map((elem) => ({ name: elem.name, value: elem.value }));
const userMailAddressOptions = userMailAddress.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit TktCollectionDetails" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="tktCollectionDetails-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="machineID">MachineID:</label>
                <InputText id="machineID" className="w-full mb-3 p-inputtext-sm" value={_entity?.machineID} onChange={(e) => setValByKey("machineID", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["machineID"]) && (
              <p className="m-0" key="error-machineID">
                {error["machineID"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="userName">UserName:</label>
                <Dropdown id="userName" value={_entity?.userName?._id} optionLabel="name" optionValue="value" options={userNameOptions} onChange={(e) => setValByKey("userName", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["userName"]) && (
              <p className="m-0" key="error-userName">
                {error["userName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="userMailAddress">UserMailAddress:</label>
                <Dropdown id="userMailAddress" value={_entity?.userMailAddress?._id} optionLabel="name" optionValue="value" options={userMailAddressOptions} onChange={(e) => setValByKey("userMailAddress", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["userMailAddress"]) && (
              <p className="m-0" key="error-userMailAddress">
                {error["userMailAddress"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="location">Location:</label>
                <InputText id="location" className="w-full mb-3 p-inputtext-sm" value={_entity?.location} onChange={(e) => setValByKey("location", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["location"]) && (
              <p className="m-0" key="error-location">
                {error["location"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="userCheckList">UserCheckList:</label>
                <InputText id="userCheckList" className="w-full mb-3 p-inputtext-sm" value={_entity?.userCheckList} onChange={(e) => setValByKey("userCheckList", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["userCheckList"]) && (
              <p className="m-0" key="error-userCheckList">
                {error["userCheckList"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="tktStatus">TktStatus:</label>
                <InputText id="tktStatus" className="w-full mb-3 p-inputtext-sm" value={_entity?.tktStatus} onChange={(e) => setValByKey("tktStatus", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["tktStatus"]) && (
              <p className="m-0" key="error-tktStatus">
                {error["tktStatus"]}
              </p>
            )}
          </small>
            </div>
                <div className="col-12">&nbsp;</div>
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

export default connect(mapState, mapDispatch)(TktCollectionDetailsCreateDialogComponent);
