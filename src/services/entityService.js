import axios from "axios";
var url = 'http://24.10.213.132:8085';

export class EntityService {
  EntityService() {

  }
  static entityToCreateEntityRequest(entity) {
    var request = {};
    request.entityTypeId = entity.entityTypeId;
    request.tags = entity.tags;
    //request.entityProperties = entity.properties;
    var entityProperties = {}; 
    for (var property of entity.properties) {
      entityProperties[property.propertyName] = property.value;
    }
    request.entityProperties = entityProperties;
    request.name = entity.name;

    return request
  }

  static async getAllEntities() {
    var response = await axios.get(url + '/Entity/Entities')
    return response.data;
  }

  static async createEntity(newEntity) {
    var request = EntityService.entityToCreateEntityRequest(newEntity);
    console.log("requesting new entity with request:");
    console.log(request);
    return await axios.put(url + '/Entity', EntityService.entityToCreateEntityRequest(newEntity) )
  }

  static async getAllTags() {
    var response = await axios.get(url + '/Entity/tags')
    return response.data;
  }

  static async updateEntity(updatedEntity) {
    console.log("Sending request to update entity:");
    console.log(updatedEntity);
    var response = await axios.post(url + '/Entity', updatedEntity)
    return response.data;
  }

  
}