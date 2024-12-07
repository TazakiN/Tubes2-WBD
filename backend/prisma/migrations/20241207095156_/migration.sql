-- CreateIndex
CREATE INDEX "idx_chat_from_id" ON "chat"("from_id");

-- CreateIndex
CREATE INDEX "idx_chat_to_id" ON "chat"("to_id");

-- CreateIndex
CREATE INDEX "idx_chat_timestamp" ON "chat"("timestamp");

-- CreateIndex
CREATE INDEX "idx_connection_from_id" ON "connection"("from_id");

-- CreateIndex
CREATE INDEX "idx_connection_to_id" ON "connection"("to_id");

-- CreateIndex
CREATE INDEX "idx_connection_created_at" ON "connection"("created_at");

-- CreateIndex
CREATE INDEX "idx_connection_request_from_id" ON "connection_request"("from_id");

-- CreateIndex
CREATE INDEX "idx_connection_request_to_id" ON "connection_request"("to_id");

-- CreateIndex
CREATE INDEX "idx_connection_request_created_at" ON "connection_request"("created_at");

-- CreateIndex
CREATE INDEX "idx_feed_user_id" ON "feed"("user_id");

-- CreateIndex
CREATE INDEX "idx_feed_created_at" ON "feed"("created_at");

-- CreateIndex
CREATE INDEX "idx_push_subscriptions_user_id" ON "push_subscriptions"("user_id");

-- CreateIndex
CREATE INDEX "idx_push_subscriptions_created_at" ON "push_subscriptions"("created_at");

-- CreateIndex
CREATE INDEX "idx_users_full_name" ON "users"("full_name");

-- CreateIndex
CREATE INDEX "idx_users_created_at" ON "users"("created_at");
