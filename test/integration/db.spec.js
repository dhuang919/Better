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

// Helper functions which query db
import helpers from '../../server/helpers';

describe('Database', () => {
  describe('Helpers', () => {
    // Example user
    let user = {
      email: 'yolo@yolo.com',
      nickname: 'yolo',
    };
    // Example habits with habit1Id to be assigned in
    // beforeEach and used in habit update/delete
    let habit1Id, habit2Id;
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
        .expect(res => {
          expect(res.body.email).to.equal('yolo@yolo.com');
        })
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
            .expect(res => habit2Id = res.body._id)
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

    describe('getHabits', () => {
      it('should be a function', () => {
        expect(helpers.getHabits).to.be.a('function');
      });

      it('should fetch habits', done => {
        helpers.getHabits(user.email)
          .then(success => {
            expect(success).to.be.a('array');
            expect(success.length).to.equal(2);
            done();
          })
          .catch(err => console.error('db.spec getHabits error:', err));
      });
    });

    describe('addHabit', () => {
      it('should be a function', () => {
        expect(helpers.addHabit).to.be.a('function');
      });

      it('should add both a new habit and an instance store', done => {
        let habit3 = { action: 'Run' };
        helpers.addHabit(user.email, habit3)
          .then(success => {
            expect(success.habit.action).to.equal(habit3.action);
            expect(success.habit.instancesId).to.exist;
            done();
          })
          .catch(err => console.error('db.spec addHabit error:', err));
      });

      it('should error when missing required fields', done => {
        let habit3 = {};
        helpers.addHabit(user.email, habit3)
          .then(success => console.log('db.spec addHabit success:', success))
          .catch(err => {
            expect(err).to.exist;
            done();
          });
      });
    });

    describe('deleteHabit', () => {
      it('should be a function', () => {
        expect(helpers.deleteHabit).to.be.a('function');
      });

      it('should delete habit and corresponding instance store', done => {
        helpers.deleteHabit(user.email, habit1Id)
          .then(success => {
            expect(success._id.toString()).to.equal(habit1Id);

            // In order to confirm instance was deleted,
            // instance1Id is assigned in beforeEach function
            // on line 49 when habit1 is successfully created
            return Instances.findById(instance1Id);
          })
          .then(success => {
            expect(success).to.equal(null);
            done();
          })
          .catch(err => console.error('db.spec deleteHabit error:', err));
      });

      it('should error when attempting to delete invalid ID', done => {
        helpers.deleteHabit(user.email, '12345')
          .then(success => console.log('db.spec deleteHabit success:', success))
          .catch(err => {
            expect(err).to.exist;
            done();
          });
      });
    });

    describe('updateHabit', () => {
      it('should be a function', () => {
        expect(helpers.updateHabit).to.be.a('function');
      });

      it('should update habit with changes', done => {

        // habit1 = { action: 'Write tests', frequency: 'Daily' }
        let update1 = { action : 'Update' };
        helpers.updateHabit(user.email, habit1Id, update1)
          .then(success => {
            expect(success.action).to.equal('Update');
            done();
          })
          .catch(err => console.error('db.spec updateHabit error:', err));
      });

      it('should error when attempting update with incorrect ID', done => {

        // habit1 = { action: 'Write tests', frequency: 'Daily' }
        let update1 = { action: 'Error out' };
        helpers.updateHabit(user.email, '12345', update1)
          .then(success => console.log('db.spec updateHabit success:', success))
          .catch(err => {
            expect(err).to.exist;
            done();
          });
      });
    });

    describe('toggleInstance', () => {
      it('should be a function', () => {
        expect(helpers.toggleInstance).to.be.a('function');
      });

      it('should create an instance for existing habit', done => {
        helpers.toggleInstance(user.email, habit1Id)
          .then(success => {
            expect(success.instance._id).to.exist;
            done();
          })
          .catch(err => console.error('toggleInstance error:', err));
      });

      it('should error when attempting to create instance on non-existent habit', done => {
        helpers.toggleInstance(user.email, '12345')
          .then(success => console.log('db.spec toggleInstance success:', success))
          .catch(err => {
            expect(err).to.exist;
            done();
          });
      });

      it('should update the instanceCount property for the habit', done => {
        helpers.toggleInstance(user.email, habit1Id)
          .then(instance => User.findOne({ email: user.email }))
          .then(user => Habits.findById(user.habitsId))
          .then(habits => {
            let habit = habits.store.id(habit1Id);
            expect(habit.streak.current).to.equal(1);
            done();
          })
          .catch(err => console.log('db.spec toggleInstance error:', err));
      });

      it('should update the lastDone property for the habit', done => {
        User.findOne({ email: user.email })
          .then(user => Habits.findById(user.habitsId))
          .then(habits => {
            let habit = habits.store.id(habit1Id);
            expect(moment(habit.lastDone).isSame(Date.now(), 'minute')).to.equal(true);
            done();
          })
          .catch(err => console.log('db.spec toggleInstance error:', err));
      });
    });
  });
});
