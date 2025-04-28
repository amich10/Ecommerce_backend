class BaseService{
    ModelClass;
    constructor(_ModelClass){
        this.ModelClass = _ModelClass  

    }

    create = async (data) =>{
        try{
            const obj = new this.ModelClass(data)
            return await obj.save()
        }catch(exception){
            throw exception
        }
    }

    getSingleRow = async (filter) =>{
        try{
            const data = await this.ModelClass.findOne(filter)
            // Log the data if needed using a proper logging mechanism
            return data
        }catch(exception){
            throw exception
        }
    }

    updateRowByFilter = async (filter, updateData) =>{
        try{
            const update = await this.ModelClass.findOneAndUpdate(filter,{
                $set:updateData
            },{
                new:true
            })
            return update;
        }catch(exception){
            throw exception
        }
    }

    deleteRowByFilter = async (filter) =>{
        try{
            const delData = await this.ModelClass.findOneAndDelete(filter);
            return delData;
        }catch(exception){
            throw exception
        }
    }
    
}

export default BaseService;