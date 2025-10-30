import experiences from '../models/experiences.model.js';
import slotModel from '../models/slot.model.js';
import appResponse from '../utils/appResponse.js';

export async function listAllExperiences(req, res, next) {
  try {
    const places = await experiences.find();
    appResponse(res, {
      message: 'Experiences fetched successfully',
      statusCode: 200,
      data: places,
    });
  } catch (error) {
    next(error);
  }
}

export async function getEachExperience(req, res, next) {
  try {
    const experienceId = req.params.id;
    const experienceDetails = await slotModel
      .find({ experienceId })
      .populate('experienceId', '-__v')
      .lean();

    appResponse(res, {
      message: 'Experience details fetched successfully',
      statusCode: 200,
      data: experienceDetails,
    });
  } catch (error) {
    next(error);
  }
}
