import express, { Router } from 'express';
import {
  addOrganizationMember,
  createNewOrganization,
  getOrganizationMembers,
  getUsersOrganizations,
} from './controllers/organizations';
import { createNewEvent, getEvents } from './controllers/events';
import {
  addNewParticipant,
  getAllParticipants,
  getParticipantById,
  checkInParticipant,
  getAllParticipantsCheckInDetails,
  getParticipantAttributes,
  setParticipantAttribute,
  checkOutParticipant,
  editParticipant,
  updateParticipantAttribute,
} from './controllers/participants';
import {
  addNewAttribute,
  editAttribute,
  getAllAttributes,
  getAttributeById,
  getAttributeParticipants,
} from './controllers/attributes';
import { fetchAccountDetails, updateAccountDetails } from './controllers/users';

const router: Router = express.Router();

router.get('/', (req: any, res: any) => {
  try {
    return res.send('Hello World!');
  } catch (err) {
    console.error(err);
    return res.status(500);
  }
});

router.get('/users/me', fetchAccountDetails);
router.put('/users/me', updateAccountDetails);

router.get('/organizations', getUsersOrganizations);
router.post('/organizations', createNewOrganization);

router.get('/organizations/:orgId/members', getOrganizationMembers);
router.post('/organizations/:orgId/members', addOrganizationMember);

router.get('/organizations/:orgId/events', getEvents);
router.post('/organizations/:orgId/events', createNewEvent);

router.get('/organizations/:orgId/events/:eventId/participants', getAllParticipants);
router.post('/organizations/:orgId/events/:eventId/participants', addNewParticipant);
router.put('/organizations/:orgId/events/:eventId/participants/:participantId', editParticipant);

router.get(
  '/organizations/:orgId/events/:eventId/participants/check-in',
  getAllParticipantsCheckInDetails,
);
router.get('/organizations/:orgId/events/:eventId/participants/:participantId', getParticipantById);
router.post(
  '/organizations/:orgId/events/:eventId/participants/check-in/:participantId',
  checkInParticipant,
);
router.post(
  '/organizations/:orgId/events/:eventId/participants/check-out/:participantId',
  checkOutParticipant,
);

router.get(
  '/organizations/:orgId/events/:eventId/participants/:participantId/attributes',
  getParticipantAttributes,
);
router.post(
  '/organizations/:orgId/events/:eventId/participants/:participantId/attributes',
  setParticipantAttribute,
);
router.put(
  '/organizations/:orgId/events/:eventId/participants/:participantId/attributes/:attributeId',
  updateParticipantAttribute,
);

router.get('/organizations/:orgId/events/:eventId/attributes', getAllAttributes);
router.get('/organizations/:orgId/events/:eventId/attributes/:attributeId', getAttributeById);
router.get(
  '/organizations/:orgId/events/:eventId/attributes/:attributeId/participants',
  getAttributeParticipants,
);
router.put('/organizations/:orgId/events/:eventId/attributes/:attributeId', editAttribute);
router.post('/organizations/:orgId/events/:eventId/attributes', addNewAttribute);

export default router;
