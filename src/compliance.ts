import { targetGradleRioVersion } from "./constants";
import { createBuildGradle, createMainKt } from "./commands";
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

export function makeBuildGradleCompliant() {
    console.log("Forcing build.gradle compliance");
    createBuildGradle();
    preferences.setWPILibVersion(targetGradleRioVersion);
}

export function makeMainKtCompliant() {
    console.log("Forcing Main.kt compliance");
    createMainKt();
    preferences.setMainKt(true);
}