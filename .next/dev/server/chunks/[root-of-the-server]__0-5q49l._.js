module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/db/index.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "db",
    ()=>db,
    "pool",
    ()=>pool
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$node$2d$postgres$2f$driver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/node-postgres/driver.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import, [project]/node_modules/pg)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$node$2d$postgres$2f$driver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$node$2d$postgres$2f$driver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const databaseUrl = process.env.DATABASE_URL;
const globalForDb = globalThis;
const pool = databaseUrl ? globalForDb.__arenaNextJsPostgresqlPool ?? new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__["Pool"]({
    connectionString: databaseUrl
}) : null;
if (pool && ("TURBOPACK compile-time value", "development") !== "production") {
    globalForDb.__arenaNextJsPostgresqlPool = pool;
}
const db = pool ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$node$2d$postgres$2f$driver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["drizzle"])(pool) : null;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/db/schema.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "members",
    ()=>members,
    "transactions",
    ()=>transactions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/table.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/serial.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/varchar.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/integer.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/timestamp.js [app-route] (ecmascript)");
;
const members = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("members", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serial"])("id").primaryKey(),
    memberId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("member_id", {
        length: 64
    }).notNull().unique(),
    fullName: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("full_name", {
        length: 255
    }).notNull(),
    email: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("email", {
        length: 255
    }).notNull(),
    phone: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("phone", {
        length: 64
    }),
    tier: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("tier", {
        length: 32
    }).notNull().default("Standard"),
    balance: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("balance").notNull().default(0),
    status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("status", {
        length: 32
    }).notNull().default("Active"),
    joinDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("join_date").defaultNow().notNull(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("created_at").defaultNow().notNull(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("updated_at").defaultNow().notNull()
});
const transactions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("transactions", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serial"])("id").primaryKey(),
    transactionId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("transaction_id", {
        length: 64
    }).notNull().unique(),
    memberId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("member_id", {
        length: 64
    }).notNull(),
    type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("type", {
        length: 32
    }).notNull(),
    amount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("amount").notNull(),
    description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("description", {
        length: 255
    }).notNull(),
    resultingBalance: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("resulting_balance").notNull(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("created_at").defaultNow().notNull()
});
}),
"[project]/src/lib/services.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FrequentFlyerStore",
    ()=>FrequentFlyerStore,
    "calculateDashboardStats",
    ()=>calculateDashboardStats,
    "safeSanitize",
    ()=>safeSanitize
]);
function safeSanitize(input) {
    if (!input) return "";
    return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "").replace(/<[^>]+>/g, "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
}
function calculateDashboardStats(members, transactions = []) {
    const totalMembers = members.length;
    const activeMembers = members.filter((m)=>m.status === "Active").length;
    const inactiveMembers = members.filter((m)=>m.status !== "Active").length;
    const totalMiles = members.reduce((acc, m)=>acc + (Number(m.balance) || 0), 0);
    const recentTransactionsCount = transactions.length;
    return {
        totalMembers,
        activeMembers,
        inactiveMembers,
        totalMiles,
        recentTransactionsCount
    };
}
class FrequentFlyerStore {
    members = [];
    transactions = [];
    nextMemberId = 1;
    nextTxnId = 1;
    constructor(initialMembers = [], initialTransactions = []){
        this.members = [
            ...initialMembers
        ];
        this.transactions = [
            ...initialTransactions
        ];
        if (this.members.length > 0) {
            this.nextMemberId = Math.max(...this.members.map((m)=>m.id)) + 1;
        }
        if (this.transactions.length > 0) {
            this.nextTxnId = Math.max(...this.transactions.map((t)=>t.id)) + 1;
        }
    }
    getAllMembers() {
        return [
            ...this.members
        ];
    }
    getMemberByMemberId(memberId) {
        return this.members.find((m)=>m.memberId.toLowerCase() === memberId.toLowerCase());
    }
    addMember(input) {
        const trimmedId = input.memberId.trim().toUpperCase();
        const existing = this.getMemberByMemberId(trimmedId);
        if (existing) {
            throw new Error(`Member ID ${trimmedId} already exists`);
        }
        const member = {
            id: "id" in input && typeof input.id === "number" ? input.id : this.nextMemberId++,
            memberId: trimmedId,
            fullName: safeSanitize(input.fullName.trim()),
            email: input.email.trim().toLowerCase(),
            phone: input.phone ? safeSanitize(input.phone.trim()) : null,
            tier: input.tier,
            balance: Math.max(0, Math.floor(Number(input.balance) || 0)),
            status: input.status,
            joinDate: input.joinDate || new Date().toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        this.members.push(member);
        return member;
    }
    updateMember(memberId, updates) {
        const index = this.members.findIndex((m)=>m.memberId.toLowerCase() === memberId.toLowerCase());
        if (index === -1) {
            throw new Error(`Member with ID ${memberId} not found`);
        }
        const current = this.members[index];
        const updated = {
            ...current,
            fullName: updates.fullName !== undefined ? safeSanitize(updates.fullName.trim()) : current.fullName,
            email: updates.email !== undefined ? updates.email.trim().toLowerCase() : current.email,
            phone: updates.phone !== undefined ? updates.phone ? safeSanitize(updates.phone.trim()) : null : current.phone,
            tier: updates.tier || current.tier,
            status: updates.status || current.status,
            balance: updates.balance !== undefined ? Math.max(0, Math.floor(Number(updates.balance))) : current.balance,
            updatedAt: new Date().toISOString()
        };
        this.members[index] = updated;
        return updated;
    }
    deleteMember(memberId) {
        const initialLen = this.members.length;
        this.members = this.members.filter((m)=>m.memberId.toLowerCase() !== memberId.toLowerCase());
        return this.members.length < initialLen;
    }
    searchMembers(query, tier, status) {
        const q = query.trim().toLowerCase();
        return this.members.filter((member)=>{
            const matchesQuery = !q || member.memberId.toLowerCase().includes(q) || member.fullName.toLowerCase().includes(q) || member.email.toLowerCase().includes(q);
            const matchesTier = !tier || tier === "All" || member.tier === tier;
            const matchesStatus = !status || status === "All" || member.status === status;
            return matchesQuery && matchesTier && matchesStatus;
        });
    }
    processTransaction(input) {
        const member = this.getMemberByMemberId(input.memberId);
        if (!member) {
            throw new Error(`Member not found: ${input.memberId}`);
        }
        const amount = Math.floor(Number(input.amount));
        if (isNaN(amount) || amount <= 0) {
            throw new Error("Transaction amount must be a positive number");
        }
        let newBalance = member.balance;
        if (input.type === "credit") {
            newBalance += amount;
        } else if (input.type === "redemption") {
            if (member.balance < amount) {
                throw new Error(`Insufficient points balance. Member has ${member.balance.toLocaleString()} points, requested ${amount.toLocaleString()}`);
            }
            newBalance -= amount;
        } else {
            throw new Error("Invalid transaction type");
        }
        // Atomic update
        member.balance = newBalance;
        member.updatedAt = new Date().toISOString();
        const txn = {
            id: this.nextTxnId++,
            transactionId: `TX-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`,
            memberId: member.memberId,
            type: input.type,
            amount,
            description: safeSanitize(input.description || `${input.type === "credit" ? "Points added" : "Points redeemed"}`),
            resultingBalance: newBalance,
            createdAt: new Date().toISOString()
        };
        this.transactions.push(txn);
        return txn;
    }
    getMemberTransactions(memberId) {
        return this.transactions.filter((t)=>t.memberId.toLowerCase() === memberId.toLowerCase());
    }
    getAllTransactions() {
        return [
            ...this.transactions
        ].sort((a, b)=>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    addSeedTransaction(memberId, type, amount, description, resultingBalance) {
        this.transactions.push({
            id: this.nextTxnId++,
            transactionId: `TXN-SEED-${this.nextTxnId.toString().padStart(2, "0")}`,
            memberId,
            type,
            amount,
            description,
            resultingBalance,
            createdAt: new Date().toISOString()
        });
    }
    reset() {
        this.members = [];
        this.transactions = [];
        this.nextMemberId = 1;
        this.nextTxnId = 1;
    }
    loadFromJson(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            if (data && Array.isArray(data.members)) {
                this.members = data.members;
            }
            if (data && Array.isArray(data.transactions)) {
                this.transactions = data.transactions;
            }
            return true;
        } catch  {
            // Safe fallback - do not crash
            return false;
        }
    }
}
}),
"[project]/src/lib/db-service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "createMemberInDb",
    ()=>createMemberInDb,
    "deleteMemberFromDb",
    ()=>deleteMemberFromDb,
    "getAllTransactionsFromDb",
    ()=>getAllTransactionsFromDb,
    "getDashboardStatsFromDb",
    ()=>getDashboardStatsFromDb,
    "getMemberByMemberIdFromDb",
    ()=>getMemberByMemberIdFromDb,
    "getMembersFromDb",
    ()=>getMembersFromDb,
    "getTransactionsForMemberFromDb",
    ()=>getTransactionsForMemberFromDb,
    "mapDbMemberToModel",
    ()=>mapDbMemberToModel,
    "mapDbTxnToModel",
    ()=>mapDbTxnToModel,
    "recordTransactionInDb",
    ()=>recordTransactionInDb,
    "resetMemoryStore",
    ()=>resetMemoryStore,
    "seedDemoDataIfEmpty",
    ()=>seedDemoDataIfEmpty,
    "updateMemberInDb",
    ()=>updateMemberInDb
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/index.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/schema.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/expressions/conditions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/expressions/select.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/sql.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
const globalForMemoryStore = globalThis;
let memoryStore = globalForMemoryStore.__frequentFlyerMemoryStore ?? new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FrequentFlyerStore"]();
if ("TURBOPACK compile-time truthy", 1) {
    globalForMemoryStore.__frequentFlyerMemoryStore = memoryStore;
}
function mapDbMemberToModel(row) {
    return {
        id: row.id,
        memberId: row.memberId,
        fullName: row.fullName,
        email: row.email,
        phone: row.phone,
        tier: row.tier,
        balance: Number(row.balance),
        status: row.status,
        joinDate: row.joinDate ? row.joinDate.toISOString() : new Date().toISOString(),
        createdAt: row.createdAt ? row.createdAt.toISOString() : undefined,
        updatedAt: row.updatedAt ? row.updatedAt.toISOString() : undefined
    };
}
function mapDbTxnToModel(row) {
    return {
        id: row.id,
        transactionId: row.transactionId,
        memberId: row.memberId,
        type: row.type,
        amount: Number(row.amount),
        description: row.description,
        resultingBalance: Number(row.resultingBalance),
        createdAt: row.createdAt ? row.createdAt.toISOString() : new Date().toISOString()
    };
}
async function getMembersFromDb(search, tier, status) {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"]) {
        return memoryStore.searchMembers(search || "", tier, status);
    }
    const allRows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["members"]).orderBy((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["desc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["members"].createdAt));
    let filtered = allRows.map(mapDbMemberToModel);
    if (search && search.trim()) {
        const q = search.trim().toLowerCase();
        filtered = filtered.filter((m)=>m.fullName.toLowerCase().includes(q) || m.memberId.toLowerCase().includes(q) || m.email.toLowerCase().includes(q));
    }
    if (tier && tier !== "All") {
        filtered = filtered.filter((m)=>m.tier === tier);
    }
    if (status && status !== "All") {
        filtered = filtered.filter((m)=>m.status === status);
    }
    return filtered;
}
async function getMemberByMemberIdFromDb(memberId) {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"]) {
        return memoryStore.getMemberByMemberId(memberId) || null;
    }
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["members"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["members"].memberId, memberId.trim().toUpperCase())).limit(1);
    if (rows.length === 0) return null;
    return mapDbMemberToModel(rows[0]);
}
async function createMemberInDb(input) {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"]) {
        return memoryStore.addMember(input);
    }
    const memberIdUpper = input.memberId.trim().toUpperCase();
    const existing = await getMemberByMemberIdFromDb(memberIdUpper);
    if (existing) {
        throw new Error(`Member ID ${memberIdUpper} already exists`);
    }
    const [created] = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["members"]).values({
        memberId: memberIdUpper,
        fullName: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["safeSanitize"])(input.fullName.trim()),
        email: input.email.trim().toLowerCase(),
        phone: input.phone ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["safeSanitize"])(input.phone.trim()) : null,
        tier: input.tier,
        balance: Math.max(0, Math.floor(Number(input.balance) || 0)),
        status: input.status,
        joinDate: input.joinDate ? new Date(input.joinDate) : new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
    }).returning();
    return mapDbMemberToModel(created);
}
async function updateMemberInDb(memberId, updates) {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"]) {
        return memoryStore.updateMember(memberId, updates);
    }
    const existing = await getMemberByMemberIdFromDb(memberId);
    if (!existing) {
        throw new Error(`Member ${memberId} not found`);
    }
    const updateValues = {
        updatedAt: new Date()
    };
    if (updates.fullName !== undefined) {
        updateValues.fullName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["safeSanitize"])(updates.fullName.trim());
    }
    if (updates.email !== undefined) {
        updateValues.email = updates.email.trim().toLowerCase();
    }
    if (updates.phone !== undefined) {
        updateValues.phone = updates.phone ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["safeSanitize"])(updates.phone.trim()) : null;
    }
    if (updates.tier !== undefined) {
        updateValues.tier = updates.tier;
    }
    if (updates.status !== undefined) {
        updateValues.status = updates.status;
    }
    if (updates.balance !== undefined) {
        updateValues.balance = Math.max(0, Math.floor(Number(updates.balance)));
    }
    const [updated] = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["members"]).set(updateValues).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["members"].memberId, memberId.toUpperCase())).returning();
    return mapDbMemberToModel(updated);
}
async function deleteMemberFromDb(memberId) {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"]) {
        return memoryStore.deleteMember(memberId);
    }
    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].delete(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["members"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["members"].memberId, memberId.toUpperCase())).returning({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["members"].id
    });
    return result.length > 0;
}
async function recordTransactionInDb(input) {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"]) {
        const transaction = memoryStore.processTransaction(input);
        const updatedMember = memoryStore.getMemberByMemberId(input.memberId);
        if (!updatedMember) {
            throw new Error(`Member ${input.memberId} not found`);
        }
        return {
            transaction,
            updatedMember
        };
    }
    const member = await getMemberByMemberIdFromDb(input.memberId);
    if (!member) {
        throw new Error(`Member ${input.memberId} not found`);
    }
    const amount = Math.floor(Number(input.amount));
    if (isNaN(amount) || amount <= 0) {
        throw new Error("Transaction amount must be a positive number");
    }
    let newBalance = member.balance;
    if (input.type === "credit") {
        newBalance += amount;
    } else if (input.type === "redemption") {
        if (member.balance < amount) {
            throw new Error(`Insufficient points balance. Member has ${member.balance.toLocaleString()} points, requested ${amount.toLocaleString()}`);
        }
        newBalance -= amount;
    } else {
        throw new Error("Invalid transaction type");
    }
    // Execute database transaction
    const [createdTxn] = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["transactions"]).values({
        transactionId: `TXN-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`,
        memberId: member.memberId,
        type: input.type,
        amount,
        description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["safeSanitize"])(input.description || (input.type === "credit" ? "Flight Miles Credit" : "Reward Redemption")),
        resultingBalance: newBalance,
        createdAt: new Date()
    }).returning();
    const [updatedMemberRow] = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["members"]).set({
        balance: newBalance,
        updatedAt: new Date()
    }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["members"].memberId, member.memberId)).returning();
    return {
        transaction: mapDbTxnToModel(createdTxn),
        updatedMember: mapDbMemberToModel(updatedMemberRow)
    };
}
async function getTransactionsForMemberFromDb(memberId) {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"]) {
        return memoryStore.getMemberTransactions(memberId);
    }
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["transactions"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["transactions"].memberId, memberId.toUpperCase())).orderBy((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["desc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["transactions"].createdAt));
    return rows.map(mapDbTxnToModel);
}
async function getAllTransactionsFromDb(limitCount = 25) {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"]) {
        return memoryStore.getAllTransactions().slice(0, limitCount);
    }
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["transactions"]).orderBy((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["desc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["transactions"].createdAt)).limit(limitCount);
    return rows.map(mapDbTxnToModel);
}
async function getDashboardStatsFromDb() {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"]) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["calculateDashboardStats"])(memoryStore.getAllMembers(), memoryStore.getAllTransactions());
    }
    const allMembers = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["members"]);
    const totalTxns = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select({
        count: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`count(*)`
    }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["transactions"]);
    const totalMembers = allMembers.length;
    const activeMembers = allMembers.filter((m)=>m.status === "Active").length;
    const inactiveMembers = allMembers.filter((m)=>m.status !== "Active").length;
    const totalMiles = allMembers.reduce((acc, m)=>acc + (Number(m.balance) || 0), 0);
    const recentTransactionsCount = Number(totalTxns[0]?.count ?? 0);
    return {
        totalMembers,
        activeMembers,
        inactiveMembers,
        totalMiles,
        recentTransactionsCount
    };
}
async function seedDemoDataIfEmpty() {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"]) {
        if (memoryStore.getAllMembers().length > 0) {
            return false;
        }
        const sampleMembersList = [
            [
                "FF-10021",
                "Sample Passenger: Alexander Wright",
                "alexander.wright@sample-air.internal",
                "+1 (555) 012-4411",
                "Platinum",
                142500,
                "Active",
                "2021-03-12"
            ],
            [
                "FF-10022",
                "Sample Passenger: Beatrice Morales",
                "beatrice.morales@sample-air.internal",
                "+1 (555) 014-9922",
                "Gold",
                68200,
                "Active",
                "2022-06-18"
            ],
            [
                "FF-10023",
                "Sample Passenger: Chen Wei",
                "chen.wei@sample-air.internal",
                "+1 (555) 017-3388",
                "Silver",
                24500,
                "Active",
                "2023-01-20"
            ],
            [
                "FF-10024",
                "Sample Passenger: Danielle Dupont",
                "danielle.dupont@sample-air.internal",
                "+1 (555) 018-7711",
                "Standard",
                5200,
                "Active",
                "2023-09-05"
            ],
            [
                "FF-10025",
                "Sample Passenger: Ethan O'Connor",
                "ethan.oconnor@sample-air.internal",
                "+1 (555) 019-2244",
                "Gold",
                89000,
                "Active",
                "2022-11-14"
            ],
            [
                "FF-10026",
                "Sample Passenger: Fatima Al-Mansoor",
                "fatima.almansoor@sample-air.internal",
                "+1 (555) 013-5599",
                "Platinum",
                215400,
                "Active",
                "2020-08-01"
            ],
            [
                "FF-10027",
                "Sample Passenger: George Kowalski",
                "george.kowalski@sample-air.internal",
                "+1 (555) 015-8833",
                "Standard",
                1200,
                "Inactive",
                "2024-02-10"
            ],
            [
                "FF-10028",
                "Sample Passenger: Hannah Lindqvist",
                "hannah.lindqvist@sample-air.internal",
                "+1 (555) 016-4477",
                "Silver",
                16800,
                "Suspended",
                "2023-05-19"
            ]
        ].map(([memberId, fullName, email, phone, tier, balance, status, joinDate])=>({
                memberId,
                fullName,
                email,
                phone,
                tier,
                balance,
                status,
                joinDate: new Date(joinDate).toISOString()
            }));
        sampleMembersList.forEach((member)=>memoryStore.addMember(member));
        [
            [
                "FF-10021",
                "credit",
                12500,
                "Flight Bonus: JFK to LHR First Class",
                142500
            ],
            [
                "FF-10022",
                "credit",
                4500,
                "Floor Desk Staff Adjustment: Promotional Miles",
                68200
            ],
            [
                "FF-10026",
                "redemption",
                25000,
                "Star Alliance Lounge Access Package",
                215400
            ],
            [
                "FF-10023",
                "credit",
                2000,
                "Partner Hotel Stay Credit",
                24500
            ]
        ].forEach(([memberId, type, amount, description, resultingBalance])=>{
            memoryStore.addSeedTransaction(memberId, type, amount, description, resultingBalance);
        });
        return true;
    }
    const countRes = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select({
        count: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`count(*)`
    }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["members"]);
    const memberCount = Number(countRes[0]?.count ?? 0);
    if (memberCount > 0) {
        return false; // Already populated
    }
    const sampleMembersList = [
        {
            memberId: "FF-10021",
            fullName: "Sample Passenger: Alexander Wright",
            email: "alexander.wright@sample-air.internal",
            phone: "+1 (555) 012-4411",
            tier: "Platinum",
            balance: 142500,
            status: "Active",
            joinDate: new Date("2021-03-12").toISOString()
        },
        {
            memberId: "FF-10022",
            fullName: "Sample Passenger: Beatrice Morales",
            email: "beatrice.morales@sample-air.internal",
            phone: "+1 (555) 014-9922",
            tier: "Gold",
            balance: 68200,
            status: "Active",
            joinDate: new Date("2022-06-18").toISOString()
        },
        {
            memberId: "FF-10023",
            fullName: "Sample Passenger: Chen Wei",
            email: "chen.wei@sample-air.internal",
            phone: "+1 (555) 017-3388",
            tier: "Silver",
            balance: 24500,
            status: "Active",
            joinDate: new Date("2023-01-20").toISOString()
        },
        {
            memberId: "FF-10024",
            fullName: "Sample Passenger: Danielle Dupont",
            email: "danielle.dupont@sample-air.internal",
            phone: "+1 (555) 018-7711",
            tier: "Standard",
            balance: 5200,
            status: "Active",
            joinDate: new Date("2023-09-05").toISOString()
        },
        {
            memberId: "FF-10025",
            fullName: "Sample Passenger: Ethan O'Connor",
            email: "ethan.oconnor@sample-air.internal",
            phone: "+1 (555) 019-2244",
            tier: "Gold",
            balance: 89000,
            status: "Active",
            joinDate: new Date("2022-11-14").toISOString()
        },
        {
            memberId: "FF-10026",
            fullName: "Sample Passenger: Fatima Al-Mansoor",
            email: "fatima.almansoor@sample-air.internal",
            phone: "+1 (555) 013-5599",
            tier: "Platinum",
            balance: 215400,
            status: "Active",
            joinDate: new Date("2020-08-01").toISOString()
        },
        {
            memberId: "FF-10027",
            fullName: "Sample Passenger: George Kowalski",
            email: "george.kowalski@sample-air.internal",
            phone: "+1 (555) 015-8833",
            tier: "Standard",
            balance: 1200,
            status: "Inactive",
            joinDate: new Date("2024-02-10").toISOString()
        },
        {
            memberId: "FF-10028",
            fullName: "Sample Passenger: Hannah Lindqvist",
            email: "hannah.lindqvist@sample-air.internal",
            phone: "+1 (555) 016-4477",
            tier: "Silver",
            balance: 16800,
            status: "Suspended",
            joinDate: new Date("2023-05-19").toISOString()
        }
    ];
    for (const item of sampleMembersList){
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["members"]).values({
            memberId: item.memberId,
            fullName: item.fullName,
            email: item.email,
            phone: item.phone,
            tier: item.tier,
            balance: item.balance,
            status: item.status,
            joinDate: new Date(item.joinDate || Date.now()),
            createdAt: new Date(),
            updatedAt: new Date()
        });
    }
    // Seed sample transactions
    const sampleTransactions = [
        {
            transactionId: "TXN-9021-01",
            memberId: "FF-10021",
            type: "credit",
            amount: 12500,
            description: "Flight Bonus: JFK to LHR First Class",
            resultingBalance: 142500
        },
        {
            transactionId: "TXN-9021-02",
            memberId: "FF-10022",
            type: "credit",
            amount: 4500,
            description: "Floor Desk Staff Adjustment: Promotional Miles",
            resultingBalance: 68200
        },
        {
            transactionId: "TXN-9021-03",
            memberId: "FF-10026",
            type: "redemption",
            amount: 25000,
            description: "Star Alliance Lounge Access Package",
            resultingBalance: 215400
        },
        {
            transactionId: "TXN-9021-04",
            memberId: "FF-10023",
            type: "credit",
            amount: 2000,
            description: "Partner Hotel Stay Credit",
            resultingBalance: 24500
        }
    ];
    for (const txn of sampleTransactions){
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["transactions"]).values({
            transactionId: txn.transactionId,
            memberId: txn.memberId,
            type: txn.type,
            amount: txn.amount,
            description: txn.description,
            resultingBalance: txn.resultingBalance,
            createdAt: new Date()
        });
    }
    return true;
}
function resetMemoryStore() {
    memoryStore = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FrequentFlyerStore"]();
    globalForMemoryStore.__frequentFlyerMemoryStore = memoryStore;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/lib/validation.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EMAIL_REGEX",
    ()=>EMAIL_REGEX,
    "validateMemberInput",
    ()=>validateMemberInput,
    "validateTransactionInput",
    ()=>validateTransactionInput
]);
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
function validateMemberInput(input) {
    const errors = {};
    if (!input.memberId || !input.memberId.trim()) {
        errors.memberId = "Member ID is required.";
    } else if (!/^[A-Za-z0-9-_]+$/.test(input.memberId.trim())) {
        errors.memberId = "Member ID must contain only alphanumeric characters and hyphens.";
    }
    if (!input.fullName || !input.fullName.trim()) {
        errors.fullName = "Full name is required.";
    } else if (input.fullName.trim().length < 2) {
        errors.fullName = "Full name must be at least 2 characters.";
    }
    if (!input.email || !input.email.trim()) {
        errors.email = "Email address is required.";
    } else if (!EMAIL_REGEX.test(input.email.trim())) {
        errors.email = "Please enter a valid email address.";
    }
    if (input.balance !== undefined && input.balance !== null) {
        const num = Number(input.balance);
        if (isNaN(num) || num < 0) {
            errors.balance = "Starting points balance must be a non-negative number.";
        }
    } else {
        errors.balance = "Points balance is required.";
    }
    const validTiers = [
        "Standard",
        "Silver",
        "Gold",
        "Platinum"
    ];
    if (input.tier && !validTiers.includes(input.tier)) {
        errors.tier = "Invalid membership tier.";
    }
    const validStatuses = [
        "Active",
        "Inactive",
        "Suspended"
    ];
    if (input.status && !validStatuses.includes(input.status)) {
        errors.status = "Invalid membership status.";
    }
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}
function validateTransactionInput(input) {
    const errors = {};
    if (!input.memberId || !input.memberId.trim()) {
        errors.memberId = "Member ID is required.";
    }
    if (!input.type || ![
        "credit",
        "redemption"
    ].includes(input.type)) {
        errors.type = "Transaction type must be 'credit' or 'redemption'.";
    }
    if (input.amount === undefined || input.amount === null) {
        errors.amount = "Transaction amount is required.";
    } else {
        const num = Number(input.amount);
        if (isNaN(num) || num <= 0) {
            errors.amount = "Transaction amount must be greater than 0.";
        }
    }
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}
}),
"[project]/src/app/api/members/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db-service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/validation.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const dynamic = "force-dynamic";
async function GET(request) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["seedDemoDataIfEmpty"])();
        const { searchParams } = new URL(request.url);
        const search = searchParams.get("search") || undefined;
        const tier = searchParams.get("tier") || undefined;
        const status = searchParams.get("status") || undefined;
        const memberList = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMembersFromDb"])(search, tier, status);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: memberList,
            count: memberList.length
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to fetch members";
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: message
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const body = await request.json();
        const validation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateMemberInput"])(body);
        if (!validation.isValid) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "Validation failed",
                errors: validation.errors
            }, {
                status: 400
            });
        }
        const created = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createMemberInDb"])(body);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: created,
            message: `Member ${created.memberId} registered successfully`
        }, {
            status: 201
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to create member";
        const status = message.toLowerCase().includes("already exists") ? 409 : 500;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: message
        }, {
            status
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0-5q49l._.js.map