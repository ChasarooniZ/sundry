function setupHandleVision() {
    
}
// https://github.com/foundryvtt/pf2e/blob/7afb550babd9c429ed21b46a2c6a9c0ffef10339/src/module/canvas/perception/modes.ts#L5
//   CONFIG.Canvas.detectionModes
// CONFIG.Canvas.detectionModes

class HearingDetectionMode extends fc.perception.DetectionMode {
    constructor() {
        super({
            id: "hearing",
            label: "PF2E.Actor.Creature.Sense.Type.Hearing",
            type: fc.perception.DetectionMode.DETECTION_TYPES.SOUND,
            angle: false,
        });
    }

    static override getDetectionFilter(): fc.rendering.filters.OutlineOverlayFilter {
        const filter = (this._detectionFilter ??= fc.rendering.filters.OutlineOverlayFilter.create({ wave: true }));
        filter.thickness = 1;
        return filter;
    }

    protected override _canDetect(visionSource: PointVisionSourcePF2e, target: object | null): boolean {
        // Not if the target isn't a token
        if (!(target instanceof TokenPF2e)) return false;

        // Not if the token is GM-hidden
        if (target.document.hidden) return false;

        // Not if the target doesn't emit sound
        if (!target.actor?.emitsSound) return false;

        if (!game.pf2e.settings.rbv) return true;

        // Not if the target is unnoticed or undetected
        if (target.actor?.hasCondition("undetected", "unnoticed")) {
            return false;
        }

        // Only if the subject can hear
        return !visionSource.object?.actor?.hasCondition("deafened");
    }

    /**
     * A vision source is passed due to lack of core support for non-vision-based detection.
     * Retrieve hearing source and test against that.
     */
    _testLOS(
        visionSource: PointVisionSourcePF2e,
        _mode: TokenDetectionMode,
        _target: fc.placeables.PlaceableObject,
        test: CanvasVisibilityTestPF2e,
    ): boolean {
        const edgeDirectionMode = CONST.EDGE_DIRECTION_MODES.REVERSED;
        const config = { type: "sound", edgeDirectionMode, useThreshold: true } as const;
        return !HearingDetectionMode._testCollision(visionSource, test, config);
    }
}

declare namespace HearingDetectionMode {
    // eslint-disable-next-line no-var
    var _detectionFilter: fc.rendering.filters.OutlineOverlayFilter | undefined;
}