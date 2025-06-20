/**
 * Models for timezone data structures returned by PKI Express
 */
/**
 * Represents a daylight saving time transition
 */
export class DaylightTransition {
    /**
     * Creates a DaylightTransition instance from a JSON object
     * @param {Object} json - The JSON object
     * @returns {DaylightTransition} The created instance
     */
    static fromJson(json: Object): DaylightTransition;
    /**
     * @param {string} timeOfDay - The time of day for the transition (ISO format)
     * @param {number} month - The month of the transition (1-12)
     * @param {number} week - The week of the month (1-5)
     * @param {number} day - The day of the week (1-7)
     * @param {string} dayOfWeek - The day of the week name
     * @param {boolean} isFixedDateRule - Whether this is a fixed date rule
     */
    constructor(timeOfDay: string, month: number, week: number, day: number, dayOfWeek: string, isFixedDateRule: boolean);
    timeOfDay: string;
    month: number;
    week: number;
    day: number;
    dayOfWeek: string;
    isFixedDateRule: boolean;
}
/**
 * Represents an adjustment rule for daylight saving time
 */
export class AdjustmentRule {
    /**
     * Creates an AdjustmentRule instance from a JSON object
     * @param {Object} json - The JSON object
     * @returns {AdjustmentRule} The created instance
     */
    static fromJson(json: Object): AdjustmentRule;
    /**
     * @param {string} dateStart - The start date of the rule (ISO format)
     * @param {string} dateEnd - The end date of the rule (ISO format)
     * @param {string} daylightDelta - The daylight saving time offset
     * @param {DaylightTransition} daylightTransitionStart - The start transition
     * @param {DaylightTransition} daylightTransitionEnd - The end transition
     * @param {string} baseUtcOffsetDelta - The base UTC offset delta
     */
    constructor(dateStart: string, dateEnd: string, daylightDelta: string, daylightTransitionStart: DaylightTransition, daylightTransitionEnd: DaylightTransition, baseUtcOffsetDelta: string);
    dateStart: string;
    dateEnd: string;
    daylightDelta: string;
    daylightTransitionStart: DaylightTransition;
    daylightTransitionEnd: DaylightTransition;
    baseUtcOffsetDelta: string;
}
/**
 * Represents a timezone with all its properties
 */
export class TimezoneInfo {
    /**
     * Creates a TimezoneInfo instance from a JSON object
     * @param {Object} json - The JSON object
     * @returns {TimezoneInfo} The created instance
     */
    static fromJson(json: Object): TimezoneInfo;
    /**
     * @param {string} id - The timezone ID
     * @param {string} displayName - The display name of the timezone
     * @param {string} standardName - The standard time name
     * @param {string} daylightName - The daylight saving time name
     * @param {string} baseUtcOffset - The base UTC offset
     * @param {AdjustmentRule[]} adjustmentRules - Array of adjustment rules
     * @param {boolean} supportsDaylightSavingTime - Whether the timezone supports DST
     */
    constructor(id: string, displayName: string, standardName: string, daylightName: string, baseUtcOffset: string, adjustmentRules: AdjustmentRule[], supportsDaylightSavingTime: boolean);
    id: string;
    displayName: string;
    standardName: string;
    daylightName: string;
    baseUtcOffset: string;
    adjustmentRules: AdjustmentRule[];
    supportsDaylightSavingTime: boolean;
}
/**
 * Represents the complete timezone list response
 */
export class TimezoneListResult {
    /**
     * Creates a TimezoneListResult instance from a JSON object
     * @param {Object} json - The JSON object
     * @returns {TimezoneListResult} The created instance
     */
    static fromJson(json: Object): TimezoneListResult;
    /**
     * @param {TimezoneInfo[]} timeZones - Array of timezone information
     */
    constructor(timeZones: TimezoneInfo[]);
    timeZones: TimezoneInfo[];
}
