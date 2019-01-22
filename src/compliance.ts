import { targetGradleRioVersion } from "./constants";
import * as preferences from "./preferences";

export function isBuildGradleCompliant(): boolean {
    console.log("Checking build.gradle compliance");
    let registeredVersion = preferences.getWPILibVersion();
    if (registeredVersion === targetGradleRioVersion) {
        return true;
    }
    return false;
}

export function isMainKtCompliant(): boolean {
    console.log("Checking Main.kt compliance");
    if (preferences.getMainKt()) {
        return true;
    }
    return false;
}

export function makeBuildGradleCompliant() {}

export function makeMainKtCompliant() {}