// src/lib/server/db/schema.ts

import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm'; // <-- Gerekli import'u ekledik

// Lucia'nın oluşturduğu orijinal user tablosu
export const user = sqliteTable('user', {
	id: text('id').primaryKey(),
	// Not: Lucia'nın son sürümleri age alanını kaldırmış olabilir.
	// age: integer('age'), 
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull()
});

// Lucia'nın oluşturduğu orijinal session tablosu
export const session = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id), // <-- Doğru tabloya referans veriyor
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

// --- YENİ EKLENEN VE DÜZELTİLEN BÖLÜM ---

// 1. pgTable yerine sqliteTable kullandık.
// 2. serial yerine integer().primaryKey({ autoIncrement: true }) kullandık.
// 3. userTable yerine doğru değişken adı olan user'ı kullandık.
export const watchlistTable = sqliteTable('watchlist', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	userId: text('user_id')
		.notNull()
		.references(() => user.id), // <-- Değişti
	ticker: text('ticker').notNull()
});

// İlişkileri doğru değişken adıyla (user) tanımlıyoruz
export const userRelations = relations(user, ({ many }) => ({ // <-- Değişti
	watchlist: many(watchlistTable)
}));

export const watchlistRelations = relations(watchlistTable, ({ one }) => ({
	user: one(user, { // <-- Değişti
		fields: [watchlistTable.userId],
		references: [user.id]
	})
}));

// --- TİP TANIMLAMALARI ---
export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
