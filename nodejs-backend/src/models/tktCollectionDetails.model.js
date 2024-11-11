
    module.exports = function (app) {
        const modelName = 'tkt_collection_details';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            machineID: { type:  String , required: true },
userName: { type: Schema.Types.ObjectId, ref: "users" },
userMailAddress: { type: Schema.Types.ObjectId, ref: "users" },
location: { type:  String , required: true },
userCheckList: { type:  String , required: true },
tktStatus: { type:  String , required: true },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };