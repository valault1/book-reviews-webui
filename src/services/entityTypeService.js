import axios from "axios";
var url = 'http://24.10.213.132:8085';

export class EntityTypeService {
  EntityTypeService() {

  }

  static async getEntityTypes() {
    var result = await axios.get(url + '/EntityType/EntityTypes');
    return result.data
  }
  async getEntityTypeIds() {

  }
}