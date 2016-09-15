// Sets NODE_ENV in order to suppress loggers (morgan)
process.env.NODE_ENV = 'test';

// Test
import request from 'supertest';
import { expect } from 'chai';

// Bluebird 'join' method used in afterEach function
import { join as Join } from 'bluebird';

// Moment to test the lastDone property
import moment from 'moment';

// Server
const app = require('../../server/server');

// DB Models
import mongoose from 'mongoose';
import {
  User,
  Habits,
  Instances,
} from '../../db/models';

describe('Basic Server', () => {
  // Example user
  let user = { email: 'yolo@yolo.com' };
  // Example habits with habit1Id to be assigned in
  // beforeEach and used in habit PUT/DELETE
  let habit1Id;
  let habit1 = {
    action: 'Write tests',
    frequency: 'Daily',
  };
  let habit2 = {
    action: 'Floss',
    frequency: 'Daily',
  };
  // Instance ID to be assigned in beforeEach
  // to habit1 and used in deleteHabit
  let instance1Id;
  beforeEach(done => {
    request(app)
      .post('/user')
      .send(user)
      .expect(200)
      .expect(res => expect(res.body.email).to.equal('yolo@yolo.com'))
      .end(() => {
        request(app)
        .post(`/habits/${user.email}`)
        .send(habit1)
        .expect(201)
        .expect(res => {
          habit1Id = res.body.habit._id;
          instance1Id = res.body.habit.instancesId;
        })
        .end(() => {
          request(app)
          .post(`/habits/${user.email}`)
          .send(habit2)
          .expect(201)
          .expect(res => habit2Id = res.body.habit._id)
          .end(done);
        });
      });
  });

  afterEach(done => {
    let dropUser = User.remove({});
    let dropHabits = Habits.remove({});
    let dropInstances = Instances.remove({});
    // Promise.join coordinates a fixed number of promises concurrently
    Join(dropUser, dropHabits, dropInstances)
      .then(success => done())
      .catch(err => console.error('db.spec afterEach error:', err));
  });

  after(() => mongoose.connection.close());

  describe('GET /habits/:user', () => {
    it('should return 200 on success', done => {
      request(app)
        .get(`/habits/${user.email}`)
        .expect(200)
        .end(done);
    });

    it('should respond with JSON', done => {
      request(app)
        .get(`/habits/${user.email}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(done);
    });

    it('should retrieve habits', done => {
      request(app)
        .get(`/habits/${user.email}`)
        .expect(200)
        .expect(res => {
          expect(res.body.length).to.equal(2);
          expect(habit1.action).to.equal(res.body[0].action);
          expect(habit1.frequency).to.equal(res.body[0].frequency);
        })
        .end(done);
    });
  });

  describe('POST /habits/:user', () => {
    // Habit to send in POST requests
    let habit3 = { action: 'Run' };

    it('should return 201 on success', done => {
      request(app)
        .post(`/habits/${user.email}`)
        .send(habit3)
        .expect(201)
        .end(done);
    });

    it('should return 400 on error (required fields missing)', done => {
      let errHabit = {};
      request(app)
        .post(`/habits/${user.email}`)
        .send(errHabit)
        .expect(400)
        .end(done);
    });

    it('should respond with new habit on success', done => {
      request(app)
        .post(`/habits/${user.email}`)
        .send(habit3)
        .expect(201)
        .expect(res => expect(res.body.habit.action).to.equal(habit3.action))
        .end(done);
    });

    it('should create new instance for each new habit', done => {
      request(app)
        .post(`/habits/${user.email}`)
        .send(habit3)
        .expect(201)
        .expect(res => {
          instance1Id = res.body.habit.instancesId;
          Instances.findById(instance1Id)
            .then(success => expect(instance1Id).to.equal(success._id.toString()))
            .catch(err => console.error('Instance fail:', err));
        })
        .end(done);
    });
  });

  describe('PUT /habits/:user/:habitid', () => {
    // Updates to be used in request
    let update1 = { action: 'Write BETTER tests' };

    it('should return 200 on success', done => {
      request(app)
        .put(`/habits/${user.email}/${habit1Id}`)
        .send(update1)
        .expect(200)
        .end(done);
    });

    // Incorrect ID not being handled and returning status 200
    it('should return 400 on error (incorrect ID)', done => {
      request(app)
        .put(`/habits/${user.email}/12345`)
        .expect(400)
        .end(done);
    });

    it('should return updated habit', done => {
      request(app)
        .put(`/habits/${user.email}/${habit1Id}`)
        .send(update1)
        .expect(200)
        .expect(res => expect(update1.action).to.equal(res.body.action))
        .end(done);
    });
  });

  describe('DELETE /habits/:user/:habitid', () => {
    it('should return 200 on success', done => {
      request(app)
        .delete(`/habits/${user.email}/${habit1Id}`)
        .expect(200)
        .end(done);
    });

    it('should return 400 on error (incorrect ID)', done => {
      request(app)
        .delete(`/habits/${user.email}/12345`)
        .expect(400)
        .end(done);
    });

    it('should return deleted habit', done => {
      request(app)
        .delete(`/habits/${user.email}/${habit1Id}`)
        .expect(200)
        .expect(res => expect(habit1Id).to.equal(res.body._id))
        .end(done);
    });

    it('should delete habit from database', done => {
      request(app)
        .delete(`/habits/${user.email}/${habit1Id}`)
        .expect(200)
        .end(() => {
          request(app)
            .get(`/habits/${user.email}`)
            .expect(200)
            .expect(res => expect(res.body.length).to.equal(1))
            .end(done);
        });
    });
  });
});
