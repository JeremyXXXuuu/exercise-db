import { sqliteTable, text, integer, primaryKey } from "drizzle-orm/sqlite-core";

// Enums
export const MuscleEnum = [
  'abdominals', 'abductors', 'adductors', 'biceps', 'calves',
  'chest', 'forearms', 'glutes', 'hamstrings', 'lats',
  'lower back', 'middle back', 'neck', 'quadriceps',
  'shoulders', 'traps', 'triceps'
] as const;

export const exercises = sqliteTable('exercises', {
  id: text('id').primaryKey().$type<string>(),
  name: text('name').notNull(),
  force: text('force', { 
    enum: ['static', 'pull', 'push'] 
  }),
  level: text('level', { 
    enum: ['beginner', 'intermediate', 'expert'] 
  }).notNull(),
  mechanic: text('mechanic', { 
    enum: ['isolation', 'compound'] 
  }),
  equipment: text('equipment', { 
    enum: ['medicine ball', 'dumbbell', 'body only', 'bands', 
           'kettlebells', 'foam roll', 'cable', 'machine', 
           'barbell', 'exercise ball', 'e-z curl bar', 'other'] 
  }),
  category: text('category', { 
    enum: ['powerlifting', 'strength', 'stretching', 'cardio', 
           'olympic weightlifting', 'strongman', 'plyometrics'] 
  }).notNull(),
});

export const exerciseMuscles = sqliteTable('exercise_muscles', {
  exerciseId: text('exercise_id').notNull().references(() => exercises.id),
  muscle: text('muscle', {
    enum: MuscleEnum
  }).notNull(),
  isPrimary: integer('is_primary', { mode: 'boolean' }).notNull(),
}, (table) => ({
  pk: primaryKey({ columns: [table.exerciseId, table.muscle] })
}));

export const exerciseInstructions = sqliteTable('exercise_instructions', {
  exerciseId: text('exercise_id').notNull().references(() => exercises.id),
  stepNumber: integer('step_number').notNull(),
  instruction: text('instruction').notNull(),
}, (table) => ({
  pk: primaryKey({ columns: [table.exerciseId, table.stepNumber] })
}));

export const exerciseImages = sqliteTable('exercise_images', {
  exerciseId: text('exercise_id').notNull().references(() => exercises.id),
  imageUrl: text('image_url').notNull(),
}, (table) => ({
  pk: primaryKey({ columns: [table.exerciseId, table.imageUrl] })
}));

// Type definitions
export type Exercise = typeof exercises.$inferSelect;
export type NewExercise = typeof exercises.$inferInsert;
export type ExerciseMuscle = typeof exerciseMuscles.$inferSelect;
export type ExerciseInstruction = typeof exerciseInstructions.$inferSelect;
export type ExerciseImage = typeof exerciseImages.$inferSelect;
