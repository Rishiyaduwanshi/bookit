import experiences from '../models/experiences.model.js';
import appResponse from '../utils/appResponse.js';

export async function listAllExperiences(req, res, next) {
  const places = await experiences.find();
  appResponse(res, {
    message: 'Experiences fetched successfully',
    statusCode: 200,
    data: places,
  });
}
