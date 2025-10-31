/**
 * Models for timezone data structures returned by PKI Express
 */

/**
 * Represents a daylight saving time transition
 */
class DaylightTransition {
	/**
	 * @param {string} timeOfDay - The time of day for the transition (ISO format)
	 * @param {number} month - The month of the transition (1-12)
	 * @param {number} week - The week of the month (1-5)
	 * @param {number} day - The day of the week (1-7)
	 * @param {string} dayOfWeek - The day of the week name
	 * @param {boolean} isFixedDateRule - Whether this is a fixed date rule
	 */
	constructor(timeOfDay, month, week, day, dayOfWeek, isFixedDateRule) {
		this.timeOfDay = timeOfDay;
		this.month = month;
		this.week = week;
		this.day = day;
		this.dayOfWeek = dayOfWeek;
		this.isFixedDateRule = isFixedDateRule;
	}

	/**
	 * Creates a DaylightTransition instance from a JSON object
	 * @param {Object} json - The JSON object
	 * @returns {DaylightTransition} The created instance
	 */
	static fromJson(json) {
		return new DaylightTransition(
			json.TimeOfDay,
			json.Month,
			json.Week,
			json.Day,
			json.DayOfWeek,
			json.IsFixedDateRule
		);
	}
}

/**
 * Represents an adjustment rule for daylight saving time
 */
class AdjustmentRule {
	/**
	 * @param {string} dateStart - The start date of the rule (ISO format)
	 * @param {string} dateEnd - The end date of the rule (ISO format)
	 * @param {string} daylightDelta - The daylight saving time offset
	 * @param {DaylightTransition} daylightTransitionStart - The start transition
	 * @param {DaylightTransition} daylightTransitionEnd - The end transition
	 * @param {string} baseUtcOffsetDelta - The base UTC offset delta
	 */
	constructor(dateStart, dateEnd, daylightDelta, daylightTransitionStart, daylightTransitionEnd, baseUtcOffsetDelta) {
		this.dateStart = dateStart;
		this.dateEnd = dateEnd;
		this.daylightDelta = daylightDelta;
		this.daylightTransitionStart = daylightTransitionStart;
		this.daylightTransitionEnd = daylightTransitionEnd;
		this.baseUtcOffsetDelta = baseUtcOffsetDelta;
	}

	/**
	 * Creates an AdjustmentRule instance from a JSON object
	 * @param {Object} json - The JSON object
	 * @returns {AdjustmentRule} The created instance
	 */
	static fromJson(json) {
		return new AdjustmentRule(
			json.DateStart,
			json.DateEnd,
			json.DaylightDelta,
			json.DaylightTransitionStart ? DaylightTransition.fromJson(json.DaylightTransitionStart) : null,
			json.DaylightTransitionEnd ? DaylightTransition.fromJson(json.DaylightTransitionEnd) : null,
			json.BaseUtcOffsetDelta
		);
	}
}

/**
 * Represents a timezone with all its properties
 */
class TimezoneInfo {
	/**
	 * @param {string} id - The timezone ID
	 * @param {string} displayName - The display name of the timezone
	 * @param {string} standardName - The standard time name
	 * @param {string} daylightName - The daylight saving time name
	 * @param {string} baseUtcOffset - The base UTC offset
	 * @param {AdjustmentRule[]} adjustmentRules - Array of adjustment rules
	 * @param {boolean} supportsDaylightSavingTime - Whether the timezone supports DST
	 */
	constructor(id, displayName, standardName, daylightName, baseUtcOffset, adjustmentRules, supportsDaylightSavingTime) {
		this.id = id;
		this.displayName = displayName;
		this.standardName = standardName;
		this.daylightName = daylightName;
		this.baseUtcOffset = baseUtcOffset;
		this.adjustmentRules = adjustmentRules || [];
		this.supportsDaylightSavingTime = supportsDaylightSavingTime;
	}

	/**
	 * Creates a TimezoneInfo instance from a JSON object
	 * @param {Object} json - The JSON object
	 * @returns {TimezoneInfo} The created instance
	 */
	static fromJson(json) {
		const adjustmentRules = json.AdjustmentRules 
			? json.AdjustmentRules.map(rule => AdjustmentRule.fromJson(rule))
			: null;

		return new TimezoneInfo(
			json.Id,
			json.DisplayName,
			json.StandardName,
			json.DaylightName,
			json.BaseUtcOffset,
			adjustmentRules,
			json.SupportsDaylightSavingTime
		);
	}
}

/**
 * Represents the complete timezone list response
 */
class TimezoneListResult {
	/**
	 * @param {TimezoneInfo[]} timeZones - Array of timezone information
	 */
	constructor(timeZones) {
		this.timeZones = timeZones || [];
	}

	/**
	 * Creates a TimezoneListResult instance from a JSON object
	 * @param {Object} json - The JSON object
	 * @returns {TimezoneListResult} The created instance
	 */
	static fromJson(json) {
		const timeZones = json.timeZones 
			? json.timeZones.map(tz => TimezoneInfo.fromJson(tz))
			: [];

		return new TimezoneListResult(timeZones);
	}
}

module.exports = {
	DaylightTransition,
	AdjustmentRule,
	TimezoneInfo,
	TimezoneListResult
}; 