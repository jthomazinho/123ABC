"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const usecases_1 = require("./usecases");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('🎯 URL Management System - Basic Examples\n');
            yield (0, usecases_1.runBasicExamples)();
        }
        catch (error) {
            console.error('❌ Error running basic examples:', error);
        }
    });
}
// Run the main function
main().catch(console.error);
