(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "134ace7facc741bdd488";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "tests";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!*****************************************!*\
  !*** (webpack)/hot/log-apply-result.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function(updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function(moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");

	if (unacceptedModules.length > 0) {
		log(
			"warning",
			"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)"
		);
		unacceptedModules.forEach(function(moduleId) {
			log("warning", "[HMR]  - " + moduleId);
		});
	}

	if (!renewedModules || renewedModules.length === 0) {
		log("info", "[HMR] Nothing hot updated.");
	} else {
		log("info", "[HMR] Updated modules:");
		renewedModules.forEach(function(moduleId) {
			if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
				var parts = moduleId.split("!");
				log.groupCollapsed("info", "[HMR]  - " + parts.pop());
				log("info", "[HMR]  - " + moduleId);
				log.groupEnd("info");
			} else {
				log("info", "[HMR]  - " + moduleId);
			}
		});
		var numberIds = renewedModules.every(function(moduleId) {
			return typeof moduleId === "number";
		});
		if (numberIds)
			log(
				"info",
				"[HMR] Consider using the NamedModulesPlugin for module names."
			);
	}
};


/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!****************************!*\
  !*** (webpack)/hot/log.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

var logLevel = "info";

function dummy() {}

function shouldLog(level) {
	var shouldLog =
		(logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

function logGroup(logFn) {
	return function(level, msg) {
		if (shouldLog(level)) {
			logFn(msg);
		}
	};
}

module.exports = function(level, msg) {
	if (shouldLog(level)) {
		if (level === "info") {
			console.log(msg);
		} else if (level === "warning") {
			console.warn(msg);
		} else if (level === "error") {
			console.error(msg);
		}
	}
};

/* eslint-disable node/no-unsupported-features/node-builtins */
var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
/* eslint-enable node/no-unsupported-features/node-builtins */

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

module.exports.setLogLevel = function(level) {
	logLevel = level;
};

module.exports.formatError = function(err) {
	var message = err.message;
	var stack = err.stack;
	if (!stack) {
		return message;
	} else if (stack.indexOf(message) < 0) {
		return message + "\n" + stack;
	} else {
		return stack;
	}
};


/***/ }),

/***/ "./node_modules/webpack/hot/poll.js?100":
/*!*********************************!*\
  !*** (webpack)/hot/poll.js?100 ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/*globals __resourceQuery */
if (true) {
	var hotPollInterval = +__resourceQuery.substr(1) || 10 * 60 * 1000;
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");

	var checkForUpdate = function checkForUpdate(fromUpdate) {
		if (module.hot.status() === "idle") {
			module.hot
				.check(true)
				.then(function(updatedModules) {
					if (!updatedModules) {
						if (fromUpdate) log("info", "[HMR] Update applied.");
						return;
					}
					__webpack_require__(/*! ./log-apply-result */ "./node_modules/webpack/hot/log-apply-result.js")(updatedModules, updatedModules);
					checkForUpdate(true);
				})
				.catch(function(err) {
					var status = module.hot.status();
					if (["abort", "fail"].indexOf(status) >= 0) {
						log("warning", "[HMR] Cannot apply update.");
						log("warning", "[HMR] " + log.formatError(err));
						log("warning", "[HMR] You need to restart the application!");
					} else {
						log("warning", "[HMR] Update failed: " + log.formatError(err));
					}
				});
		}
	};
	setInterval(checkForUpdate, hotPollInterval);
} else {}

/* WEBPACK VAR INJECTION */}.call(this, "?100"))

/***/ }),

/***/ "./pegjs/athena.pegjs":
/*!****************************!*\
  !*** ./pegjs/athena.pegjs ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/pegjs-loader/lib/index.js):\nError: Cannot find module 'pegjs'\nRequire stack:\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/pegjs-loader/lib/index.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/loadLoader.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/LoaderRunner.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModule.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/Compiler.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/webpack.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack-cli/lib/webpack-cli.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack-cli/lib/bootstrap.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack-cli/bin/cli.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/bin/webpack.js\n    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:931:15)\n    at Function.Module._load (internal/modules/cjs/loader.js:774:27)\n    at Module.require (internal/modules/cjs/loader.js:1003:19)\n    at require (internal/modules/cjs/helpers.js:107:18)\n    at Object.<anonymous> (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/pegjs-loader/lib/index.js:10:14)\n    at Module._compile (internal/modules/cjs/loader.js:1114:14)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1143:10)\n    at Module.load (internal/modules/cjs/loader.js:979:32)\n    at Function.Module._load (internal/modules/cjs/loader.js:819:12)\n    at Module.require (internal/modules/cjs/loader.js:1003:19)\n    at require (internal/modules/cjs/helpers.js:107:18)\n    at loadLoader (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/loadLoader.js:18:17)\n    at iteratePitchingLoaders (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/LoaderRunner.js:169:2)\n    at runLoaders (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/LoaderRunner.js:365:2)\n    at NormalModule.doBuild (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModule.js:295:3)\n    at NormalModule.build (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModule.js:446:15)\n    at Compilation.buildModule (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/Compilation.js:739:10)\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/Compilation.js:981:14\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:409:6\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:155:13\n    at AsyncSeriesWaterfallHook.eval [as callAsync] (eval at create (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:138:29\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:346:9\n    at processTicksAndRejections (internal/process/task_queues.js:77:11)");

/***/ }),

/***/ "./pegjs/bigquery.pegjs":
/*!******************************!*\
  !*** ./pegjs/bigquery.pegjs ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/pegjs-loader/lib/index.js):\nError: Cannot find module 'pegjs'\nRequire stack:\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/pegjs-loader/lib/index.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/loadLoader.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/LoaderRunner.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModule.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/Compiler.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/webpack.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack-cli/lib/webpack-cli.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack-cli/lib/bootstrap.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack-cli/bin/cli.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/bin/webpack.js\n    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:931:15)\n    at Function.Module._load (internal/modules/cjs/loader.js:774:27)\n    at Module.require (internal/modules/cjs/loader.js:1003:19)\n    at require (internal/modules/cjs/helpers.js:107:18)\n    at Object.<anonymous> (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/pegjs-loader/lib/index.js:10:14)\n    at Module._compile (internal/modules/cjs/loader.js:1114:14)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1143:10)\n    at Module.load (internal/modules/cjs/loader.js:979:32)\n    at Function.Module._load (internal/modules/cjs/loader.js:819:12)\n    at Module.require (internal/modules/cjs/loader.js:1003:19)\n    at require (internal/modules/cjs/helpers.js:107:18)\n    at loadLoader (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/loadLoader.js:18:17)\n    at iteratePitchingLoaders (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/LoaderRunner.js:169:2)\n    at runLoaders (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/LoaderRunner.js:365:2)\n    at NormalModule.doBuild (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModule.js:295:3)\n    at NormalModule.build (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModule.js:446:15)\n    at Compilation.buildModule (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/Compilation.js:739:10)\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/Compilation.js:981:14\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:409:6\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:155:13\n    at AsyncSeriesWaterfallHook.eval [as callAsync] (eval at create (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:138:29\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:346:9\n    at processTicksAndRejections (internal/process/task_queues.js:77:11)");

/***/ }),

/***/ "./pegjs/db2.pegjs":
/*!*************************!*\
  !*** ./pegjs/db2.pegjs ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/pegjs-loader/lib/index.js):\nError: Cannot find module 'pegjs'\nRequire stack:\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/pegjs-loader/lib/index.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/loadLoader.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/LoaderRunner.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModule.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/Compiler.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/webpack.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack-cli/lib/webpack-cli.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack-cli/lib/bootstrap.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack-cli/bin/cli.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/bin/webpack.js\n    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:931:15)\n    at Function.Module._load (internal/modules/cjs/loader.js:774:27)\n    at Module.require (internal/modules/cjs/loader.js:1003:19)\n    at require (internal/modules/cjs/helpers.js:107:18)\n    at Object.<anonymous> (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/pegjs-loader/lib/index.js:10:14)\n    at Module._compile (internal/modules/cjs/loader.js:1114:14)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1143:10)\n    at Module.load (internal/modules/cjs/loader.js:979:32)\n    at Function.Module._load (internal/modules/cjs/loader.js:819:12)\n    at Module.require (internal/modules/cjs/loader.js:1003:19)\n    at require (internal/modules/cjs/helpers.js:107:18)\n    at loadLoader (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/loadLoader.js:18:17)\n    at iteratePitchingLoaders (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/LoaderRunner.js:169:2)\n    at runLoaders (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/LoaderRunner.js:365:2)\n    at NormalModule.doBuild (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModule.js:295:3)\n    at NormalModule.build (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModule.js:446:15)\n    at Compilation.buildModule (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/Compilation.js:739:10)\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/Compilation.js:981:14\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:409:6\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:155:13\n    at AsyncSeriesWaterfallHook.eval [as callAsync] (eval at create (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:138:29\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:346:9\n    at processTicksAndRejections (internal/process/task_queues.js:77:11)");

/***/ }),

/***/ "./pegjs/flinksql.pegjs":
/*!******************************!*\
  !*** ./pegjs/flinksql.pegjs ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/pegjs-loader/lib/index.js):\nError: Cannot find module 'pegjs'\nRequire stack:\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/pegjs-loader/lib/index.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/loadLoader.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/LoaderRunner.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModule.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/Compiler.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/webpack.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack-cli/lib/webpack-cli.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack-cli/lib/bootstrap.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack-cli/bin/cli.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/bin/webpack.js\n    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:931:15)\n    at Function.Module._load (internal/modules/cjs/loader.js:774:27)\n    at Module.require (internal/modules/cjs/loader.js:1003:19)\n    at require (internal/modules/cjs/helpers.js:107:18)\n    at Object.<anonymous> (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/pegjs-loader/lib/index.js:10:14)\n    at Module._compile (internal/modules/cjs/loader.js:1114:14)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1143:10)\n    at Module.load (internal/modules/cjs/loader.js:979:32)\n    at Function.Module._load (internal/modules/cjs/loader.js:819:12)\n    at Module.require (internal/modules/cjs/loader.js:1003:19)\n    at require (internal/modules/cjs/helpers.js:107:18)\n    at loadLoader (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/loadLoader.js:18:17)\n    at iteratePitchingLoaders (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/LoaderRunner.js:169:2)\n    at runLoaders (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/LoaderRunner.js:365:2)\n    at NormalModule.doBuild (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModule.js:295:3)\n    at NormalModule.build (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModule.js:446:15)\n    at Compilation.buildModule (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/Compilation.js:739:10)\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/Compilation.js:981:14\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:409:6\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:155:13\n    at AsyncSeriesWaterfallHook.eval [as callAsync] (eval at create (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:138:29\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:346:9\n    at processTicksAndRejections (internal/process/task_queues.js:77:11)");

/***/ }),

/***/ "./pegjs/hive.pegjs":
/*!**************************!*\
  !*** ./pegjs/hive.pegjs ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/pegjs-loader/lib/index.js):\nError: Cannot find module 'pegjs'\nRequire stack:\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/pegjs-loader/lib/index.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/loadLoader.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/LoaderRunner.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModule.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/Compiler.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/webpack.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack-cli/lib/webpack-cli.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack-cli/lib/bootstrap.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack-cli/bin/cli.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/bin/webpack.js\n    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:931:15)\n    at Function.Module._load (internal/modules/cjs/loader.js:774:27)\n    at Module.require (internal/modules/cjs/loader.js:1003:19)\n    at require (internal/modules/cjs/helpers.js:107:18)\n    at Object.<anonymous> (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/pegjs-loader/lib/index.js:10:14)\n    at Module._compile (internal/modules/cjs/loader.js:1114:14)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1143:10)\n    at Module.load (internal/modules/cjs/loader.js:979:32)\n    at Function.Module._load (internal/modules/cjs/loader.js:819:12)\n    at Module.require (internal/modules/cjs/loader.js:1003:19)\n    at require (internal/modules/cjs/helpers.js:107:18)\n    at loadLoader (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/loadLoader.js:18:17)\n    at iteratePitchingLoaders (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/LoaderRunner.js:169:2)\n    at runLoaders (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/LoaderRunner.js:365:2)\n    at NormalModule.doBuild (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModule.js:295:3)\n    at NormalModule.build (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModule.js:446:15)\n    at Compilation.buildModule (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/Compilation.js:739:10)\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/Compilation.js:981:14\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:409:6\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:155:13\n    at AsyncSeriesWaterfallHook.eval [as callAsync] (eval at create (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:138:29\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:346:9\n    at processTicksAndRejections (internal/process/task_queues.js:77:11)");

/***/ }),

/***/ "./pegjs/mariadb.pegjs":
/*!*****************************!*\
  !*** ./pegjs/mariadb.pegjs ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/pegjs-loader/lib/index.js):\nError: Cannot find module 'pegjs'\nRequire stack:\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/pegjs-loader/lib/index.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/loadLoader.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/LoaderRunner.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModule.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/Compiler.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/webpack.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack-cli/lib/webpack-cli.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack-cli/lib/bootstrap.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack-cli/bin/cli.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/bin/webpack.js\n    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:931:15)\n    at Function.Module._load (internal/modules/cjs/loader.js:774:27)\n    at Module.require (internal/modules/cjs/loader.js:1003:19)\n    at require (internal/modules/cjs/helpers.js:107:18)\n    at Object.<anonymous> (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/pegjs-loader/lib/index.js:10:14)\n    at Module._compile (internal/modules/cjs/loader.js:1114:14)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1143:10)\n    at Module.load (internal/modules/cjs/loader.js:979:32)\n    at Function.Module._load (internal/modules/cjs/loader.js:819:12)\n    at Module.require (internal/modules/cjs/loader.js:1003:19)\n    at require (internal/modules/cjs/helpers.js:107:18)\n    at loadLoader (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/loadLoader.js:18:17)\n    at iteratePitchingLoaders (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/LoaderRunner.js:169:2)\n    at runLoaders (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/LoaderRunner.js:365:2)\n    at NormalModule.doBuild (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModule.js:295:3)\n    at NormalModule.build (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModule.js:446:15)\n    at Compilation.buildModule (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/Compilation.js:739:10)\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/Compilation.js:981:14\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:409:6\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:155:13\n    at AsyncSeriesWaterfallHook.eval [as callAsync] (eval at create (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:138:29\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:346:9\n    at processTicksAndRejections (internal/process/task_queues.js:77:11)");

/***/ }),

/***/ "./pegjs/mysql.pegjs":
/*!***************************!*\
  !*** ./pegjs/mysql.pegjs ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/pegjs-loader/lib/index.js):\nError: Cannot find module 'pegjs'\nRequire stack:\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/pegjs-loader/lib/index.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/loadLoader.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/LoaderRunner.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModule.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/Compiler.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/webpack.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack-cli/lib/webpack-cli.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack-cli/lib/bootstrap.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack-cli/bin/cli.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/bin/webpack.js\n    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:931:15)\n    at Function.Module._load (internal/modules/cjs/loader.js:774:27)\n    at Module.require (internal/modules/cjs/loader.js:1003:19)\n    at require (internal/modules/cjs/helpers.js:107:18)\n    at Object.<anonymous> (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/pegjs-loader/lib/index.js:10:14)\n    at Module._compile (internal/modules/cjs/loader.js:1114:14)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1143:10)\n    at Module.load (internal/modules/cjs/loader.js:979:32)\n    at Function.Module._load (internal/modules/cjs/loader.js:819:12)\n    at Module.require (internal/modules/cjs/loader.js:1003:19)\n    at require (internal/modules/cjs/helpers.js:107:18)\n    at loadLoader (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/loadLoader.js:18:17)\n    at iteratePitchingLoaders (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/LoaderRunner.js:169:2)\n    at runLoaders (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/LoaderRunner.js:365:2)\n    at NormalModule.doBuild (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModule.js:295:3)\n    at NormalModule.build (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModule.js:446:15)\n    at Compilation.buildModule (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/Compilation.js:739:10)\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/Compilation.js:981:14\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:409:6\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:155:13\n    at AsyncSeriesWaterfallHook.eval [as callAsync] (eval at create (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:138:29\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:346:9\n    at processTicksAndRejections (internal/process/task_queues.js:77:11)");

/***/ }),

/***/ "./pegjs/noql.pegjs":
/*!**************************!*\
  !*** ./pegjs/noql.pegjs ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/pegjs-loader/lib/index.js):\nError: Cannot find module 'pegjs'\nRequire stack:\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/pegjs-loader/lib/index.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/loadLoader.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/LoaderRunner.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModule.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/Compiler.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/webpack.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack-cli/lib/webpack-cli.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack-cli/lib/bootstrap.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack-cli/bin/cli.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/bin/webpack.js\n    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:931:15)\n    at Function.Module._load (internal/modules/cjs/loader.js:774:27)\n    at Module.require (internal/modules/cjs/loader.js:1003:19)\n    at require (internal/modules/cjs/helpers.js:107:18)\n    at Object.<anonymous> (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/pegjs-loader/lib/index.js:10:14)\n    at Module._compile (internal/modules/cjs/loader.js:1114:14)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1143:10)\n    at Module.load (internal/modules/cjs/loader.js:979:32)\n    at Function.Module._load (internal/modules/cjs/loader.js:819:12)\n    at Module.require (internal/modules/cjs/loader.js:1003:19)\n    at require (internal/modules/cjs/helpers.js:107:18)\n    at loadLoader (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/loadLoader.js:18:17)\n    at iteratePitchingLoaders (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/LoaderRunner.js:169:2)\n    at runLoaders (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/LoaderRunner.js:365:2)\n    at NormalModule.doBuild (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModule.js:295:3)\n    at NormalModule.build (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModule.js:446:15)\n    at Compilation.buildModule (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/Compilation.js:739:10)\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/Compilation.js:981:14\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:409:6\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:155:13\n    at AsyncSeriesWaterfallHook.eval [as callAsync] (eval at create (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:138:29\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:346:9\n    at processTicksAndRejections (internal/process/task_queues.js:77:11)");

/***/ }),

/***/ "./pegjs/postgresql.pegjs":
/*!********************************!*\
  !*** ./pegjs/postgresql.pegjs ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/pegjs-loader/lib/index.js):\nError: Cannot find module 'pegjs'\nRequire stack:\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/pegjs-loader/lib/index.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/loadLoader.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/LoaderRunner.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModule.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/Compiler.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/webpack.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack-cli/lib/webpack-cli.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack-cli/lib/bootstrap.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack-cli/bin/cli.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/bin/webpack.js\n    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:931:15)\n    at Function.Module._load (internal/modules/cjs/loader.js:774:27)\n    at Module.require (internal/modules/cjs/loader.js:1003:19)\n    at require (internal/modules/cjs/helpers.js:107:18)\n    at Object.<anonymous> (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/pegjs-loader/lib/index.js:10:14)\n    at Module._compile (internal/modules/cjs/loader.js:1114:14)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1143:10)\n    at Module.load (internal/modules/cjs/loader.js:979:32)\n    at Function.Module._load (internal/modules/cjs/loader.js:819:12)\n    at Module.require (internal/modules/cjs/loader.js:1003:19)\n    at require (internal/modules/cjs/helpers.js:107:18)\n    at loadLoader (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/loadLoader.js:18:17)\n    at iteratePitchingLoaders (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/LoaderRunner.js:169:2)\n    at runLoaders (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/LoaderRunner.js:365:2)\n    at NormalModule.doBuild (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModule.js:295:3)\n    at NormalModule.build (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModule.js:446:15)\n    at Compilation.buildModule (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/Compilation.js:739:10)\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/Compilation.js:981:14\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:409:6\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:155:13\n    at AsyncSeriesWaterfallHook.eval [as callAsync] (eval at create (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:138:29\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:346:9\n    at processTicksAndRejections (internal/process/task_queues.js:77:11)");

/***/ }),

/***/ "./pegjs/redshift.pegjs":
/*!******************************!*\
  !*** ./pegjs/redshift.pegjs ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/pegjs-loader/lib/index.js):\nError: Cannot find module 'pegjs'\nRequire stack:\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/pegjs-loader/lib/index.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/loadLoader.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/LoaderRunner.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModule.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/Compiler.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/webpack.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack-cli/lib/webpack-cli.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack-cli/lib/bootstrap.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack-cli/bin/cli.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/bin/webpack.js\n    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:931:15)\n    at Function.Module._load (internal/modules/cjs/loader.js:774:27)\n    at Module.require (internal/modules/cjs/loader.js:1003:19)\n    at require (internal/modules/cjs/helpers.js:107:18)\n    at Object.<anonymous> (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/pegjs-loader/lib/index.js:10:14)\n    at Module._compile (internal/modules/cjs/loader.js:1114:14)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1143:10)\n    at Module.load (internal/modules/cjs/loader.js:979:32)\n    at Function.Module._load (internal/modules/cjs/loader.js:819:12)\n    at Module.require (internal/modules/cjs/loader.js:1003:19)\n    at require (internal/modules/cjs/helpers.js:107:18)\n    at loadLoader (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/loadLoader.js:18:17)\n    at iteratePitchingLoaders (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/LoaderRunner.js:169:2)\n    at runLoaders (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/LoaderRunner.js:365:2)\n    at NormalModule.doBuild (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModule.js:295:3)\n    at NormalModule.build (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModule.js:446:15)\n    at Compilation.buildModule (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/Compilation.js:739:10)\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/Compilation.js:981:14\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:409:6\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:155:13\n    at AsyncSeriesWaterfallHook.eval [as callAsync] (eval at create (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:138:29\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:346:9\n    at processTicksAndRejections (internal/process/task_queues.js:77:11)");

/***/ }),

/***/ "./pegjs/snowflake.pegjs":
/*!*******************************!*\
  !*** ./pegjs/snowflake.pegjs ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/pegjs-loader/lib/index.js):\nError: Cannot find module 'pegjs'\nRequire stack:\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/pegjs-loader/lib/index.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/loadLoader.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/LoaderRunner.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModule.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/Compiler.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/webpack.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack-cli/lib/webpack-cli.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack-cli/lib/bootstrap.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack-cli/bin/cli.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/bin/webpack.js\n    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:931:15)\n    at Function.Module._load (internal/modules/cjs/loader.js:774:27)\n    at Module.require (internal/modules/cjs/loader.js:1003:19)\n    at require (internal/modules/cjs/helpers.js:107:18)\n    at Object.<anonymous> (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/pegjs-loader/lib/index.js:10:14)\n    at Module._compile (internal/modules/cjs/loader.js:1114:14)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1143:10)\n    at Module.load (internal/modules/cjs/loader.js:979:32)\n    at Function.Module._load (internal/modules/cjs/loader.js:819:12)\n    at Module.require (internal/modules/cjs/loader.js:1003:19)\n    at require (internal/modules/cjs/helpers.js:107:18)\n    at loadLoader (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/loadLoader.js:18:17)\n    at iteratePitchingLoaders (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/LoaderRunner.js:169:2)\n    at runLoaders (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/LoaderRunner.js:365:2)\n    at NormalModule.doBuild (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModule.js:295:3)\n    at NormalModule.build (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModule.js:446:15)\n    at Compilation.buildModule (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/Compilation.js:739:10)\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/Compilation.js:981:14\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:409:6\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:155:13\n    at AsyncSeriesWaterfallHook.eval [as callAsync] (eval at create (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:138:29\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:346:9\n    at processTicksAndRejections (internal/process/task_queues.js:77:11)");

/***/ }),

/***/ "./pegjs/sqlite.pegjs":
/*!****************************!*\
  !*** ./pegjs/sqlite.pegjs ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/pegjs-loader/lib/index.js):\nError: Cannot find module 'pegjs'\nRequire stack:\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/pegjs-loader/lib/index.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/loadLoader.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/LoaderRunner.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModule.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/Compiler.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/webpack.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack-cli/lib/webpack-cli.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack-cli/lib/bootstrap.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack-cli/bin/cli.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/bin/webpack.js\n    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:931:15)\n    at Function.Module._load (internal/modules/cjs/loader.js:774:27)\n    at Module.require (internal/modules/cjs/loader.js:1003:19)\n    at require (internal/modules/cjs/helpers.js:107:18)\n    at Object.<anonymous> (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/pegjs-loader/lib/index.js:10:14)\n    at Module._compile (internal/modules/cjs/loader.js:1114:14)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1143:10)\n    at Module.load (internal/modules/cjs/loader.js:979:32)\n    at Function.Module._load (internal/modules/cjs/loader.js:819:12)\n    at Module.require (internal/modules/cjs/loader.js:1003:19)\n    at require (internal/modules/cjs/helpers.js:107:18)\n    at loadLoader (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/loadLoader.js:18:17)\n    at iteratePitchingLoaders (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/LoaderRunner.js:169:2)\n    at runLoaders (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/LoaderRunner.js:365:2)\n    at NormalModule.doBuild (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModule.js:295:3)\n    at NormalModule.build (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModule.js:446:15)\n    at Compilation.buildModule (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/Compilation.js:739:10)\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/Compilation.js:981:14\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:409:6\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:155:13\n    at AsyncSeriesWaterfallHook.eval [as callAsync] (eval at create (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:138:29\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:346:9\n    at processTicksAndRejections (internal/process/task_queues.js:77:11)");

/***/ }),

/***/ "./pegjs/transactsql.pegjs":
/*!*********************************!*\
  !*** ./pegjs/transactsql.pegjs ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/pegjs-loader/lib/index.js):\nError: Cannot find module 'pegjs'\nRequire stack:\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/pegjs-loader/lib/index.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/loadLoader.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/LoaderRunner.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModule.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/Compiler.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/webpack.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack-cli/lib/webpack-cli.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack-cli/lib/bootstrap.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack-cli/bin/cli.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/bin/webpack.js\n    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:931:15)\n    at Function.Module._load (internal/modules/cjs/loader.js:774:27)\n    at Module.require (internal/modules/cjs/loader.js:1003:19)\n    at require (internal/modules/cjs/helpers.js:107:18)\n    at Object.<anonymous> (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/pegjs-loader/lib/index.js:10:14)\n    at Module._compile (internal/modules/cjs/loader.js:1114:14)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1143:10)\n    at Module.load (internal/modules/cjs/loader.js:979:32)\n    at Function.Module._load (internal/modules/cjs/loader.js:819:12)\n    at Module.require (internal/modules/cjs/loader.js:1003:19)\n    at require (internal/modules/cjs/helpers.js:107:18)\n    at loadLoader (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/loadLoader.js:18:17)\n    at iteratePitchingLoaders (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/LoaderRunner.js:169:2)\n    at runLoaders (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/LoaderRunner.js:365:2)\n    at NormalModule.doBuild (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModule.js:295:3)\n    at NormalModule.build (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModule.js:446:15)\n    at Compilation.buildModule (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/Compilation.js:739:10)\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/Compilation.js:981:14\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:409:6\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:155:13\n    at AsyncSeriesWaterfallHook.eval [as callAsync] (eval at create (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:138:29\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:346:9\n    at processTicksAndRejections (internal/process/task_queues.js:77:11)");

/***/ }),

/***/ "./pegjs/trino.pegjs":
/*!***************************!*\
  !*** ./pegjs/trino.pegjs ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/pegjs-loader/lib/index.js):\nError: Cannot find module 'pegjs'\nRequire stack:\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/pegjs-loader/lib/index.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/loadLoader.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/LoaderRunner.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModule.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/Compiler.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/webpack.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack-cli/lib/webpack-cli.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack-cli/lib/bootstrap.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack-cli/bin/cli.js\n- /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/bin/webpack.js\n    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:931:15)\n    at Function.Module._load (internal/modules/cjs/loader.js:774:27)\n    at Module.require (internal/modules/cjs/loader.js:1003:19)\n    at require (internal/modules/cjs/helpers.js:107:18)\n    at Object.<anonymous> (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/pegjs-loader/lib/index.js:10:14)\n    at Module._compile (internal/modules/cjs/loader.js:1114:14)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1143:10)\n    at Module.load (internal/modules/cjs/loader.js:979:32)\n    at Function.Module._load (internal/modules/cjs/loader.js:819:12)\n    at Module.require (internal/modules/cjs/loader.js:1003:19)\n    at require (internal/modules/cjs/helpers.js:107:18)\n    at loadLoader (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/loadLoader.js:18:17)\n    at iteratePitchingLoaders (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/LoaderRunner.js:169:2)\n    at runLoaders (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/loader-runner/lib/LoaderRunner.js:365:2)\n    at NormalModule.doBuild (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModule.js:295:3)\n    at NormalModule.build (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModule.js:446:15)\n    at Compilation.buildModule (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/Compilation.js:739:10)\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/Compilation.js:981:14\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:409:6\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:155:13\n    at AsyncSeriesWaterfallHook.eval [as callAsync] (eval at create (/Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:6:1)\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:138:29\n    at /Users/gurudev.jagdale/Projects/node-sql-parser/node_modules/webpack/lib/NormalModuleFactory.js:346:9\n    at processTicksAndRejections (internal/process/task_queues.js:77:11)");

/***/ }),

/***/ "./src/aggregation.js":
/*!****************************!*\
  !*** ./src/aggregation.js ***!
  \****************************/
/*! exports provided: aggrToSQL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "aggrToSQL", function() { return aggrToSQL; });
/* harmony import */ var _expr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./expr */ "./src/expr.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/util.js");
/* harmony import */ var _over__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./over */ "./src/over.js");



function aggrToSQL(expr) {
  /** @type {Object} */
  var args = expr.args,
    filter = expr.filter,
    over = expr.over,
    within_group_orderby = expr.within_group_orderby;
  var str = Object(_expr__WEBPACK_IMPORTED_MODULE_0__["exprToSQL"])(args.expr);
  var fnName = expr.name;
  var overStr = Object(_over__WEBPACK_IMPORTED_MODULE_2__["overToSQL"])(over);
  var separator = ' ';
  if (args.distinct) str = ['DISTINCT', str].join(separator);
  if (args.orderby) str = "".concat(str, " ").concat(Object(_expr__WEBPACK_IMPORTED_MODULE_0__["orderOrPartitionByToSQL"])(args.orderby, 'order by'));
  if (args.separator) str = [str, Object(_util__WEBPACK_IMPORTED_MODULE_1__["toUpper"])(args.separator.keyword), Object(_util__WEBPACK_IMPORTED_MODULE_1__["literalToSQL"])(args.separator.value)].filter(_util__WEBPACK_IMPORTED_MODULE_1__["hasVal"]).join(' ');
  var withinGroup = within_group_orderby ? "WITHIN GROUP (".concat(Object(_expr__WEBPACK_IMPORTED_MODULE_0__["orderOrPartitionByToSQL"])(within_group_orderby, 'order by'), ")") : '';
  var filterStr = filter ? "FILTER (WHERE ".concat(Object(_expr__WEBPACK_IMPORTED_MODULE_0__["exprToSQL"])(filter.where), ")") : '';
  return ["".concat(fnName, "(").concat(str, ")"), withinGroup, overStr, filterStr].filter(_util__WEBPACK_IMPORTED_MODULE_1__["hasVal"]).join(' ');
}


/***/ }),

/***/ "./src/alter.js":
/*!**********************!*\
  !*** ./src/alter.js ***!
  \**********************/
/*! exports provided: alterArgsToSQL, alterToSQL, alterExprToSQL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "alterArgsToSQL", function() { return alterArgsToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "alterToSQL", function() { return alterToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "alterExprToSQL", function() { return alterExprToSQL; });
/* harmony import */ var _column__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./column */ "./src/column.js");
/* harmony import */ var _create__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create */ "./src/create.js");
/* harmony import */ var _index_definition__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index-definition */ "./src/index-definition.js");
/* harmony import */ var _tables__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tables */ "./src/tables.js");
/* harmony import */ var _expr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./expr */ "./src/expr.js");
/* harmony import */ var _select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./select */ "./src/select.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./util */ "./src/util.js");







function alterExprToSQL(expr) {
  if (!expr) return '';
  var action = expr.action,
    createDefinition = expr.create_definitions,
    firstAfter = expr.first_after,
    ifNotExists = expr.if_not_exists,
    keyword = expr.keyword,
    oldColumn = expr.old_column,
    prefix = expr.prefix,
    resource = expr.resource,
    symbol = expr.symbol;
  var name = '';
  var dataType = [];
  switch (resource) {
    case 'column':
      dataType = [Object(_column__WEBPACK_IMPORTED_MODULE_0__["columnDefinitionToSQL"])(expr)];
      break;
    case 'index':
      dataType = Object(_index_definition__WEBPACK_IMPORTED_MODULE_2__["indexTypeAndOptionToSQL"])(expr);
      name = expr[resource];
      break;
    case 'table':
    case 'schema':
      name = Object(_util__WEBPACK_IMPORTED_MODULE_6__["identifierToSql"])(expr[resource]);
      break;
    case 'aggregate':
    case 'function':
    case 'domain':
    case 'type':
      name = Object(_util__WEBPACK_IMPORTED_MODULE_6__["identifierToSql"])(expr[resource]);
      break;
    case 'algorithm':
    case 'lock':
    case 'table-option':
      name = [symbol, Object(_util__WEBPACK_IMPORTED_MODULE_6__["toUpper"])(expr[resource])].filter(_util__WEBPACK_IMPORTED_MODULE_6__["hasVal"]).join(' ');
      break;
    case 'constraint':
      name = Object(_util__WEBPACK_IMPORTED_MODULE_6__["identifierToSql"])(expr[resource]);
      dataType = [Object(_create__WEBPACK_IMPORTED_MODULE_1__["createDefinitionToSQL"])(createDefinition)];
      break;
    case 'key':
      name = Object(_util__WEBPACK_IMPORTED_MODULE_6__["identifierToSql"])(expr[resource]);
      break;
    default:
      name = [symbol, expr[resource]].filter(function (val) {
        return val !== null;
      }).join(' ');
      break;
  }
  var alterArray = [Object(_util__WEBPACK_IMPORTED_MODULE_6__["toUpper"])(action), Object(_util__WEBPACK_IMPORTED_MODULE_6__["toUpper"])(keyword), Object(_util__WEBPACK_IMPORTED_MODULE_6__["toUpper"])(ifNotExists), oldColumn && Object(_column__WEBPACK_IMPORTED_MODULE_0__["columnRefToSQL"])(oldColumn), Object(_util__WEBPACK_IMPORTED_MODULE_6__["toUpper"])(prefix), name && name.trim(), dataType.filter(_util__WEBPACK_IMPORTED_MODULE_6__["hasVal"]).join(' '), firstAfter && "".concat(Object(_util__WEBPACK_IMPORTED_MODULE_6__["toUpper"])(firstAfter.keyword), " ").concat(Object(_column__WEBPACK_IMPORTED_MODULE_0__["columnRefToSQL"])(firstAfter.column))];
  return alterArray.filter(_util__WEBPACK_IMPORTED_MODULE_6__["hasVal"]).join(' ');
}
function alterTableToSQL(stmt) {
  var type = stmt.type,
    table = stmt.table,
    _stmt$expr = stmt.expr,
    expr = _stmt$expr === void 0 ? [] : _stmt$expr;
  var action = Object(_util__WEBPACK_IMPORTED_MODULE_6__["toUpper"])(type);
  var tableName = Object(_tables__WEBPACK_IMPORTED_MODULE_3__["tablesToSQL"])(table);
  var exprList = expr.map(_expr__WEBPACK_IMPORTED_MODULE_4__["exprToSQL"]);
  var result = [action, 'TABLE', tableName, exprList.join(', ')];
  return result.filter(_util__WEBPACK_IMPORTED_MODULE_6__["hasVal"]).join(' ');
}
function alterViewToSQL(stmt) {
  var type = stmt.type,
    columns = stmt.columns,
    attributes = stmt.attributes,
    select = stmt.select,
    view = stmt.view,
    withExpr = stmt["with"];
  var action = Object(_util__WEBPACK_IMPORTED_MODULE_6__["toUpper"])(type);
  var viewName = Object(_tables__WEBPACK_IMPORTED_MODULE_3__["tableToSQL"])(view);
  var result = [action, 'VIEW', viewName];
  if (columns) result.push("(".concat(columns.map(_column__WEBPACK_IMPORTED_MODULE_0__["columnRefToSQL"]).join(', '), ")"));
  if (attributes) result.push("WITH ".concat(attributes.map(_util__WEBPACK_IMPORTED_MODULE_6__["toUpper"]).join(', ')));
  result.push('AS', Object(_select__WEBPACK_IMPORTED_MODULE_5__["selectToSQL"])(select));
  if (withExpr) result.push(Object(_util__WEBPACK_IMPORTED_MODULE_6__["toUpper"])(withExpr));
  return result.filter(_util__WEBPACK_IMPORTED_MODULE_6__["hasVal"]).join(' ');
}
function alterArgsToSQL(arg) {
  var defaultSQL = arg["default"] && [Object(_util__WEBPACK_IMPORTED_MODULE_6__["toUpper"])(arg["default"].keyword), Object(_expr__WEBPACK_IMPORTED_MODULE_4__["exprToSQL"])(arg["default"].value)].join(' ');
  return [Object(_util__WEBPACK_IMPORTED_MODULE_6__["toUpper"])(arg.mode), arg.name, Object(_util__WEBPACK_IMPORTED_MODULE_6__["dataTypeToSQL"])(arg.type), defaultSQL].filter(_util__WEBPACK_IMPORTED_MODULE_6__["hasVal"]).join(' ');
}
function alterSchemaToSQL(stmt) {
  var expr = stmt.expr,
    keyword = stmt.keyword,
    schema = stmt.schema,
    type = stmt.type;
  var result = [Object(_util__WEBPACK_IMPORTED_MODULE_6__["toUpper"])(type), Object(_util__WEBPACK_IMPORTED_MODULE_6__["toUpper"])(keyword), Object(_util__WEBPACK_IMPORTED_MODULE_6__["identifierToSql"])(schema), alterExprToSQL(expr)];
  return result.filter(_util__WEBPACK_IMPORTED_MODULE_6__["hasVal"]).join(' ');
}
function alterDomainTypeToSQL(stmt) {
  var expr = stmt.expr,
    keyword = stmt.keyword,
    name = stmt.name,
    type = stmt.type;
  var result = [Object(_util__WEBPACK_IMPORTED_MODULE_6__["toUpper"])(type), Object(_util__WEBPACK_IMPORTED_MODULE_6__["toUpper"])(keyword), [Object(_util__WEBPACK_IMPORTED_MODULE_6__["identifierToSql"])(name.schema), Object(_util__WEBPACK_IMPORTED_MODULE_6__["identifierToSql"])(name.name)].filter(_util__WEBPACK_IMPORTED_MODULE_6__["hasVal"]).join('.'), alterExprToSQL(expr)];
  return result.filter(_util__WEBPACK_IMPORTED_MODULE_6__["hasVal"]).join(' ');
}
function alterFunctionToSQL(stmt) {
  var args = stmt.args,
    expr = stmt.expr,
    keyword = stmt.keyword,
    name = stmt.name,
    type = stmt.type;
  var result = [Object(_util__WEBPACK_IMPORTED_MODULE_6__["toUpper"])(type), Object(_util__WEBPACK_IMPORTED_MODULE_6__["toUpper"])(keyword), [[Object(_util__WEBPACK_IMPORTED_MODULE_6__["identifierToSql"])(name.schema), Object(_util__WEBPACK_IMPORTED_MODULE_6__["identifierToSql"])(name.name)].filter(_util__WEBPACK_IMPORTED_MODULE_6__["hasVal"]).join('.'), args && "(".concat(args.expr ? args.expr.map(alterArgsToSQL).join(', ') : '', ")")].filter(_util__WEBPACK_IMPORTED_MODULE_6__["hasVal"]).join(''), alterExprToSQL(expr)];
  return result.filter(_util__WEBPACK_IMPORTED_MODULE_6__["hasVal"]).join(' ');
}
function alterAggregateToSQL(stmt) {
  var args = stmt.args,
    expr = stmt.expr,
    keyword = stmt.keyword,
    name = stmt.name,
    type = stmt.type;
  var argsExpr = args.expr,
    orderby = args.orderby;
  var result = [Object(_util__WEBPACK_IMPORTED_MODULE_6__["toUpper"])(type), Object(_util__WEBPACK_IMPORTED_MODULE_6__["toUpper"])(keyword), [[Object(_util__WEBPACK_IMPORTED_MODULE_6__["identifierToSql"])(name.schema), Object(_util__WEBPACK_IMPORTED_MODULE_6__["identifierToSql"])(name.name)].filter(_util__WEBPACK_IMPORTED_MODULE_6__["hasVal"]).join('.'), "(".concat(argsExpr.map(alterArgsToSQL).join(', ')).concat(orderby ? [' ORDER', 'BY', orderby.map(alterArgsToSQL).join(', ')].join(' ') : '', ")")].filter(_util__WEBPACK_IMPORTED_MODULE_6__["hasVal"]).join(''), alterExprToSQL(expr)];
  return result.filter(_util__WEBPACK_IMPORTED_MODULE_6__["hasVal"]).join(' ');
}
function alterToSQL(stmt) {
  var _stmt$keyword = stmt.keyword,
    keyword = _stmt$keyword === void 0 ? 'table' : _stmt$keyword;
  switch (keyword) {
    case 'aggregate':
      return alterAggregateToSQL(stmt);
    case 'table':
      return alterTableToSQL(stmt);
    case 'schema':
      return alterSchemaToSQL(stmt);
    case 'domain':
    case 'type':
      return alterDomainTypeToSQL(stmt);
    case 'function':
      return alterFunctionToSQL(stmt);
    case 'view':
      return alterViewToSQL(stmt);
  }
}


/***/ }),

/***/ "./src/analyze.js":
/*!************************!*\
  !*** ./src/analyze.js ***!
  \************************/
/*! exports provided: attachToSQL, analyzeToSQL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "attachToSQL", function() { return attachToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "analyzeToSQL", function() { return analyzeToSQL; });
/* harmony import */ var _expr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./expr */ "./src/expr.js");
/* harmony import */ var _tables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tables */ "./src/tables.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ "./src/util.js");



function analyzeToSQL(stmt) {
  var type = stmt.type,
    table = stmt.table;
  var action = Object(_util__WEBPACK_IMPORTED_MODULE_2__["toUpper"])(type);
  var tableName = Object(_tables__WEBPACK_IMPORTED_MODULE_1__["tableToSQL"])(table);
  return [action, tableName].join(' ');
}
function attachToSQL(stmt) {
  var type = stmt.type,
    database = stmt.database,
    expr = stmt.expr,
    as = stmt.as,
    schema = stmt.schema;
  return [Object(_util__WEBPACK_IMPORTED_MODULE_2__["toUpper"])(type), Object(_util__WEBPACK_IMPORTED_MODULE_2__["toUpper"])(database), Object(_expr__WEBPACK_IMPORTED_MODULE_0__["exprToSQL"])(expr), Object(_util__WEBPACK_IMPORTED_MODULE_2__["toUpper"])(as), Object(_util__WEBPACK_IMPORTED_MODULE_2__["identifierToSql"])(schema)].filter(_util__WEBPACK_IMPORTED_MODULE_2__["hasVal"]).join(' ');
}


/***/ }),

/***/ "./src/array-struct.js":
/*!*****************************!*\
  !*** ./src/array-struct.js ***!
  \*****************************/
/*! exports provided: arrayStructExprToSQL, arrayStructValueToSQL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arrayStructExprToSQL", function() { return arrayStructExprToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arrayStructValueToSQL", function() { return arrayStructValueToSQL; });
/* harmony import */ var _column__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./column */ "./src/column.js");
/* harmony import */ var _expr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./expr */ "./src/expr.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ "./src/util.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }



function arrayExprListToSQL(expr) {
  var arrayPath = expr.array_path,
    brackets = expr.brackets,
    exprList = expr.expr_list,
    parentheses = expr.parentheses;
  if (!exprList) return "[".concat(Object(_column__WEBPACK_IMPORTED_MODULE_0__["columnsToSQL"])(arrayPath), "]");
  var result = Array.isArray(exprList) ? exprList.map(function (col) {
    return "(".concat(Object(_column__WEBPACK_IMPORTED_MODULE_0__["columnsToSQL"])(col), ")");
  }).filter(_util__WEBPACK_IMPORTED_MODULE_2__["hasVal"]).join(', ') : Object(_expr__WEBPACK_IMPORTED_MODULE_1__["exprToSQL"])(exprList);
  if (brackets) return "[".concat(result, "]");
  return parentheses ? "(".concat(result, ")") : result;
}
function arrayStructValueToSQL(expr) {
  var exprList = expr.expr_list,
    type = expr.type;
  switch (Object(_util__WEBPACK_IMPORTED_MODULE_2__["toUpper"])(type)) {
    case 'STRUCT':
      return "(".concat(Object(_column__WEBPACK_IMPORTED_MODULE_0__["columnsToSQL"])(exprList), ")");
    case 'ARRAY':
      return arrayExprListToSQL(expr);
    default:
      return '';
  }
}
function arrayStructExprToSQL(expr) {
  var definition = expr.definition,
    keyword = expr.keyword;
  var result = [Object(_util__WEBPACK_IMPORTED_MODULE_2__["toUpper"])(keyword)];
  if (definition && _typeof(definition) === 'object') {
    result.length = 0;
    result.push(Object(_util__WEBPACK_IMPORTED_MODULE_2__["arrayStructTypeToSQL"])(definition));
  }
  result.push(arrayStructValueToSQL(expr));
  return result.filter(_util__WEBPACK_IMPORTED_MODULE_2__["hasVal"]).join('');
}


/***/ }),

/***/ "./src/assign.js":
/*!***********************!*\
  !*** ./src/assign.js ***!
  \***********************/
/*! exports provided: assignToSQL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assignToSQL", function() { return assignToSQL; });
/* harmony import */ var _expr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./expr */ "./src/expr.js");

function assignToSQL(expr) {
  /** @type {Object} */
  var left = expr.left,
    right = expr.right,
    symbol = expr.symbol,
    keyword = expr.keyword;
  left.keyword = keyword;
  var leftVar = Object(_expr__WEBPACK_IMPORTED_MODULE_0__["exprToSQL"])(left);
  var rightVal = Object(_expr__WEBPACK_IMPORTED_MODULE_0__["exprToSQL"])(right);
  return "".concat(leftVar, " ").concat(symbol, " ").concat(rightVal);
}


/***/ }),

/***/ "./src/binary.js":
/*!***********************!*\
  !*** ./src/binary.js ***!
  \***********************/
/*! exports provided: binaryToSQL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "binaryToSQL", function() { return binaryToSQL; });
/* harmony import */ var _expr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./expr */ "./src/expr.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/util.js");


function binaryToSQL(expr) {
  var operator = expr.operator || expr.op;
  var rstr = Object(_expr__WEBPACK_IMPORTED_MODULE_0__["exprToSQL"])(expr.right);
  var isBetween = false;
  if (Array.isArray(rstr)) {
    switch (operator) {
      case '=':
        operator = 'IN';
        break;
      case '!=':
        operator = 'NOT IN';
        break;
      case 'BETWEEN':
      case 'NOT BETWEEN':
        isBetween = true;
        rstr = "".concat(rstr[0], " AND ").concat(rstr[1]);
        break;
      default:
        break;
    }
    if (!isBetween) rstr = "(".concat(rstr.join(', '), ")");
  }
  var escape = expr.right.escape || {};
  var str = [Object(_expr__WEBPACK_IMPORTED_MODULE_0__["exprToSQL"])(expr.left), operator, rstr, Object(_util__WEBPACK_IMPORTED_MODULE_1__["toUpper"])(escape.type), Object(_expr__WEBPACK_IMPORTED_MODULE_0__["exprToSQL"])(escape.value)].filter(_util__WEBPACK_IMPORTED_MODULE_1__["hasVal"]).join(' ');
  return expr.parentheses ? "(".concat(str, ")") : str;
}


/***/ }),

/***/ "./src/case.js":
/*!*********************!*\
  !*** ./src/case.js ***!
  \*********************/
/*! exports provided: caseToSQL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "caseToSQL", function() { return caseToSQL; });
/* harmony import */ var _expr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./expr */ "./src/expr.js");

function caseToSQL(expr) {
  var res = ['CASE'];
  var conditions = expr.args,
    exprItem = expr.expr,
    parentheses = expr.parentheses;
  if (exprItem) res.push(Object(_expr__WEBPACK_IMPORTED_MODULE_0__["exprToSQL"])(exprItem));
  for (var i = 0, len = conditions.length; i < len; ++i) {
    res.push(conditions[i].type.toUpperCase());
    if (conditions[i].cond) {
      res.push(Object(_expr__WEBPACK_IMPORTED_MODULE_0__["exprToSQL"])(conditions[i].cond));
      res.push('THEN');
    }
    res.push(Object(_expr__WEBPACK_IMPORTED_MODULE_0__["exprToSQL"])(conditions[i].result));
  }
  res.push('END');
  return parentheses ? "(".concat(res.join(' '), ")") : res.join(' ');
}


/***/ }),

/***/ "./src/column.js":
/*!***********************!*\
  !*** ./src/column.js ***!
  \***********************/
/*! exports provided: columnDefinitionToSQL, columnRefToSQL, columnToSQL, columnsToSQL, columnDataType, columnOrderToSQL, columnReferenceDefinitionToSQL, fullTextSearchToSQL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "columnDefinitionToSQL", function() { return columnDefinitionToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "columnRefToSQL", function() { return columnRefToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "columnToSQL", function() { return columnToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "columnsToSQL", function() { return columnsToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "columnDataType", function() { return columnDataType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "columnOrderToSQL", function() { return columnOrderToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "columnReferenceDefinitionToSQL", function() { return columnReferenceDefinitionToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fullTextSearchToSQL", function() { return fullTextSearchToSQL; });
/* harmony import */ var _constrain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constrain */ "./src/constrain.js");
/* harmony import */ var _expr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./expr */ "./src/expr.js");
/* harmony import */ var _func__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./func */ "./src/func.js");
/* harmony import */ var _tables__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tables */ "./src/tables.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util */ "./src/util.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }





function columnOffsetToSQL(column, isDual) {
  if (typeof column === 'string') return Object(_util__WEBPACK_IMPORTED_MODULE_4__["identifierToSql"])(column, isDual);
  var expr = column.expr,
    offset = column.offset,
    suffix = column.suffix;
  var offsetExpr = offset && offset.map(function (offsetItem) {
    return ['[', offsetItem.name, "".concat(offsetItem.name ? '(' : ''), Object(_util__WEBPACK_IMPORTED_MODULE_4__["literalToSQL"])(offsetItem.value), "".concat(offsetItem.name ? ')' : ''), ']'].filter(_util__WEBPACK_IMPORTED_MODULE_4__["hasVal"]).join('');
  }).join('');
  var result = [Object(_expr__WEBPACK_IMPORTED_MODULE_1__["exprToSQL"])(expr), offsetExpr, suffix].filter(_util__WEBPACK_IMPORTED_MODULE_4__["hasVal"]).join('');
  return result;
}
function arrayIndexToSQL(arrayIndexList) {
  if (!arrayIndexList || arrayIndexList.length === 0) return '';
  var result = [];
  var _iterator = _createForOfIteratorHelper(arrayIndexList),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var arrayIndex = _step.value;
      var arrayIndexStr = arrayIndex.brackets ? "[".concat(Object(_util__WEBPACK_IMPORTED_MODULE_4__["literalToSQL"])(arrayIndex.index), "]") : "".concat(arrayIndex.notation).concat(Object(_util__WEBPACK_IMPORTED_MODULE_4__["literalToSQL"])(arrayIndex.index));
      if (arrayIndex.property) arrayIndexStr = "".concat(arrayIndexStr, ".").concat(Object(_util__WEBPACK_IMPORTED_MODULE_4__["literalToSQL"])(arrayIndex.property));
      result.push(arrayIndexStr);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return result.join('');
}
function columnRefToSQL(expr) {
  var array_index = expr.array_index,
    _expr$arrows = expr.arrows,
    arrows = _expr$arrows === void 0 ? [] : _expr$arrows,
    as = expr.as,
    collate = expr.collate,
    column = expr.column,
    db = expr.db,
    isDual = expr.isDual,
    _expr$notations = expr.notations,
    notations = _expr$notations === void 0 ? [] : _expr$notations,
    schema = expr.schema,
    table = expr.table,
    parentheses = expr.parentheses,
    properties = expr.properties,
    suffix = expr.suffix,
    order_by = expr.order_by,
    _expr$subFields = expr.subFields,
    subFields = _expr$subFields === void 0 ? [] : _expr$subFields;
  var str = column === '*' ? '*' : columnOffsetToSQL(column, isDual);
  var prefix = [db, schema, table].filter(_util__WEBPACK_IMPORTED_MODULE_4__["hasVal"]).map(function (val) {
    return "".concat(typeof val === 'string' ? Object(_util__WEBPACK_IMPORTED_MODULE_4__["identifierToSql"])(val) : Object(_expr__WEBPACK_IMPORTED_MODULE_1__["exprToSQL"])(val));
  });
  var prefixStr = prefix[0];
  if (prefixStr) {
    var i = 1;
    for (; i < prefix.length; ++i) {
      prefixStr = "".concat(prefixStr).concat(notations[i] || '.').concat(prefix[i]);
    }
    str = "".concat(prefixStr).concat(notations[i] || '.').concat(str);
  }
  str = ["".concat(str).concat(arrayIndexToSQL(array_index))].concat(_toConsumableArray(subFields)).join('.');
  var result = [str, Object(_util__WEBPACK_IMPORTED_MODULE_4__["commonOptionConnector"])('AS', _expr__WEBPACK_IMPORTED_MODULE_1__["exprToSQL"], as), arrows.map(function (arrow, index) {
    return Object(_util__WEBPACK_IMPORTED_MODULE_4__["commonOptionConnector"])(arrow, _util__WEBPACK_IMPORTED_MODULE_4__["literalToSQL"], properties[index]);
  }).join(' ')];
  if (collate) result.push(Object(_util__WEBPACK_IMPORTED_MODULE_4__["commonTypeValue"])(collate).join(' '));
  result.push(Object(_util__WEBPACK_IMPORTED_MODULE_4__["toUpper"])(suffix));
  result.push(Object(_util__WEBPACK_IMPORTED_MODULE_4__["toUpper"])(order_by));
  var sql = result.filter(_util__WEBPACK_IMPORTED_MODULE_4__["hasVal"]).join(' ');
  return parentheses ? "(".concat(sql, ")") : sql;
}
function columnDataType(definition) {
  var _ref = definition || {},
    dataType = _ref.dataType,
    length = _ref.length,
    suffix = _ref.suffix,
    scale = _ref.scale,
    expr = _ref.expr;
  var result = dataType;
  if (length != null) result += "(".concat([length, scale].filter(function (val) {
    return val != null;
  }).join(', '), ")");
  if (suffix && suffix.length) result += " ".concat(suffix.join(' '));
  if (expr) result += Object(_expr__WEBPACK_IMPORTED_MODULE_1__["exprToSQL"])(expr);
  return result;
}
function columnReferenceDefinitionToSQL(referenceDefinition) {
  var reference = [];
  if (!referenceDefinition) return reference;
  var definition = referenceDefinition.definition,
    keyword = referenceDefinition.keyword,
    match = referenceDefinition.match,
    table = referenceDefinition.table,
    onAction = referenceDefinition.on_action;
  reference.push(Object(_util__WEBPACK_IMPORTED_MODULE_4__["toUpper"])(keyword));
  reference.push(Object(_tables__WEBPACK_IMPORTED_MODULE_3__["tablesToSQL"])(table));
  reference.push(definition && "(".concat(definition.map(function (col) {
    return Object(_expr__WEBPACK_IMPORTED_MODULE_1__["exprToSQL"])(col);
  }).join(', '), ")"));
  reference.push(Object(_util__WEBPACK_IMPORTED_MODULE_4__["toUpper"])(match));
  onAction.map(function (onRef) {
    return reference.push(Object(_util__WEBPACK_IMPORTED_MODULE_4__["toUpper"])(onRef.type), Object(_expr__WEBPACK_IMPORTED_MODULE_1__["exprToSQL"])(onRef.value));
  });
  return reference.filter(_util__WEBPACK_IMPORTED_MODULE_4__["hasVal"]);
}
function columnOption(definition) {
  var columnOpt = [];
  var nullable = definition.nullable,
    characterSet = definition.character_set,
    check = definition.check,
    comment = definition.comment,
    collate = definition.collate,
    storage = definition.storage,
    defaultOpt = definition.default_val,
    autoIncrement = definition.auto_increment,
    uniqueKey = definition.unique,
    primaryKey = definition.primary_key,
    columnFormat = definition.column_format,
    referenceDefinition = definition.reference_definition;
  columnOpt.push(Object(_util__WEBPACK_IMPORTED_MODULE_4__["toUpper"])(nullable && nullable.value));
  if (defaultOpt) {
    var type = defaultOpt.type,
      value = defaultOpt.value;
    columnOpt.push(type.toUpperCase(), Object(_expr__WEBPACK_IMPORTED_MODULE_1__["exprToSQL"])(value));
  }
  var _getParserOpt = Object(_util__WEBPACK_IMPORTED_MODULE_4__["getParserOpt"])(),
    database = _getParserOpt.database;
  columnOpt.push(Object(_constrain__WEBPACK_IMPORTED_MODULE_0__["constraintDefinitionToSQL"])(check));
  columnOpt.push(Object(_util__WEBPACK_IMPORTED_MODULE_4__["autoIncrementToSQL"])(autoIncrement), Object(_util__WEBPACK_IMPORTED_MODULE_4__["toUpper"])(primaryKey), Object(_util__WEBPACK_IMPORTED_MODULE_4__["toUpper"])(uniqueKey), Object(_util__WEBPACK_IMPORTED_MODULE_4__["commentToSQL"])(comment));
  columnOpt.push.apply(columnOpt, _toConsumableArray(Object(_util__WEBPACK_IMPORTED_MODULE_4__["commonTypeValue"])(characterSet)));
  if (database !== 'sqlite') columnOpt.push.apply(columnOpt, _toConsumableArray(Object(_util__WEBPACK_IMPORTED_MODULE_4__["commonTypeValue"])(collate)));
  columnOpt.push.apply(columnOpt, _toConsumableArray(Object(_util__WEBPACK_IMPORTED_MODULE_4__["commonTypeValue"])(columnFormat)));
  columnOpt.push.apply(columnOpt, _toConsumableArray(Object(_util__WEBPACK_IMPORTED_MODULE_4__["commonTypeValue"])(storage)));
  columnOpt.push.apply(columnOpt, _toConsumableArray(columnReferenceDefinitionToSQL(referenceDefinition)));
  return columnOpt.filter(_util__WEBPACK_IMPORTED_MODULE_4__["hasVal"]).join(' ');
}
function columnOrderToSQL(columnOrder) {
  var column = columnOrder.column,
    collate = columnOrder.collate,
    nulls = columnOrder.nulls,
    opclass = columnOrder.opclass,
    order_by = columnOrder.order_by;
  var columnExpr = typeof column === 'string' ? {
    type: 'column_ref',
    table: columnOrder.table,
    column: column
  } : columnOrder;
  columnExpr.collate = null;
  var result = [Object(_expr__WEBPACK_IMPORTED_MODULE_1__["exprToSQL"])(columnExpr), Object(_util__WEBPACK_IMPORTED_MODULE_4__["commonOptionConnector"])(collate && collate.type, _util__WEBPACK_IMPORTED_MODULE_4__["identifierToSql"], collate && collate.value), opclass, Object(_util__WEBPACK_IMPORTED_MODULE_4__["toUpper"])(order_by), Object(_util__WEBPACK_IMPORTED_MODULE_4__["toUpper"])(nulls)];
  return result.filter(_util__WEBPACK_IMPORTED_MODULE_4__["hasVal"]).join(' ');
}
function generatedExpressionToSQL(generated) {
  if (!generated) return;
  var result = [Object(_util__WEBPACK_IMPORTED_MODULE_4__["toUpper"])(generated.value), "(".concat(Object(_expr__WEBPACK_IMPORTED_MODULE_1__["exprToSQL"])(generated.expr), ")"), Object(_util__WEBPACK_IMPORTED_MODULE_4__["toUpper"])(generated.storage_type)];
  return result.filter(_util__WEBPACK_IMPORTED_MODULE_4__["hasVal"]).join(' ');
}
function columnDefinitionToSQL(columnDefinition) {
  var column = [];
  var name = columnRefToSQL(columnDefinition.column);
  var dataType = columnDataType(columnDefinition.definition);
  column.push(name);
  column.push(dataType);
  var columnOpt = columnOption(columnDefinition);
  column.push(columnOpt);
  var generated = generatedExpressionToSQL(columnDefinition.generated);
  column.push(generated);
  return column.filter(_util__WEBPACK_IMPORTED_MODULE_4__["hasVal"]).join(' ');
}
function asToSQL(asStr) {
  if (!asStr) return '';
  if (_typeof(asStr) === 'object') return ['AS', Object(_expr__WEBPACK_IMPORTED_MODULE_1__["exprToSQL"])(asStr)].join(' ');
  return ['AS', /^(`?)[a-z_][0-9a-z_]*(`?)$/i.test(asStr) ? Object(_util__WEBPACK_IMPORTED_MODULE_4__["identifierToSql"])(asStr) : Object(_util__WEBPACK_IMPORTED_MODULE_4__["columnIdentifierToSql"])(asStr)].join(' ');
}
function fullTextSearchToSQL(expr) {
  var against = expr.against,
    as = expr.as,
    columns = expr.columns,
    match = expr.match,
    mode = expr.mode;
  var matchExpr = [Object(_util__WEBPACK_IMPORTED_MODULE_4__["toUpper"])(match), "(".concat(columns.map(function (col) {
    return columnRefToSQL(col);
  }).join(', '), ")")].join(' ');
  var againstExpr = [Object(_util__WEBPACK_IMPORTED_MODULE_4__["toUpper"])(against), ['(', Object(_expr__WEBPACK_IMPORTED_MODULE_1__["exprToSQL"])(expr.expr), mode && " ".concat(Object(_util__WEBPACK_IMPORTED_MODULE_4__["literalToSQL"])(mode)), ')'].filter(_util__WEBPACK_IMPORTED_MODULE_4__["hasVal"]).join('')].join(' ');
  return [matchExpr, againstExpr, asToSQL(as)].filter(_util__WEBPACK_IMPORTED_MODULE_4__["hasVal"]).join(' ');
}
function columnToSQL(column, isDual) {
  var expr = column.expr,
    type = column.type;
  if (type === 'cast') return Object(_func__WEBPACK_IMPORTED_MODULE_2__["castToSQL"])(column);
  if (isDual) expr.isDual = isDual;
  var str = Object(_expr__WEBPACK_IMPORTED_MODULE_1__["exprToSQL"])(expr);
  var exprList = column.expr_list;
  if (exprList) {
    var result = [str];
    var columnsStr = exprList.map(function (col) {
      return columnToSQL(col, isDual);
    }).join(', ');
    result.push([Object(_util__WEBPACK_IMPORTED_MODULE_4__["toUpper"])(type), type && '(', columnsStr, type && ')'].filter(_util__WEBPACK_IMPORTED_MODULE_4__["hasVal"]).join(''));
    return result.filter(_util__WEBPACK_IMPORTED_MODULE_4__["hasVal"]).join(' ');
  }
  if (expr.parentheses && Reflect.has(expr, 'array_index')) str = "(".concat(str, ")");
  if (expr.array_index && expr.type !== 'column_ref') {
    str = "".concat(str).concat(arrayIndexToSQL(expr.array_index));
  }
  return [str, asToSQL(column.as)].filter(_util__WEBPACK_IMPORTED_MODULE_4__["hasVal"]).join(' ');
}
function getDual(tables) {
  var baseTable = Array.isArray(tables) && tables[0];
  if (baseTable && baseTable.type === 'dual') return true;
  return false;
}
/**
 * Stringify column expressions
 *
 * @param {Array} columns
 * @return {string}
 */
function columnsToSQL(columns, tables) {
  if (!columns || columns === '*') return columns;
  var isDual = getDual(tables);
  return columns.map(function (col) {
    return columnToSQL(col, isDual);
  }).join(', ');
}


/***/ }),

/***/ "./src/command.js":
/*!************************!*\
  !*** ./src/command.js ***!
  \************************/
/*! exports provided: callToSQL, commonCmdToSQL, deallocateToSQL, declareToSQL, descToSQL, executeToSQL, forLoopToSQL, grantAndRevokeToSQL, grantUserOrRoleToSQL, ifToSQL, raiseToSQL, renameToSQL, useToSQL, setVarToSQL, lockUnlockToSQL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "callToSQL", function() { return callToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commonCmdToSQL", function() { return commonCmdToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deallocateToSQL", function() { return deallocateToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "declareToSQL", function() { return declareToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "descToSQL", function() { return descToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "executeToSQL", function() { return executeToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forLoopToSQL", function() { return forLoopToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "grantAndRevokeToSQL", function() { return grantAndRevokeToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "grantUserOrRoleToSQL", function() { return grantUserOrRoleToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ifToSQL", function() { return ifToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "raiseToSQL", function() { return raiseToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renameToSQL", function() { return renameToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useToSQL", function() { return useToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setVarToSQL", function() { return setVarToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lockUnlockToSQL", function() { return lockUnlockToSQL; });
/* harmony import */ var _column__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./column */ "./src/column.js");
/* harmony import */ var _create__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create */ "./src/create.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ "./src/util.js");
/* harmony import */ var _expr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./expr */ "./src/expr.js");
/* harmony import */ var _tables__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tables */ "./src/tables.js");
/* harmony import */ var _sql__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./sql */ "./src/sql.js");
/* harmony import */ var _union__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./union */ "./src/union.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }







function callToSQL(stmt) {
  var type = 'CALL';
  var storeProcessCall = Object(_expr__WEBPACK_IMPORTED_MODULE_3__["exprToSQL"])(stmt.expr);
  return "".concat(type, " ").concat(storeProcessCall);
}
function commonCmdToSQL(stmt) {
  var type = stmt.type,
    keyword = stmt.keyword,
    name = stmt.name,
    prefix = stmt.prefix,
    suffix = stmt.suffix;
  var clauses = [Object(_util__WEBPACK_IMPORTED_MODULE_2__["toUpper"])(type), Object(_util__WEBPACK_IMPORTED_MODULE_2__["toUpper"])(keyword), Object(_util__WEBPACK_IMPORTED_MODULE_2__["toUpper"])(prefix)];
  switch (keyword) {
    case 'table':
      clauses.push(Object(_tables__WEBPACK_IMPORTED_MODULE_4__["tablesToSQL"])(name));
      break;
    case 'trigger':
      clauses.push([name[0].schema ? "".concat(Object(_util__WEBPACK_IMPORTED_MODULE_2__["identifierToSql"])(name[0].schema), ".") : '', Object(_util__WEBPACK_IMPORTED_MODULE_2__["identifierToSql"])(name[0].trigger)].filter(_util__WEBPACK_IMPORTED_MODULE_2__["hasVal"]).join(''));
      break;
    case 'database':
    case 'schema':
    case 'procedure':
      clauses.push(Object(_util__WEBPACK_IMPORTED_MODULE_2__["identifierToSql"])(name));
      break;
    case 'view':
      clauses.push(Object(_tables__WEBPACK_IMPORTED_MODULE_4__["tablesToSQL"])(name), stmt.options && stmt.options.map(_expr__WEBPACK_IMPORTED_MODULE_3__["exprToSQL"]).filter(_util__WEBPACK_IMPORTED_MODULE_2__["hasVal"]).join(' '));
      break;
    case 'index':
      clauses.push.apply(clauses, [Object(_column__WEBPACK_IMPORTED_MODULE_0__["columnRefToSQL"])(name)].concat(_toConsumableArray(stmt.table ? ['ON', Object(_tables__WEBPACK_IMPORTED_MODULE_4__["tableToSQL"])(stmt.table)] : []), [stmt.options && stmt.options.map(_expr__WEBPACK_IMPORTED_MODULE_3__["exprToSQL"]).filter(_util__WEBPACK_IMPORTED_MODULE_2__["hasVal"]).join(' ')]));
      break;
    default:
      break;
  }
  if (suffix) clauses.push(suffix.map(_expr__WEBPACK_IMPORTED_MODULE_3__["exprToSQL"]).filter(_util__WEBPACK_IMPORTED_MODULE_2__["hasVal"]).join(' '));
  return clauses.filter(_util__WEBPACK_IMPORTED_MODULE_2__["hasVal"]).join(' ');
}
function descToSQL(stmt) {
  var type = stmt.type,
    table = stmt.table;
  var action = Object(_util__WEBPACK_IMPORTED_MODULE_2__["toUpper"])(type);
  return "".concat(action, " ").concat(Object(_util__WEBPACK_IMPORTED_MODULE_2__["identifierToSql"])(table));
}
function executeToSQL(stmt) {
  var type = stmt.type,
    name = stmt.name,
    args = stmt.args;
  var sql = [Object(_util__WEBPACK_IMPORTED_MODULE_2__["toUpper"])(type)];
  var nameWithArgs = [name];
  if (args) nameWithArgs.push("(".concat(Object(_expr__WEBPACK_IMPORTED_MODULE_3__["exprToSQL"])(args).join(', '), ")"));
  sql.push(nameWithArgs.join(''));
  return sql.filter(_util__WEBPACK_IMPORTED_MODULE_2__["hasVal"]).join(' ');
}
function forLoopToSQL(stmt) {
  var type = stmt.type,
    label = stmt.label,
    target = stmt.target,
    query = stmt.query,
    stmts = stmt.stmts;
  var sql = [label, Object(_util__WEBPACK_IMPORTED_MODULE_2__["toUpper"])(type), target, 'IN', Object(_union__WEBPACK_IMPORTED_MODULE_6__["multipleToSQL"])([query]), 'LOOP', Object(_union__WEBPACK_IMPORTED_MODULE_6__["multipleToSQL"])(stmts), 'END LOOP', label];
  return sql.filter(_util__WEBPACK_IMPORTED_MODULE_2__["hasVal"]).join(' ');
}
function raiseToSQL(stmt) {
  var type = stmt.type,
    level = stmt.level,
    raise = stmt.raise,
    using = stmt.using;
  var sql = [Object(_util__WEBPACK_IMPORTED_MODULE_2__["toUpper"])(type), Object(_util__WEBPACK_IMPORTED_MODULE_2__["toUpper"])(level)];
  if (raise) sql.push([Object(_util__WEBPACK_IMPORTED_MODULE_2__["literalToSQL"])(raise.keyword), raise.type === 'format' && raise.expr.length > 0 && ','].filter(_util__WEBPACK_IMPORTED_MODULE_2__["hasVal"]).join(''), raise.expr.map(function (exprInfo) {
    return Object(_expr__WEBPACK_IMPORTED_MODULE_3__["exprToSQL"])(exprInfo);
  }).join(', '));
  if (using) sql.push(Object(_util__WEBPACK_IMPORTED_MODULE_2__["toUpper"])(using.type), Object(_util__WEBPACK_IMPORTED_MODULE_2__["toUpper"])(using.option), using.symbol, using.expr.map(function (exprInfo) {
    return Object(_expr__WEBPACK_IMPORTED_MODULE_3__["exprToSQL"])(exprInfo);
  }).join(', '));
  return sql.filter(_util__WEBPACK_IMPORTED_MODULE_2__["hasVal"]).join(' ');
}
function renameToSQL(stmt) {
  var type = stmt.type,
    table = stmt.table;
  var clauses = [];
  var prefix = "".concat(type && type.toUpperCase(), " TABLE");
  if (table) {
    var _iterator = _createForOfIteratorHelper(table),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var tables = _step.value;
        var renameInfo = tables.map(_tables__WEBPACK_IMPORTED_MODULE_4__["tableToSQL"]);
        clauses.push(renameInfo.join(' TO '));
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  return "".concat(prefix, " ").concat(clauses.join(', '));
}
function useToSQL(stmt) {
  var type = stmt.type,
    db = stmt.db;
  var action = Object(_util__WEBPACK_IMPORTED_MODULE_2__["toUpper"])(type);
  var database = Object(_util__WEBPACK_IMPORTED_MODULE_2__["identifierToSql"])(db);
  return "".concat(action, " ").concat(database);
}
function setVarToSQL(stmt) {
  var expr = stmt.expr;
  var action = 'SET';
  var val = Object(_expr__WEBPACK_IMPORTED_MODULE_3__["exprToSQL"])(expr);
  return "".concat(action, " ").concat(val);
}
function pgLock(stmt) {
  var lockMode = stmt.lock_mode,
    nowait = stmt.nowait;
  var lockInfo = [];
  if (lockMode) {
    var mode = lockMode.mode;
    lockInfo.push(mode.toUpperCase());
  }
  if (nowait) lockInfo.push(nowait.toUpperCase());
  return lockInfo;
}
function lockUnlockToSQL(stmt) {
  var type = stmt.type,
    keyword = stmt.keyword,
    tables = stmt.tables;
  var result = [type.toUpperCase(), Object(_util__WEBPACK_IMPORTED_MODULE_2__["toUpper"])(keyword)];
  if (type.toUpperCase() === 'UNLOCK') return result.join(' ');
  var tableStmt = [];
  var _iterator2 = _createForOfIteratorHelper(tables),
    _step2;
  try {
    var _loop = function _loop() {
      var tableInfo = _step2.value;
      var table = tableInfo.table,
        lockType = tableInfo.lock_type;
      var tableInfoTemp = [Object(_tables__WEBPACK_IMPORTED_MODULE_4__["tableToSQL"])(table)];
      if (lockType) {
        var lockKeyList = ['prefix', 'type', 'suffix'];
        tableInfoTemp.push(lockKeyList.map(function (key) {
          return Object(_util__WEBPACK_IMPORTED_MODULE_2__["toUpper"])(lockType[key]);
        }).filter(_util__WEBPACK_IMPORTED_MODULE_2__["hasVal"]).join(' '));
      }
      tableStmt.push(tableInfoTemp.join(' '));
    };
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  result.push.apply(result, [tableStmt.join(', ')].concat(_toConsumableArray(pgLock(stmt))));
  return result.filter(_util__WEBPACK_IMPORTED_MODULE_2__["hasVal"]).join(' ');
}
function deallocateToSQL(stmt) {
  var type = stmt.type,
    keyword = stmt.keyword,
    expr = stmt.expr;
  return [Object(_util__WEBPACK_IMPORTED_MODULE_2__["toUpper"])(type), Object(_util__WEBPACK_IMPORTED_MODULE_2__["toUpper"])(keyword), Object(_expr__WEBPACK_IMPORTED_MODULE_3__["exprToSQL"])(expr)].filter(_util__WEBPACK_IMPORTED_MODULE_2__["hasVal"]).join(' ');
}
function declareToSQL(stmt) {
  var type = stmt.type,
    declare = stmt.declare,
    symbol = stmt.symbol;
  var result = [Object(_util__WEBPACK_IMPORTED_MODULE_2__["toUpper"])(type)];
  var info = declare.map(function (dec) {
    var at = dec.at,
      name = dec.name,
      as = dec.as,
      constant = dec.constant,
      datatype = dec.datatype,
      not_null = dec.not_null,
      prefix = dec.prefix,
      definition = dec.definition,
      keyword = dec.keyword;
    var declareInfo = [[at, name].filter(_util__WEBPACK_IMPORTED_MODULE_2__["hasVal"]).join(''), Object(_util__WEBPACK_IMPORTED_MODULE_2__["toUpper"])(as), Object(_util__WEBPACK_IMPORTED_MODULE_2__["toUpper"])(constant)];
    switch (keyword) {
      case 'variable':
        declareInfo.push.apply(declareInfo, [Object(_column__WEBPACK_IMPORTED_MODULE_0__["columnDataType"])(datatype)].concat(_toConsumableArray(Object(_util__WEBPACK_IMPORTED_MODULE_2__["commonTypeValue"])(dec.collate)), [Object(_util__WEBPACK_IMPORTED_MODULE_2__["toUpper"])(not_null)]));
        if (definition) declareInfo.push(Object(_util__WEBPACK_IMPORTED_MODULE_2__["toUpper"])(definition.keyword), Object(_expr__WEBPACK_IMPORTED_MODULE_3__["exprToSQL"])(definition.value));
        break;
      case 'cursor':
        declareInfo.push(Object(_util__WEBPACK_IMPORTED_MODULE_2__["toUpper"])(prefix));
        break;
      case 'table':
        declareInfo.push(Object(_util__WEBPACK_IMPORTED_MODULE_2__["toUpper"])(prefix), "(".concat(definition.map(_create__WEBPACK_IMPORTED_MODULE_1__["createDefinitionToSQL"]).join(', '), ")"));
        break;
      default:
        break;
    }
    return declareInfo.filter(_util__WEBPACK_IMPORTED_MODULE_2__["hasVal"]).join(' ');
  }).join("".concat(symbol, " "));
  result.push(info);
  return result.join(' ');
}
function ifToSQL(stmt) {
  var boolExpr = stmt.boolean_expr,
    elseExpr = stmt.else_expr,
    elseifExpr = stmt.elseif_expr,
    ifExpr = stmt.if_expr,
    prefix = stmt.prefix,
    go = stmt.go,
    semicolons = stmt.semicolons,
    suffix = stmt.suffix,
    type = stmt.type;
  var result = [Object(_util__WEBPACK_IMPORTED_MODULE_2__["toUpper"])(type), Object(_expr__WEBPACK_IMPORTED_MODULE_3__["exprToSQL"])(boolExpr), Object(_util__WEBPACK_IMPORTED_MODULE_2__["literalToSQL"])(prefix), "".concat(Object(_sql__WEBPACK_IMPORTED_MODULE_5__["default"])(ifExpr.ast || ifExpr)).concat(semicolons[0]), Object(_util__WEBPACK_IMPORTED_MODULE_2__["toUpper"])(go)];
  if (elseifExpr) {
    result.push(elseifExpr.map(function (elseif) {
      return [Object(_util__WEBPACK_IMPORTED_MODULE_2__["toUpper"])(elseif.type), Object(_expr__WEBPACK_IMPORTED_MODULE_3__["exprToSQL"])(elseif.boolean_expr), 'THEN', Object(_sql__WEBPACK_IMPORTED_MODULE_5__["default"])(elseif.then.ast || elseif.then), elseif.semicolon].filter(_util__WEBPACK_IMPORTED_MODULE_2__["hasVal"]).join(' ');
    }).join(' '));
  }
  if (elseExpr) result.push('ELSE', "".concat(Object(_sql__WEBPACK_IMPORTED_MODULE_5__["default"])(elseExpr.ast || elseExpr)).concat(semicolons[1]));
  result.push(Object(_util__WEBPACK_IMPORTED_MODULE_2__["literalToSQL"])(suffix));
  return result.filter(_util__WEBPACK_IMPORTED_MODULE_2__["hasVal"]).join(' ');
}
function grantUserOrRoleToSQL(stmt) {
  var name = stmt.name,
    host = stmt.host;
  var result = [Object(_util__WEBPACK_IMPORTED_MODULE_2__["literalToSQL"])(name)];
  if (host) result.push('@', Object(_util__WEBPACK_IMPORTED_MODULE_2__["literalToSQL"])(host));
  return result.join('');
}
function grantAndRevokeToSQL(stmt) {
  var type = stmt.type,
    grant_option_for = stmt.grant_option_for,
    keyword = stmt.keyword,
    objects = stmt.objects,
    on = stmt.on,
    to_from = stmt.to_from,
    user_or_roles = stmt.user_or_roles,
    withOpt = stmt["with"];
  var result = [Object(_util__WEBPACK_IMPORTED_MODULE_2__["toUpper"])(type), Object(_util__WEBPACK_IMPORTED_MODULE_2__["literalToSQL"])(grant_option_for)];
  var objStr = objects.map(function (obj) {
    var priv = obj.priv,
      columns = obj.columns;
    var privSQL = [Object(_expr__WEBPACK_IMPORTED_MODULE_3__["exprToSQL"])(priv)];
    if (columns) privSQL.push("(".concat(columns.map(_column__WEBPACK_IMPORTED_MODULE_0__["columnRefToSQL"]).join(', '), ")"));
    return privSQL.join(' ');
  }).join(', ');
  result.push(objStr);
  if (on) {
    result.push('ON');
    switch (keyword) {
      case 'priv':
        result.push(Object(_util__WEBPACK_IMPORTED_MODULE_2__["literalToSQL"])(on.object_type), on.priv_level.map(function (privLevel) {
          return [Object(_util__WEBPACK_IMPORTED_MODULE_2__["identifierToSql"])(privLevel.prefix), Object(_util__WEBPACK_IMPORTED_MODULE_2__["identifierToSql"])(privLevel.name)].filter(_util__WEBPACK_IMPORTED_MODULE_2__["hasVal"]).join('.');
        }).join(', '));
        break;
      case 'proxy':
        result.push(grantUserOrRoleToSQL(on));
        break;
    }
  }
  result.push(Object(_util__WEBPACK_IMPORTED_MODULE_2__["toUpper"])(to_from), user_or_roles.map(grantUserOrRoleToSQL).join(', '));
  result.push(Object(_util__WEBPACK_IMPORTED_MODULE_2__["literalToSQL"])(withOpt));
  return result.filter(_util__WEBPACK_IMPORTED_MODULE_2__["hasVal"]).join(' ');
}


/***/ }),

/***/ "./src/constrain.js":
/*!**************************!*\
  !*** ./src/constrain.js ***!
  \**************************/
/*! exports provided: constraintDefinitionToSQL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "constraintDefinitionToSQL", function() { return constraintDefinitionToSQL; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/util.js");
/* harmony import */ var _index_definition__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index-definition */ "./src/index-definition.js");
/* harmony import */ var _column__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./column */ "./src/column.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }



function constraintDefinitionToSQL(constraintDefinition) {
  if (!constraintDefinition) return;
  var constraint = constraintDefinition.constraint,
    constraintType = constraintDefinition.constraint_type,
    enforced = constraintDefinition.enforced,
    index = constraintDefinition.index,
    keyword = constraintDefinition.keyword,
    referenceDefinition = constraintDefinition.reference_definition;
  var constraintSQL = [];
  var _getParserOpt = Object(_util__WEBPACK_IMPORTED_MODULE_0__["getParserOpt"])(),
    database = _getParserOpt.database;
  constraintSQL.push(Object(_util__WEBPACK_IMPORTED_MODULE_0__["toUpper"])(keyword));
  constraintSQL.push(Object(_util__WEBPACK_IMPORTED_MODULE_0__["identifierToSql"])(constraint));
  var constraintTypeStr = Object(_util__WEBPACK_IMPORTED_MODULE_0__["toUpper"])(constraintType);
  if (database === 'sqlite' && constraintTypeStr === 'UNIQUE KEY') constraintTypeStr = 'UNIQUE';
  constraintSQL.push(constraintTypeStr);
  constraintSQL.push(database !== 'sqlite' && Object(_util__WEBPACK_IMPORTED_MODULE_0__["identifierToSql"])(index));
  constraintSQL.push.apply(constraintSQL, _toConsumableArray(Object(_index_definition__WEBPACK_IMPORTED_MODULE_1__["indexTypeAndOptionToSQL"])(constraintDefinition)));
  constraintSQL.push.apply(constraintSQL, _toConsumableArray(Object(_column__WEBPACK_IMPORTED_MODULE_2__["columnReferenceDefinitionToSQL"])(referenceDefinition)));
  constraintSQL.push(Object(_util__WEBPACK_IMPORTED_MODULE_0__["toUpper"])(enforced));
  return constraintSQL.filter(_util__WEBPACK_IMPORTED_MODULE_0__["hasVal"]).join(' ');
}


/***/ }),

/***/ "./src/create.js":
/*!***********************!*\
  !*** ./src/create.js ***!
  \***********************/
/*! exports provided: createToSQL, createDefinitionToSQL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createToSQL", function() { return createToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createDefinitionToSQL", function() { return createDefinitionToSQL; });
/* harmony import */ var _alter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./alter */ "./src/alter.js");
/* harmony import */ var _expr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./expr */ "./src/expr.js");
/* harmony import */ var _index_definition__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index-definition */ "./src/index-definition.js");
/* harmony import */ var _column__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./column */ "./src/column.js");
/* harmony import */ var _command__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./command */ "./src/command.js");
/* harmony import */ var _constrain__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./constrain */ "./src/constrain.js");
/* harmony import */ var _func__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./func */ "./src/func.js");
/* harmony import */ var _tables__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./tables */ "./src/tables.js");
/* harmony import */ var _update__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./update */ "./src/update.js");
/* harmony import */ var _union__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./union */ "./src/union.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./util */ "./src/util.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }











function createDefinitionToSQL(definition) {
  if (!definition) return [];
  var resource = definition.resource;
  switch (resource) {
    case 'column':
      return Object(_column__WEBPACK_IMPORTED_MODULE_3__["columnDefinitionToSQL"])(definition);
    case 'index':
      return Object(_index_definition__WEBPACK_IMPORTED_MODULE_2__["indexDefinitionToSQL"])(definition);
    case 'constraint':
      return Object(_constrain__WEBPACK_IMPORTED_MODULE_5__["constraintDefinitionToSQL"])(definition);
    case 'sequence':
      return [Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(definition.prefix), Object(_expr__WEBPACK_IMPORTED_MODULE_1__["exprToSQL"])(definition.value)].filter(_util__WEBPACK_IMPORTED_MODULE_10__["hasVal"]).join(' ');
    default:
      throw new Error("unknown resource = ".concat(resource, " type"));
  }
}
function createTableToSQL(stmt) {
  var type = stmt.type,
    keyword = stmt.keyword,
    table = stmt.table,
    like = stmt.like,
    as = stmt.as,
    temporary = stmt.temporary,
    ifNotExists = stmt.if_not_exists,
    createDefinition = stmt.create_definitions,
    tableOptions = stmt.table_options,
    ignoreReplace = stmt.ignore_replace,
    orReplace = stmt.or_replace,
    queryExpr = stmt.query_expr;
  var sql = [Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(type), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(orReplace), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(temporary), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(keyword), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(ifNotExists), Object(_tables__WEBPACK_IMPORTED_MODULE_7__["tablesToSQL"])(table)];
  if (like) {
    var likeType = like.type,
      likeTable = like.table;
    var likeTableName = Object(_tables__WEBPACK_IMPORTED_MODULE_7__["tablesToSQL"])(likeTable);
    sql.push(Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(likeType), likeTableName);
    return sql.filter(_util__WEBPACK_IMPORTED_MODULE_10__["hasVal"]).join(' ');
  }
  if (createDefinition) {
    sql.push("(".concat(createDefinition.map(createDefinitionToSQL).join(', '), ")"));
  }
  if (tableOptions) {
    sql.push(tableOptions.map(_tables__WEBPACK_IMPORTED_MODULE_7__["tableOptionToSQL"]).join(' '));
  }
  sql.push(Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(ignoreReplace), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(as));
  if (queryExpr) sql.push(Object(_union__WEBPACK_IMPORTED_MODULE_9__["unionToSQL"])(queryExpr));
  return sql.filter(_util__WEBPACK_IMPORTED_MODULE_10__["hasVal"]).join(' ');
}
function createTriggerToSQL(stmt) {
  var definer = stmt.definer,
    forEach = stmt.for_each,
    keyword = stmt.keyword,
    triggerBody = stmt.execute,
    type = stmt.type,
    table = stmt.table,
    ife = stmt.if_not_exists,
    temporary = stmt.temporary,
    trigger = stmt.trigger,
    triggerEvents = stmt.events,
    triggerOrder = stmt.order,
    triggerTime = stmt.time,
    when = stmt.when;
  var sql = [Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(type), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(temporary), definer, Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(keyword), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(ife), Object(_tables__WEBPACK_IMPORTED_MODULE_7__["tableToSQL"])(trigger), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(triggerTime), triggerEvents.map(function (event) {
    var eventStr = [Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(event.keyword)];
    var args = event.args;
    if (args) eventStr.push(Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(args.keyword), args.columns.map(_column__WEBPACK_IMPORTED_MODULE_3__["columnRefToSQL"]).join(', '));
    return eventStr.join(' ');
  }), 'ON', Object(_tables__WEBPACK_IMPORTED_MODULE_7__["tableToSQL"])(table), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(forEach && forEach.keyword), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(forEach && forEach.args), triggerOrder && "".concat(Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(triggerOrder.keyword), " ").concat(Object(_util__WEBPACK_IMPORTED_MODULE_10__["identifierToSql"])(triggerOrder.trigger)), Object(_util__WEBPACK_IMPORTED_MODULE_10__["commonOptionConnector"])('WHEN', _expr__WEBPACK_IMPORTED_MODULE_1__["exprToSQL"], when), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(triggerBody.prefix)];
  switch (triggerBody.type) {
    case 'set':
      sql.push(Object(_util__WEBPACK_IMPORTED_MODULE_10__["commonOptionConnector"])('SET', _update__WEBPACK_IMPORTED_MODULE_8__["setToSQL"], triggerBody.expr));
      break;
    case 'multiple':
      sql.push(Object(_union__WEBPACK_IMPORTED_MODULE_9__["multipleToSQL"])(triggerBody.expr.ast));
      break;
  }
  sql.push(Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(triggerBody.suffix));
  return sql.filter(_util__WEBPACK_IMPORTED_MODULE_10__["hasVal"]).join(' ');
}
function createConstraintTriggerToSQL(stmt) {
  var constraint = stmt.constraint,
    constraintKw = stmt.constraint_kw,
    deferrable = stmt.deferrable,
    events = stmt.events,
    execute = stmt.execute,
    forEach = stmt.for_each,
    from = stmt.from,
    location = stmt.location,
    keyword = stmt.keyword,
    or = stmt.or,
    type = stmt.type,
    table = stmt.table,
    when = stmt.when;
  var sql = [Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(type), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(or), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(constraintKw), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(keyword), Object(_util__WEBPACK_IMPORTED_MODULE_10__["identifierToSql"])(constraint), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(location)];
  var event = Object(_util__WEBPACK_IMPORTED_MODULE_10__["triggerEventToSQL"])(events);
  sql.push(event, 'ON', Object(_tables__WEBPACK_IMPORTED_MODULE_7__["tableToSQL"])(table));
  if (from) sql.push('FROM', Object(_tables__WEBPACK_IMPORTED_MODULE_7__["tableToSQL"])(from));
  sql.push.apply(sql, _toConsumableArray(Object(_util__WEBPACK_IMPORTED_MODULE_10__["commonKeywordArgsToSQL"])(deferrable)).concat(_toConsumableArray(Object(_util__WEBPACK_IMPORTED_MODULE_10__["commonKeywordArgsToSQL"])(forEach))));
  if (when) sql.push(Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(when.type), Object(_expr__WEBPACK_IMPORTED_MODULE_1__["exprToSQL"])(when.cond));
  sql.push(Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(execute.keyword), Object(_func__WEBPACK_IMPORTED_MODULE_6__["funcToSQL"])(execute.expr));
  return sql.filter(_util__WEBPACK_IMPORTED_MODULE_10__["hasVal"]).join(' ');
}
function createExtensionToSQL(stmt) {
  var extension = stmt.extension,
    from = stmt.from,
    ifNotExists = stmt.if_not_exists,
    keyword = stmt.keyword,
    schema = stmt.schema,
    type = stmt.type,
    withName = stmt["with"],
    version = stmt.version;
  var sql = [Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(type), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(keyword), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(ifNotExists), Object(_util__WEBPACK_IMPORTED_MODULE_10__["literalToSQL"])(extension), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(withName), Object(_util__WEBPACK_IMPORTED_MODULE_10__["commonOptionConnector"])('SCHEMA', _util__WEBPACK_IMPORTED_MODULE_10__["literalToSQL"], schema), Object(_util__WEBPACK_IMPORTED_MODULE_10__["commonOptionConnector"])('VERSION', _util__WEBPACK_IMPORTED_MODULE_10__["literalToSQL"], version), Object(_util__WEBPACK_IMPORTED_MODULE_10__["commonOptionConnector"])('FROM', _util__WEBPACK_IMPORTED_MODULE_10__["literalToSQL"], from)];
  return sql.filter(_util__WEBPACK_IMPORTED_MODULE_10__["hasVal"]).join(' ');
}
function createIndexToSQL(stmt) {
  var concurrently = stmt.concurrently,
    fileStream = stmt.filestream_on,
    keyword = stmt.keyword,
    include = stmt.include,
    indexColumns = stmt.index_columns,
    indexType = stmt.index_type,
    indexUsing = stmt.index_using,
    index = stmt.index,
    on = stmt.on,
    indexOpt = stmt.index_options,
    algorithmOpt = stmt.algorithm_option,
    lockOpt = stmt.lock_option,
    onKw = stmt.on_kw,
    table = stmt.table,
    tablespace = stmt.tablespace,
    type = stmt.type,
    where = stmt.where,
    withExpr = stmt["with"],
    withBeforeWhere = stmt.with_before_where;
  var withIndexOpt = withExpr && "WITH (".concat(Object(_index_definition__WEBPACK_IMPORTED_MODULE_2__["indexOptionListToSQL"])(withExpr).join(', '), ")");
  var includeColumns = include && "".concat(Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(include.keyword), " (").concat(include.columns.map(function (col) {
    return Object(_util__WEBPACK_IMPORTED_MODULE_10__["identifierToSql"])(col);
  }).join(', '), ")");
  var sql = [Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(type), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(indexType), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(keyword), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(concurrently), Object(_util__WEBPACK_IMPORTED_MODULE_10__["identifierToSql"])(index), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(onKw), Object(_tables__WEBPACK_IMPORTED_MODULE_7__["tableToSQL"])(table)].concat(_toConsumableArray(Object(_index_definition__WEBPACK_IMPORTED_MODULE_2__["indexTypeToSQL"])(indexUsing)), ["(".concat(Object(_util__WEBPACK_IMPORTED_MODULE_10__["columnOrderListToSQL"])(indexColumns), ")"), includeColumns, Object(_index_definition__WEBPACK_IMPORTED_MODULE_2__["indexOptionListToSQL"])(indexOpt).join(' '), Object(_alter__WEBPACK_IMPORTED_MODULE_0__["alterExprToSQL"])(algorithmOpt), Object(_alter__WEBPACK_IMPORTED_MODULE_0__["alterExprToSQL"])(lockOpt), Object(_util__WEBPACK_IMPORTED_MODULE_10__["commonOptionConnector"])('TABLESPACE', _util__WEBPACK_IMPORTED_MODULE_10__["literalToSQL"], tablespace)]);
  if (withBeforeWhere) {
    sql.push(withIndexOpt, Object(_util__WEBPACK_IMPORTED_MODULE_10__["commonOptionConnector"])('WHERE', _expr__WEBPACK_IMPORTED_MODULE_1__["exprToSQL"], where));
  } else {
    sql.push(Object(_util__WEBPACK_IMPORTED_MODULE_10__["commonOptionConnector"])('WHERE', _expr__WEBPACK_IMPORTED_MODULE_1__["exprToSQL"], where), withIndexOpt);
  }
  sql.push(Object(_util__WEBPACK_IMPORTED_MODULE_10__["commonOptionConnector"])('ON', _expr__WEBPACK_IMPORTED_MODULE_1__["exprToSQL"], on), Object(_util__WEBPACK_IMPORTED_MODULE_10__["commonOptionConnector"])('FILESTREAM_ON', _util__WEBPACK_IMPORTED_MODULE_10__["literalToSQL"], fileStream));
  return sql.filter(_util__WEBPACK_IMPORTED_MODULE_10__["hasVal"]).join(' ');
}
function createSequenceToSQL(stmt) {
  var type = stmt.type,
    keyword = stmt.keyword,
    sequence = stmt.sequence,
    temporary = stmt.temporary,
    ifNotExists = stmt.if_not_exists,
    createDefinition = stmt.create_definitions;
  var sql = [Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(type), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(temporary), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(keyword), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(ifNotExists), Object(_tables__WEBPACK_IMPORTED_MODULE_7__["tablesToSQL"])(sequence)];
  if (createDefinition) sql.push(createDefinition.map(createDefinitionToSQL).join(' '));
  return sql.filter(_util__WEBPACK_IMPORTED_MODULE_10__["hasVal"]).join(' ');
}
function createDatabaseToSQL(stmt) {
  var type = stmt.type,
    keyword = stmt.keyword,
    database = stmt.database,
    ifNotExists = stmt.if_not_exists,
    createDefinition = stmt.create_definitions;
  var sql = [Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(type), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(keyword), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(ifNotExists), Object(_util__WEBPACK_IMPORTED_MODULE_10__["columnIdentifierToSql"])(database)];
  if (createDefinition) sql.push(createDefinition.map(_tables__WEBPACK_IMPORTED_MODULE_7__["tableOptionToSQL"]).join(' '));
  return sql.filter(_util__WEBPACK_IMPORTED_MODULE_10__["hasVal"]).join(' ');
}
function createViewToSQL(stmt) {
  var algorithm = stmt.algorithm,
    columns = stmt.columns,
    definer = stmt.definer,
    ifNotExists = stmt.if_not_exists,
    keyword = stmt.keyword,
    recursive = stmt.recursive,
    replace = stmt.replace,
    select = stmt.select,
    sqlSecurity = stmt.sql_security,
    temporary = stmt.temporary,
    type = stmt.type,
    view = stmt.view,
    withClause = stmt["with"],
    withOptions = stmt.with_options;
  var db = view.db,
    name = view.view;
  var viewName = [Object(_util__WEBPACK_IMPORTED_MODULE_10__["identifierToSql"])(db), Object(_util__WEBPACK_IMPORTED_MODULE_10__["identifierToSql"])(name)].filter(_util__WEBPACK_IMPORTED_MODULE_10__["hasVal"]).join('.');
  var sql = [Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(type), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(replace), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(temporary), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(recursive), algorithm && "ALGORITHM = ".concat(Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(algorithm)), definer, sqlSecurity && "SQL SECURITY ".concat(Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(sqlSecurity)), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(keyword), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(ifNotExists), viewName, columns && "(".concat(columns.map(_util__WEBPACK_IMPORTED_MODULE_10__["columnIdentifierToSql"]).join(', '), ")"), withOptions && ['WITH', "(".concat(withOptions.map(function (withOpt) {
    return Object(_util__WEBPACK_IMPORTED_MODULE_10__["commonTypeValue"])(withOpt).join(' ');
  }).join(', '), ")")].join(' '), 'AS', Object(_union__WEBPACK_IMPORTED_MODULE_9__["unionToSQL"])(select), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(withClause)];
  return sql.filter(_util__WEBPACK_IMPORTED_MODULE_10__["hasVal"]).join(' ');
}
function createDomainToSQL(stmt) {
  var as = stmt.as,
    domain = stmt.domain,
    type = stmt.type,
    keyword = stmt.keyword,
    target = stmt.target,
    createDefinition = stmt.create_definitions;
  var sql = [Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(type), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(keyword), [Object(_util__WEBPACK_IMPORTED_MODULE_10__["identifierToSql"])(domain.schema), Object(_util__WEBPACK_IMPORTED_MODULE_10__["identifierToSql"])(domain.name)].filter(_util__WEBPACK_IMPORTED_MODULE_10__["hasVal"]).join('.'), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(as), Object(_util__WEBPACK_IMPORTED_MODULE_10__["dataTypeToSQL"])(target)];
  if (createDefinition && createDefinition.length > 0) {
    var definitionSQL = [];
    var _iterator = _createForOfIteratorHelper(createDefinition),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var definition = _step.value;
        var definitionType = definition.type;
        switch (definitionType) {
          case 'collate':
            definitionSQL.push(Object(_util__WEBPACK_IMPORTED_MODULE_10__["commonTypeValue"])(definition).join(' '));
            break;
          case 'default':
            definitionSQL.push(Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(definitionType), Object(_expr__WEBPACK_IMPORTED_MODULE_1__["exprToSQL"])(definition.value));
            break;
          case 'constraint':
            definitionSQL.push(Object(_constrain__WEBPACK_IMPORTED_MODULE_5__["constraintDefinitionToSQL"])(definition));
            break;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    sql.push(definitionSQL.filter(_util__WEBPACK_IMPORTED_MODULE_10__["hasVal"]).join(' '));
  }
  return sql.filter(_util__WEBPACK_IMPORTED_MODULE_10__["hasVal"]).join(' ');
}
function createTypeToSQL(stmt) {
  var as = stmt.as,
    createDefinition = stmt.create_definitions,
    keyword = stmt.keyword,
    name = stmt.name,
    resource = stmt.resource,
    type = stmt.type;
  var sql = [Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(type), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(keyword), [Object(_util__WEBPACK_IMPORTED_MODULE_10__["identifierToSql"])(name.schema), Object(_util__WEBPACK_IMPORTED_MODULE_10__["identifierToSql"])(name.name)].filter(_util__WEBPACK_IMPORTED_MODULE_10__["hasVal"]).join('.'), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(as), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(resource)];
  if (createDefinition) {
    var definitionSQL = [];
    switch (resource) {
      case 'enum':
        definitionSQL.push(Object(_expr__WEBPACK_IMPORTED_MODULE_1__["exprToSQL"])(createDefinition));
        break;
    }
    sql.push(definitionSQL.filter(_util__WEBPACK_IMPORTED_MODULE_10__["hasVal"]).join(' '));
  }
  return sql.filter(_util__WEBPACK_IMPORTED_MODULE_10__["hasVal"]).join(' ');
}
function createFunctionReturnsOptToSQL(stmt) {
  if (stmt.dataType) return Object(_util__WEBPACK_IMPORTED_MODULE_10__["dataTypeToSQL"])(stmt);
  return [Object(_util__WEBPACK_IMPORTED_MODULE_10__["identifierToSql"])(stmt.db), Object(_util__WEBPACK_IMPORTED_MODULE_10__["identifierToSql"])(stmt.schema), Object(_util__WEBPACK_IMPORTED_MODULE_10__["identifierToSql"])(stmt.table)].filter(_util__WEBPACK_IMPORTED_MODULE_10__["hasVal"]).join('.');
}
function createFunctionReturnsToSQL(stmt) {
  var type = stmt.type,
    keyword = stmt.keyword,
    expr = stmt.expr;
  var sql = [Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(type), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(keyword), Array.isArray(expr) ? "(".concat(expr.map(_column__WEBPACK_IMPORTED_MODULE_3__["columnDefinitionToSQL"]).join(', '), ")") : createFunctionReturnsOptToSQL(expr)];
  return sql.filter(_util__WEBPACK_IMPORTED_MODULE_10__["hasVal"]).join(' ');
}
function createFunctionOptionToSQL(stmt) {
  var type = stmt.type;
  switch (type) {
    case 'as':
      return [Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(type), stmt.symbol, Object(_union__WEBPACK_IMPORTED_MODULE_9__["unionToSQL"])(stmt.declare), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(stmt.begin), Object(_union__WEBPACK_IMPORTED_MODULE_9__["multipleToSQL"])(stmt.expr), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(stmt.end), stmt.symbol].filter(_util__WEBPACK_IMPORTED_MODULE_10__["hasVal"]).join(' ');
    case 'set':
      return [Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(type), stmt.parameter, Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(stmt.value && stmt.value.prefix), stmt.value && stmt.value.expr.map(_expr__WEBPACK_IMPORTED_MODULE_1__["exprToSQL"]).join(', ')].filter(_util__WEBPACK_IMPORTED_MODULE_10__["hasVal"]).join(' ');
    default:
      return Object(_expr__WEBPACK_IMPORTED_MODULE_1__["exprToSQL"])(stmt);
  }
}
function createFunctionToSQL(stmt) {
  var type = stmt.type,
    replace = stmt.replace,
    keyword = stmt.keyword,
    name = stmt.name,
    args = stmt.args,
    returns = stmt.returns,
    options = stmt.options,
    last = stmt.last;
  var sql = [Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(type), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(replace), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(keyword)];
  var functionName = [Object(_util__WEBPACK_IMPORTED_MODULE_10__["identifierToSql"])(name.schema), name.name].filter(_util__WEBPACK_IMPORTED_MODULE_10__["hasVal"]).join('.');
  var argsSQL = args.map(_alter__WEBPACK_IMPORTED_MODULE_0__["alterArgsToSQL"]).filter(_util__WEBPACK_IMPORTED_MODULE_10__["hasVal"]).join(', ');
  sql.push("".concat(functionName, "(").concat(argsSQL, ")"), createFunctionReturnsToSQL(returns), options.map(createFunctionOptionToSQL).join(' '), last);
  return sql.filter(_util__WEBPACK_IMPORTED_MODULE_10__["hasVal"]).join(' ');
}
function aggregateOptionToSQL(stmt) {
  var type = stmt.type,
    symbol = stmt.symbol,
    value = stmt.value;
  var sql = [Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(type), symbol];
  switch (Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(type)) {
    case 'SFUNC':
      sql.push([Object(_util__WEBPACK_IMPORTED_MODULE_10__["identifierToSql"])(value.schema), value.name].filter(_util__WEBPACK_IMPORTED_MODULE_10__["hasVal"]).join('.'));
      break;
    case 'STYPE':
    case 'MSTYPE':
      sql.push(Object(_util__WEBPACK_IMPORTED_MODULE_10__["dataTypeToSQL"])(value));
      break;
    default:
      sql.push(Object(_expr__WEBPACK_IMPORTED_MODULE_1__["exprToSQL"])(value));
      break;
  }
  return sql.filter(_util__WEBPACK_IMPORTED_MODULE_10__["hasVal"]).join(' ');
}
function createAggregateToSQL(stmt) {
  var type = stmt.type,
    replace = stmt.replace,
    keyword = stmt.keyword,
    name = stmt.name,
    args = stmt.args,
    options = stmt.options;
  var sql = [Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(type), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(replace), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(keyword)];
  var functionName = [Object(_util__WEBPACK_IMPORTED_MODULE_10__["identifierToSql"])(name.schema), name.name].filter(_util__WEBPACK_IMPORTED_MODULE_10__["hasVal"]).join('.');
  var argsSQL = "".concat(args.expr.map(_alter__WEBPACK_IMPORTED_MODULE_0__["alterArgsToSQL"]).join(', ')).concat(args.orderby ? [' ORDER', 'BY', args.orderby.map(_alter__WEBPACK_IMPORTED_MODULE_0__["alterArgsToSQL"]).join(', ')].join(' ') : '');
  sql.push("".concat(functionName, "(").concat(argsSQL, ")"), "(".concat(options.map(aggregateOptionToSQL).join(', '), ")"));
  return sql.filter(_util__WEBPACK_IMPORTED_MODULE_10__["hasVal"]).join(' ');
}
function createUserToSQL(stmt) {
  var attribute = stmt.attribute,
    comment = stmt.comment,
    defaultRole = stmt.default_role,
    ifNotExists = stmt.if_not_exists,
    keyword = stmt.keyword,
    lockOption = stmt.lock_option,
    passwordOptions = stmt.password_options,
    requireOption = stmt.require,
    resourceOptions = stmt.resource_options,
    type = stmt.type,
    user = stmt.user;
  var userAuthOptions = user.map(function (userAuthOption) {
    var userInfo = userAuthOption.user,
      auth_option = userAuthOption.auth_option;
    var result = [Object(_command__WEBPACK_IMPORTED_MODULE_4__["grantUserOrRoleToSQL"])(userInfo)];
    if (auth_option) result.push(Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(auth_option.keyword), auth_option.auth_plugin, Object(_util__WEBPACK_IMPORTED_MODULE_10__["literalToSQL"])(auth_option.value));
    return result.filter(_util__WEBPACK_IMPORTED_MODULE_10__["hasVal"]).join(' ');
  }).join(', ');
  var sql = [Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(type), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(keyword), Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(ifNotExists), userAuthOptions];
  if (defaultRole) sql.push(Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(defaultRole.keyword), defaultRole.value.map(_command__WEBPACK_IMPORTED_MODULE_4__["grantUserOrRoleToSQL"]).join(', '));
  sql.push(Object(_util__WEBPACK_IMPORTED_MODULE_10__["commonOptionConnector"])(requireOption && requireOption.keyword, _expr__WEBPACK_IMPORTED_MODULE_1__["exprToSQL"], requireOption && requireOption.value));
  if (resourceOptions) sql.push(Object(_util__WEBPACK_IMPORTED_MODULE_10__["toUpper"])(resourceOptions.keyword), resourceOptions.value.map(function (resourceOption) {
    return Object(_expr__WEBPACK_IMPORTED_MODULE_1__["exprToSQL"])(resourceOption);
  }).join(' '));
  if (passwordOptions) passwordOptions.forEach(function (passwordOption) {
    return sql.push(Object(_util__WEBPACK_IMPORTED_MODULE_10__["commonOptionConnector"])(passwordOption.keyword, _expr__WEBPACK_IMPORTED_MODULE_1__["exprToSQL"], passwordOption.value));
  });
  sql.push(Object(_util__WEBPACK_IMPORTED_MODULE_10__["literalToSQL"])(lockOption), Object(_util__WEBPACK_IMPORTED_MODULE_10__["commentToSQL"])(comment), Object(_util__WEBPACK_IMPORTED_MODULE_10__["literalToSQL"])(attribute));
  return sql.filter(_util__WEBPACK_IMPORTED_MODULE_10__["hasVal"]).join(' ');
}
function createToSQL(stmt) {
  var keyword = stmt.keyword;
  var sql = '';
  switch (keyword.toLowerCase()) {
    case 'aggregate':
      sql = createAggregateToSQL(stmt);
      break;
    case 'table':
      sql = createTableToSQL(stmt);
      break;
    case 'trigger':
      sql = stmt.resource === 'constraint' ? createConstraintTriggerToSQL(stmt) : createTriggerToSQL(stmt);
      break;
    case 'extension':
      sql = createExtensionToSQL(stmt);
      break;
    case 'function':
      sql = createFunctionToSQL(stmt);
      break;
    case 'index':
      sql = createIndexToSQL(stmt);
      break;
    case 'sequence':
      sql = createSequenceToSQL(stmt);
      break;
    case 'database':
      sql = createDatabaseToSQL(stmt);
      break;
    case 'view':
      sql = createViewToSQL(stmt);
      break;
    case 'domain':
      sql = createDomainToSQL(stmt);
      break;
    case 'type':
      sql = createTypeToSQL(stmt);
      break;
    case 'user':
      sql = createUserToSQL(stmt);
      break;
    default:
      throw new Error("unknown create resource ".concat(keyword));
  }
  return sql;
}


/***/ }),

/***/ "./src/delete.js":
/*!***********************!*\
  !*** ./src/delete.js ***!
  \***********************/
/*! exports provided: deleteToSQL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteToSQL", function() { return deleteToSQL; });
/* harmony import */ var _column__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./column */ "./src/column.js");
/* harmony import */ var _expr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./expr */ "./src/expr.js");
/* harmony import */ var _limit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./limit */ "./src/limit.js");
/* harmony import */ var _tables__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tables */ "./src/tables.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util */ "./src/util.js");
/* harmony import */ var _with__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./with */ "./src/with.js");






function deleteToSQL(stmt) {
  var columns = stmt.columns,
    from = stmt.from,
    table = stmt.table,
    where = stmt.where,
    orderby = stmt.orderby,
    withInfo = stmt["with"],
    limit = stmt.limit;
  var clauses = [Object(_with__WEBPACK_IMPORTED_MODULE_5__["withToSQL"])(withInfo), 'DELETE'];
  var columnInfo = Object(_column__WEBPACK_IMPORTED_MODULE_0__["columnsToSQL"])(columns, from);
  clauses.push(columnInfo);
  if (Array.isArray(table)) {
    if (!(table.length === 1 && table[0].addition === true)) clauses.push(Object(_tables__WEBPACK_IMPORTED_MODULE_3__["tablesToSQL"])(table));
  }
  clauses.push(Object(_util__WEBPACK_IMPORTED_MODULE_4__["commonOptionConnector"])('FROM', _tables__WEBPACK_IMPORTED_MODULE_3__["tablesToSQL"], from));
  clauses.push(Object(_util__WEBPACK_IMPORTED_MODULE_4__["commonOptionConnector"])('WHERE', _expr__WEBPACK_IMPORTED_MODULE_1__["exprToSQL"], where));
  clauses.push(Object(_expr__WEBPACK_IMPORTED_MODULE_1__["orderOrPartitionByToSQL"])(orderby, 'order by'));
  clauses.push(Object(_limit__WEBPACK_IMPORTED_MODULE_2__["limitToSQL"])(limit));
  return clauses.filter(_util__WEBPACK_IMPORTED_MODULE_4__["hasVal"]).join(' ');
}


/***/ }),

/***/ "./src/exec.js":
/*!*********************!*\
  !*** ./src/exec.js ***!
  \*********************/
/*! exports provided: execToSQL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "execToSQL", function() { return execToSQL; });
/* harmony import */ var _expr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./expr */ "./src/expr.js");
/* harmony import */ var _tables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tables */ "./src/tables.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ "./src/util.js");



function execVariablesToSQL(stmt) {
  var name = stmt.name,
    value = stmt.value;
  var result = ["@".concat(name), '=', Object(_expr__WEBPACK_IMPORTED_MODULE_0__["exprToSQL"])(value)];
  return result.filter(_util__WEBPACK_IMPORTED_MODULE_2__["hasVal"]).join(' ');
}
function execToSQL(stmt) {
  var keyword = stmt.keyword,
    module = stmt.module,
    parameters = stmt.parameters;
  var result = [Object(_util__WEBPACK_IMPORTED_MODULE_2__["toUpper"])(keyword), Object(_tables__WEBPACK_IMPORTED_MODULE_1__["tableToSQL"])(module), (parameters || []).map(execVariablesToSQL).filter(_util__WEBPACK_IMPORTED_MODULE_2__["hasVal"]).join(', ')];
  return result.filter(_util__WEBPACK_IMPORTED_MODULE_2__["hasVal"]).join(' ');
}


/***/ }),

/***/ "./src/expr.js":
/*!*********************!*\
  !*** ./src/expr.js ***!
  \*********************/
/*! exports provided: exprToSQLConvertFn, exprToSQL, getExprListSQL, varToSQL, orderOrPartitionByToSQL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exprToSQLConvertFn", function() { return exprToSQLConvertFn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exprToSQL", function() { return exprToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getExprListSQL", function() { return getExprListSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "varToSQL", function() { return varToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "orderOrPartitionByToSQL", function() { return orderOrPartitionByToSQL; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/util.js");
/* harmony import */ var _alter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./alter */ "./src/alter.js");
/* harmony import */ var _aggregation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./aggregation */ "./src/aggregation.js");
/* harmony import */ var _assign__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assign */ "./src/assign.js");
/* harmony import */ var _binary__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./binary */ "./src/binary.js");
/* harmony import */ var _case__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./case */ "./src/case.js");
/* harmony import */ var _column__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./column */ "./src/column.js");
/* harmony import */ var _func__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./func */ "./src/func.js");
/* harmony import */ var _interval__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./interval */ "./src/interval.js");
/* harmony import */ var _json__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./json */ "./src/json.js");
/* harmony import */ var _select__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./select */ "./src/select.js");
/* harmony import */ var _show__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./show */ "./src/show.js");
/* harmony import */ var _array_struct__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./array-struct */ "./src/array-struct.js");
/* harmony import */ var _tables__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./tables */ "./src/tables.js");
/* harmony import */ var _union__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./union */ "./src/union.js");
/* harmony import */ var _window__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./window */ "./src/window.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
















var exprToSQLConvertFn = {
  alter: _alter__WEBPACK_IMPORTED_MODULE_1__["alterExprToSQL"],
  aggr_func: _aggregation__WEBPACK_IMPORTED_MODULE_2__["aggrToSQL"],
  any_value: _func__WEBPACK_IMPORTED_MODULE_7__["anyValueFuncToSQL"],
  window_func: _window__WEBPACK_IMPORTED_MODULE_15__["windowFuncToSQL"],
  'array': _array_struct__WEBPACK_IMPORTED_MODULE_12__["arrayStructExprToSQL"],
  assign: _assign__WEBPACK_IMPORTED_MODULE_3__["assignToSQL"],
  binary_expr: _binary__WEBPACK_IMPORTED_MODULE_4__["binaryToSQL"],
  "case": _case__WEBPACK_IMPORTED_MODULE_5__["caseToSQL"],
  cast: _func__WEBPACK_IMPORTED_MODULE_7__["castToSQL"],
  column_ref: _column__WEBPACK_IMPORTED_MODULE_6__["columnRefToSQL"],
  column_definition: _column__WEBPACK_IMPORTED_MODULE_6__["columnDefinitionToSQL"],
  datatype: _util__WEBPACK_IMPORTED_MODULE_0__["dataTypeToSQL"],
  extract: _func__WEBPACK_IMPORTED_MODULE_7__["extractFunToSQL"],
  flatten: _func__WEBPACK_IMPORTED_MODULE_7__["flattenFunToSQL"],
  fulltext_search: _column__WEBPACK_IMPORTED_MODULE_6__["fullTextSearchToSQL"],
  "function": _func__WEBPACK_IMPORTED_MODULE_7__["funcToSQL"],
  lambda: _func__WEBPACK_IMPORTED_MODULE_7__["lambdaToSQL"],
  insert: _union__WEBPACK_IMPORTED_MODULE_14__["unionToSQL"],
  interval: _interval__WEBPACK_IMPORTED_MODULE_8__["intervalToSQL"],
  json: _json__WEBPACK_IMPORTED_MODULE_9__["jsonExprToSQL"],
  show: _show__WEBPACK_IMPORTED_MODULE_11__["showToSQL"],
  struct: _array_struct__WEBPACK_IMPORTED_MODULE_12__["arrayStructExprToSQL"],
  tablefunc: _func__WEBPACK_IMPORTED_MODULE_7__["tablefuncFunToSQL"],
  tables: _tables__WEBPACK_IMPORTED_MODULE_13__["tablesToSQL"],
  unnest: _tables__WEBPACK_IMPORTED_MODULE_13__["unnestToSQL"],
  'window': _window__WEBPACK_IMPORTED_MODULE_15__["namedWindowExprListToSQL"]
};
function varToSQL(expr) {
  var _expr$prefix = expr.prefix,
    prefix = _expr$prefix === void 0 ? '@' : _expr$prefix,
    name = expr.name,
    members = expr.members,
    keyword = expr.keyword,
    quoted = expr.quoted,
    suffix = expr.suffix;
  var val = [];
  if (keyword) val.push(keyword);
  var varName = members && members.length > 0 ? "".concat(name, ".").concat(members.join('.')) : name;
  var result = "".concat(prefix || '').concat(varName);
  if (suffix) result += suffix;
  val.push(result);
  return [quoted, val.join(' '), quoted].filter(_util__WEBPACK_IMPORTED_MODULE_0__["hasVal"]).join('');
}
exprToSQLConvertFn["var"] = varToSQL;
function exprToSQL(exprOrigin) {
  if (!exprOrigin) return;
  var expr = exprOrigin;
  if (exprOrigin.ast) {
    var ast = expr.ast;
    Reflect.deleteProperty(expr, ast);
    for (var _i = 0, _Object$keys = Object.keys(ast); _i < _Object$keys.length; _i++) {
      var key = _Object$keys[_i];
      expr[key] = ast[key];
    }
  }
  return exprToSQLConvertFn[expr.type] ? exprToSQLConvertFn[expr.type](expr) : Object(_util__WEBPACK_IMPORTED_MODULE_0__["literalToSQL"])(expr);
}
function unaryToSQL(unarExpr) {
  var operator = unarExpr.operator,
    parentheses = unarExpr.parentheses,
    expr = unarExpr.expr;
  var space = operator === '-' || operator === '+' || operator === '~' || operator === '!' ? '' : ' ';
  var str = "".concat(operator).concat(space).concat(exprToSQL(expr));
  return parentheses ? "(".concat(str, ")") : str;
}
function getExprListSQL(exprList) {
  if (!exprList) return [];
  return exprList.map(exprToSQL);
}
exprToSQLConvertFn.expr_list = function (expr) {
  var str = getExprListSQL(expr.value);
  return expr.parentheses ? "(".concat(str.join(', '), ")") : str;
};
exprToSQLConvertFn.select = function (expr) {
  var str = _typeof(expr._next) === 'object' ? Object(_union__WEBPACK_IMPORTED_MODULE_14__["unionToSQL"])(expr) : Object(_select__WEBPACK_IMPORTED_MODULE_10__["selectToSQL"])(expr);
  return expr.parentheses ? "(".concat(str, ")") : str;
};
exprToSQLConvertFn.unary_expr = unaryToSQL;
function orderOrPartitionByToSQL(expr, prefix) {
  if (!Array.isArray(expr)) return '';
  var expressions = [];
  var upperPrefix = Object(_util__WEBPACK_IMPORTED_MODULE_0__["toUpper"])(prefix);
  switch (upperPrefix) {
    case 'ORDER BY':
      expressions = expr.map(function (info) {
        return [exprToSQL(info.expr), info.type || 'ASC', Object(_util__WEBPACK_IMPORTED_MODULE_0__["toUpper"])(info.nulls)].filter(_util__WEBPACK_IMPORTED_MODULE_0__["hasVal"]).join(' ');
      });
      break;
    case 'PARTITION BY':
      expressions = expr.map(function (info) {
        return exprToSQL(info.expr);
      });
      break;
    default:
      expressions = expr.map(function (info) {
        return exprToSQL(info.expr);
      });
      break;
  }
  return Object(_util__WEBPACK_IMPORTED_MODULE_0__["connector"])(upperPrefix, expressions.join(', '));
}


/***/ }),

/***/ "./src/func.js":
/*!*********************!*\
  !*** ./src/func.js ***!
  \*********************/
/*! exports provided: anyValueFuncToSQL, castToSQL, extractFunToSQL, flattenFunToSQL, funcToSQL, lambdaToSQL, tablefuncFunToSQL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "anyValueFuncToSQL", function() { return anyValueFuncToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "castToSQL", function() { return castToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractFunToSQL", function() { return extractFunToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flattenFunToSQL", function() { return flattenFunToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "funcToSQL", function() { return funcToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lambdaToSQL", function() { return lambdaToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tablefuncFunToSQL", function() { return tablefuncFunToSQL; });
/* harmony import */ var _expr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./expr */ "./src/expr.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/util.js");
/* harmony import */ var _over__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./over */ "./src/over.js");



function anyValueFuncToSQL(stmt) {
  var args = stmt.args,
    type = stmt.type,
    over = stmt.over;
  var expr = args.expr,
    having = args.having;
  var sql = "".concat(Object(_util__WEBPACK_IMPORTED_MODULE_1__["toUpper"])(type), "(").concat(Object(_expr__WEBPACK_IMPORTED_MODULE_0__["exprToSQL"])(expr));
  if (having) sql = "".concat(sql, " HAVING ").concat(Object(_util__WEBPACK_IMPORTED_MODULE_1__["toUpper"])(having.prefix), " ").concat(Object(_expr__WEBPACK_IMPORTED_MODULE_0__["exprToSQL"])(having.expr));
  sql = "".concat(sql, ")");
  var overStr = Object(_over__WEBPACK_IMPORTED_MODULE_2__["overToSQL"])(over);
  return [sql, overStr].filter(_util__WEBPACK_IMPORTED_MODULE_1__["hasVal"]).join(' ');
}
function arrayDimensionToSymbol(target) {
  if (!target || !target.array) return '';
  switch (target.array) {
    case 'one':
      return '[]';
    case 'two':
      return '[][]';
  }
}
function castToSQL(expr) {
  var _expr$arrows = expr.arrows,
    arrows = _expr$arrows === void 0 ? [] : _expr$arrows,
    collate = expr.collate,
    target = expr.target,
    expression = expr.expr,
    keyword = expr.keyword,
    symbol = expr.symbol,
    alias = expr.as,
    _expr$properties = expr.properties,
    properties = _expr$properties === void 0 ? [] : _expr$properties;
  var length = target.length,
    dataType = target.dataType,
    parentheses = target.parentheses,
    quoted = target.quoted,
    scale = target.scale,
    dataTypeSuffix = target.suffix,
    targetExpr = target.expr;
  var str = targetExpr ? Object(_expr__WEBPACK_IMPORTED_MODULE_0__["exprToSQL"])(targetExpr) : '';
  if (length != null) str = scale ? "".concat(length, ", ").concat(scale) : length;
  if (parentheses) str = "(".concat(str, ")");
  if (dataTypeSuffix && dataTypeSuffix.length) str += " ".concat(dataTypeSuffix.join(' '));
  var prefix = Object(_expr__WEBPACK_IMPORTED_MODULE_0__["exprToSQL"])(expression);
  var symbolChar = '::';
  var suffix = '';
  if (symbol === 'as') {
    prefix = "".concat(Object(_util__WEBPACK_IMPORTED_MODULE_1__["toUpper"])(keyword), "(").concat(prefix);
    suffix = ')';
    symbolChar = " ".concat(symbol.toUpperCase(), " ");
  }
  suffix += arrows.map(function (arrow, index) {
    return Object(_util__WEBPACK_IMPORTED_MODULE_1__["commonOptionConnector"])(arrow, _util__WEBPACK_IMPORTED_MODULE_1__["literalToSQL"], properties[index]);
  }).join(' ');
  if (alias) suffix += " AS ".concat(Object(_util__WEBPACK_IMPORTED_MODULE_1__["identifierToSql"])(alias));
  if (collate) suffix += " ".concat(Object(_util__WEBPACK_IMPORTED_MODULE_1__["commonTypeValue"])(collate).join(' '));
  var arrayDimension = arrayDimensionToSymbol(target);
  var result = [prefix, symbolChar, quoted, dataType, quoted, arrayDimension, str, suffix];
  return result.filter(_util__WEBPACK_IMPORTED_MODULE_1__["hasVal"]).join('');
}
function extractFunToSQL(stmt) {
  var args = stmt.args,
    type = stmt.type;
  var field = args.field,
    castType = args.cast_type,
    source = args.source;
  var result = ["".concat(Object(_util__WEBPACK_IMPORTED_MODULE_1__["toUpper"])(type), "(").concat(Object(_util__WEBPACK_IMPORTED_MODULE_1__["toUpper"])(field)), 'FROM', Object(_util__WEBPACK_IMPORTED_MODULE_1__["toUpper"])(castType), Object(_expr__WEBPACK_IMPORTED_MODULE_0__["exprToSQL"])(source)];
  return "".concat(result.filter(_util__WEBPACK_IMPORTED_MODULE_1__["hasVal"]).join(' '), ")");
}
function flattenArgToSQL(arg) {
  if (!arg) return '';
  var type = arg.type,
    symbol = arg.symbol,
    value = arg.value;
  var result = [Object(_util__WEBPACK_IMPORTED_MODULE_1__["toUpper"])(type), symbol, Object(_expr__WEBPACK_IMPORTED_MODULE_0__["exprToSQL"])(value)];
  return result.filter(_util__WEBPACK_IMPORTED_MODULE_1__["hasVal"]).join(' ');
}
function flattenFunToSQL(stmt) {
  var args = stmt.args,
    type = stmt.type;
  var keys = ['input', 'path', 'outer', 'recursive', 'mode'];
  var argsStr = keys.map(function (key) {
    return flattenArgToSQL(args[key]);
  }).filter(_util__WEBPACK_IMPORTED_MODULE_1__["hasVal"]).join(', ');
  return "".concat(Object(_util__WEBPACK_IMPORTED_MODULE_1__["toUpper"])(type), "(").concat(argsStr, ")");
}
function funcToSQL(expr) {
  var args = expr.args,
    name = expr.name,
    args_parentheses = expr.args_parentheses,
    parentheses = expr.parentheses,
    over = expr.over,
    collate = expr.collate,
    suffix = expr.suffix;
  var collateStr = Object(_util__WEBPACK_IMPORTED_MODULE_1__["commonTypeValue"])(collate).join(' ');
  var overStr = Object(_over__WEBPACK_IMPORTED_MODULE_2__["overToSQL"])(over);
  var suffixStr = Object(_expr__WEBPACK_IMPORTED_MODULE_0__["exprToSQL"])(suffix);
  var funcName = [Object(_util__WEBPACK_IMPORTED_MODULE_1__["literalToSQL"])(name.schema), name.name.map(_util__WEBPACK_IMPORTED_MODULE_1__["literalToSQL"]).join('.')].filter(_util__WEBPACK_IMPORTED_MODULE_1__["hasVal"]).join('.');
  if (!args) return [funcName, overStr].filter(_util__WEBPACK_IMPORTED_MODULE_1__["hasVal"]).join(' ');
  var separator = expr.separator || ', ';
  if (Object(_util__WEBPACK_IMPORTED_MODULE_1__["toUpper"])(funcName) === 'TRIM') separator = ' ';
  var str = [funcName];
  str.push(args_parentheses === false ? ' ' : '(');
  str.push(Object(_expr__WEBPACK_IMPORTED_MODULE_0__["exprToSQL"])(args).join(separator));
  if (args_parentheses !== false) str.push(')');
  str = [str.join(''), suffixStr].filter(_util__WEBPACK_IMPORTED_MODULE_1__["hasVal"]).join(' ');
  return [parentheses ? "(".concat(str, ")") : str, collateStr, overStr].filter(_util__WEBPACK_IMPORTED_MODULE_1__["hasVal"]).join(' ');
}
function tablefuncFunToSQL(expr) {
  var as = expr.as,
    name = expr.name,
    args = expr.args;
  var funcName = [Object(_util__WEBPACK_IMPORTED_MODULE_1__["literalToSQL"])(name.schema), name.name.map(_util__WEBPACK_IMPORTED_MODULE_1__["literalToSQL"]).join('.')].filter(_util__WEBPACK_IMPORTED_MODULE_1__["hasVal"]).join('.');
  var result = ["".concat(funcName, "(").concat(Object(_expr__WEBPACK_IMPORTED_MODULE_0__["exprToSQL"])(args).join(', '), ")"), 'AS', funcToSQL(as)];
  return result.join(' ');
}
function lambdaToSQL(stmt) {
  var args = stmt.args,
    expr = stmt.expr;
  var value = args.value,
    parentheses = args.parentheses;
  var argsList = value.map(_expr__WEBPACK_IMPORTED_MODULE_0__["exprToSQL"]).join(', ');
  return [parentheses ? "(".concat(argsList, ")") : argsList, '->', Object(_expr__WEBPACK_IMPORTED_MODULE_0__["exprToSQL"])(expr)].join(' ');
}


/***/ }),

/***/ "./src/index-definition.js":
/*!*********************************!*\
  !*** ./src/index-definition.js ***!
  \*********************************/
/*! exports provided: indexDefinitionToSQL, indexTypeToSQL, indexOptionToSQL, indexOptionListToSQL, indexTypeAndOptionToSQL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "indexDefinitionToSQL", function() { return indexDefinitionToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "indexTypeToSQL", function() { return indexTypeToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "indexOptionToSQL", function() { return indexOptionToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "indexOptionListToSQL", function() { return indexOptionListToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "indexTypeAndOptionToSQL", function() { return indexTypeAndOptionToSQL; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/util.js");
/* harmony import */ var _expr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./expr */ "./src/expr.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }


function indexTypeToSQL(indexType) {
  if (!indexType) return [];
  var keyword = indexType.keyword,
    type = indexType.type;
  return [keyword.toUpperCase(), Object(_util__WEBPACK_IMPORTED_MODULE_0__["toUpper"])(type)];
}
function indexOptionToSQL(indexOpt) {
  if (!indexOpt) return;
  var type = indexOpt.type,
    expr = indexOpt.expr,
    symbol = indexOpt.symbol;
  var upperType = type.toUpperCase();
  var indexOptArray = [];
  indexOptArray.push(upperType);
  switch (upperType) {
    case 'KEY_BLOCK_SIZE':
      if (symbol) indexOptArray.push(symbol);
      indexOptArray.push(Object(_util__WEBPACK_IMPORTED_MODULE_0__["literalToSQL"])(expr));
      break;
    case 'BTREE':
    case 'HASH':
      indexOptArray.length = 0;
      indexOptArray.push.apply(indexOptArray, _toConsumableArray(indexTypeToSQL(indexOpt)));
      break;
    case 'WITH PARSER':
      indexOptArray.push(expr);
      break;
    case 'VISIBLE':
    case 'INVISIBLE':
      break;
    case 'COMMENT':
      indexOptArray.shift();
      indexOptArray.push(Object(_util__WEBPACK_IMPORTED_MODULE_0__["commentToSQL"])(indexOpt));
      break;
    case 'DATA_COMPRESSION':
      indexOptArray.push(symbol, Object(_util__WEBPACK_IMPORTED_MODULE_0__["toUpper"])(expr.value), Object(_util__WEBPACK_IMPORTED_MODULE_0__["onPartitionsToSQL"])(expr.on));
      break;
    default:
      indexOptArray.push(symbol, Object(_util__WEBPACK_IMPORTED_MODULE_0__["literalToSQL"])(expr));
      break;
  }
  return indexOptArray.filter(_util__WEBPACK_IMPORTED_MODULE_0__["hasVal"]).join(' ');
}
function indexOptionListToSQL(indexOptList) {
  if (!indexOptList) return [];
  return indexOptList.map(indexOptionToSQL);
}
function indexTypeAndOptionToSQL(indexDefinition) {
  var constraintType = indexDefinition.constraint_type,
    indexType = indexDefinition.index_type,
    _indexDefinition$inde = indexDefinition.index_options,
    indexOptions = _indexDefinition$inde === void 0 ? [] : _indexDefinition$inde,
    definition = indexDefinition.definition,
    on = indexDefinition.on,
    withExpr = indexDefinition["with"];
  var dataType = [];
  dataType.push.apply(dataType, _toConsumableArray(indexTypeToSQL(indexType)));
  if (definition && definition.length) {
    var definitionSQL = Object(_util__WEBPACK_IMPORTED_MODULE_0__["toUpper"])(constraintType) === 'CHECK' ? "(".concat(Object(_expr__WEBPACK_IMPORTED_MODULE_1__["exprToSQL"])(definition[0]), ")") : "(".concat(definition.map(function (col) {
      return Object(_expr__WEBPACK_IMPORTED_MODULE_1__["exprToSQL"])(col);
    }).join(', '), ")");
    dataType.push(definitionSQL);
  }
  dataType.push(indexOptionListToSQL(indexOptions).join(' '));
  if (withExpr) dataType.push("WITH (".concat(indexOptionListToSQL(withExpr).join(', '), ")"));
  if (on) dataType.push("ON [".concat(on, "]"));
  return dataType;
}
function indexDefinitionToSQL(indexDefinition) {
  var indexSQL = [];
  var keyword = indexDefinition.keyword,
    index = indexDefinition.index;
  indexSQL.push(Object(_util__WEBPACK_IMPORTED_MODULE_0__["toUpper"])(keyword));
  indexSQL.push(index);
  indexSQL.push.apply(indexSQL, _toConsumableArray(indexTypeAndOptionToSQL(indexDefinition)));
  return indexSQL.filter(_util__WEBPACK_IMPORTED_MODULE_0__["hasVal"]).join(' ');
}


/***/ }),

/***/ "./src/insert.js":
/*!***********************!*\
  !*** ./src/insert.js ***!
  \***********************/
/*! exports provided: conflictToSQL, insertToSQL, valuesToSQL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "conflictToSQL", function() { return conflictToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insertToSQL", function() { return insertToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "valuesToSQL", function() { return valuesToSQL; });
/* harmony import */ var _tables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tables */ "./src/tables.js");
/* harmony import */ var _expr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./expr */ "./src/expr.js");
/* harmony import */ var _column__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./column */ "./src/column.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util */ "./src/util.js");
/* harmony import */ var _select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./select */ "./src/select.js");
/* harmony import */ var _update__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./update */ "./src/update.js");







/**
 * @param {Array} values
 * @return {string}
 */
function valuesToSQL(values) {
  if (values.type === 'select') return Object(_select__WEBPACK_IMPORTED_MODULE_4__["selectToSQL"])(values);
  var clauses = values.map(_expr__WEBPACK_IMPORTED_MODULE_1__["exprToSQL"]);
  return "(".concat(clauses.join('), ('), ")");
}
function partitionToSQL(partition) {
  if (!partition) return '';
  var partitionArr = ['PARTITION', '('];
  if (Array.isArray(partition)) {
    partitionArr.push(partition.map(_util__WEBPACK_IMPORTED_MODULE_3__["identifierToSql"]).join(', '));
  } else {
    var value = partition.value;
    partitionArr.push(value.map(_expr__WEBPACK_IMPORTED_MODULE_1__["exprToSQL"]).join(', '));
  }
  partitionArr.push(')');
  return partitionArr.filter(_util__WEBPACK_IMPORTED_MODULE_3__["hasVal"]).join('');
}
function conflictTargetToSQL(conflictTarget) {
  if (!conflictTarget) return '';
  var type = conflictTarget.type;
  switch (type) {
    case 'column':
      return "(".concat(conflictTarget.expr.map(_column__WEBPACK_IMPORTED_MODULE_2__["columnRefToSQL"]).join(', '), ")");
  }
}
function conflictActionToSQL(conflictAction) {
  var expr = conflictAction.expr,
    keyword = conflictAction.keyword;
  var type = expr.type;
  var result = [Object(_util__WEBPACK_IMPORTED_MODULE_3__["toUpper"])(keyword)];
  switch (type) {
    case 'origin':
      result.push(Object(_util__WEBPACK_IMPORTED_MODULE_3__["literalToSQL"])(expr));
      break;
    case 'update':
      result.push('UPDATE', Object(_util__WEBPACK_IMPORTED_MODULE_3__["commonOptionConnector"])('SET', _update__WEBPACK_IMPORTED_MODULE_5__["setToSQL"], expr.set), Object(_util__WEBPACK_IMPORTED_MODULE_3__["commonOptionConnector"])('WHERE', _expr__WEBPACK_IMPORTED_MODULE_1__["exprToSQL"], expr.where));
      break;
  }
  return result.filter(_util__WEBPACK_IMPORTED_MODULE_3__["hasVal"]).join(' ');
}
function conflictToSQL(conflict) {
  if (!conflict) return '';
  var action = conflict.action,
    target = conflict.target;
  var result = [conflictTargetToSQL(target), conflictActionToSQL(action)];
  return result.filter(_util__WEBPACK_IMPORTED_MODULE_3__["hasVal"]).join(' ');
}
function insertToSQL(stmt) {
  var table = stmt.table,
    type = stmt.type,
    _stmt$prefix = stmt.prefix,
    prefix = _stmt$prefix === void 0 ? 'into' : _stmt$prefix,
    columns = stmt.columns,
    conflict = stmt.conflict,
    values = stmt.values,
    where = stmt.where,
    onDuplicateUpdate = stmt.on_duplicate_update,
    partition = stmt.partition,
    returning = stmt.returning,
    set = stmt.set;
  var _ref = onDuplicateUpdate || {},
    keyword = _ref.keyword,
    duplicateSet = _ref.set;
  var clauses = [Object(_util__WEBPACK_IMPORTED_MODULE_3__["toUpper"])(type), Object(_util__WEBPACK_IMPORTED_MODULE_3__["toUpper"])(prefix), Object(_tables__WEBPACK_IMPORTED_MODULE_0__["tablesToSQL"])(table), partitionToSQL(partition)];
  if (Array.isArray(columns)) clauses.push("(".concat(columns.map(_util__WEBPACK_IMPORTED_MODULE_3__["literalToSQL"]).join(', '), ")"));
  clauses.push(Object(_util__WEBPACK_IMPORTED_MODULE_3__["commonOptionConnector"])(Array.isArray(values) ? 'VALUES' : '', valuesToSQL, values));
  clauses.push(Object(_util__WEBPACK_IMPORTED_MODULE_3__["commonOptionConnector"])('ON CONFLICT', conflictToSQL, conflict));
  clauses.push(Object(_util__WEBPACK_IMPORTED_MODULE_3__["commonOptionConnector"])('SET', _update__WEBPACK_IMPORTED_MODULE_5__["setToSQL"], set));
  clauses.push(Object(_util__WEBPACK_IMPORTED_MODULE_3__["commonOptionConnector"])('WHERE', _expr__WEBPACK_IMPORTED_MODULE_1__["exprToSQL"], where));
  clauses.push(Object(_util__WEBPACK_IMPORTED_MODULE_3__["returningToSQL"])(returning));
  clauses.push(Object(_util__WEBPACK_IMPORTED_MODULE_3__["commonOptionConnector"])(keyword, _update__WEBPACK_IMPORTED_MODULE_5__["setToSQL"], duplicateSet));
  return clauses.filter(_util__WEBPACK_IMPORTED_MODULE_3__["hasVal"]).join(' ');
}


/***/ }),

/***/ "./src/interval.js":
/*!*************************!*\
  !*** ./src/interval.js ***!
  \*************************/
/*! exports provided: intervalToSQL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "intervalToSQL", function() { return intervalToSQL; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/util.js");
/* harmony import */ var _expr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./expr */ "./src/expr.js");


function intervalToSQL(intervalExpr) {
  var expr = intervalExpr.expr,
    unit = intervalExpr.unit;
  var result = ['INTERVAL', Object(_expr__WEBPACK_IMPORTED_MODULE_1__["exprToSQL"])(expr), Object(_util__WEBPACK_IMPORTED_MODULE_0__["toUpper"])(unit)];
  return result.filter(_util__WEBPACK_IMPORTED_MODULE_0__["hasVal"]).join(' ');
}


/***/ }),

/***/ "./src/json.js":
/*!*********************!*\
  !*** ./src/json.js ***!
  \*********************/
/*! exports provided: jsonExprToSQL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jsonExprToSQL", function() { return jsonExprToSQL; });
/* harmony import */ var _expr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./expr */ "./src/expr.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/util.js");


function jsonExprToSQL(expr) {
  var keyword = expr.keyword,
    exprList = expr.expr_list;
  var result = [Object(_util__WEBPACK_IMPORTED_MODULE_1__["toUpper"])(keyword), exprList.map(function (exprItem) {
    return Object(_expr__WEBPACK_IMPORTED_MODULE_0__["exprToSQL"])(exprItem);
  }).join(', ')].join(' ');
  return result;
}


/***/ }),

/***/ "./src/limit.js":
/*!**********************!*\
  !*** ./src/limit.js ***!
  \**********************/
/*! exports provided: limitToSQL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "limitToSQL", function() { return limitToSQL; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/util.js");
/* harmony import */ var _expr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./expr */ "./src/expr.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }


function composePrefixValSuffix(stmt) {
  if (!stmt) return [];
  return [Object(_util__WEBPACK_IMPORTED_MODULE_0__["toUpper"])(stmt.prefix), Object(_expr__WEBPACK_IMPORTED_MODULE_1__["exprToSQL"])(stmt.value), Object(_util__WEBPACK_IMPORTED_MODULE_0__["toUpper"])(stmt.suffix)];
}
function fetchOffsetToSQL(stmt) {
  var fetch = stmt.fetch,
    offset = stmt.offset;
  var result = [].concat(_toConsumableArray(composePrefixValSuffix(offset)), _toConsumableArray(composePrefixValSuffix(fetch)));
  return result.filter(_util__WEBPACK_IMPORTED_MODULE_0__["hasVal"]).join(' ');
}
function limitOffsetToSQL(limit) {
  var seperator = limit.seperator,
    value = limit.value;
  if (value.length === 1 && seperator === 'offset') return Object(_util__WEBPACK_IMPORTED_MODULE_0__["connector"])('OFFSET', Object(_expr__WEBPACK_IMPORTED_MODULE_1__["exprToSQL"])(value[0]));
  return Object(_util__WEBPACK_IMPORTED_MODULE_0__["connector"])('LIMIT', value.map(_expr__WEBPACK_IMPORTED_MODULE_1__["exprToSQL"]).join("".concat(seperator === 'offset' ? ' ' : '').concat(Object(_util__WEBPACK_IMPORTED_MODULE_0__["toUpper"])(seperator), " ")));
}
function limitToSQL(limit) {
  if (!limit) return '';
  if (limit.fetch) return fetchOffsetToSQL(limit);
  return limitOffsetToSQL(limit);
}


/***/ }),

/***/ "./src/over.js":
/*!*********************!*\
  !*** ./src/over.js ***!
  \*********************/
/*! exports provided: overToSQL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "overToSQL", function() { return overToSQL; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/util.js");
/* harmony import */ var _expr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./expr */ "./src/expr.js");
/* harmony import */ var _window__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./window */ "./src/window.js");



function overToSQL(over) {
  if (!over) return;
  var asWindowSpec = over.as_window_specification,
    expr = over.expr,
    keyword = over.keyword,
    type = over.type,
    parentheses = over.parentheses;
  var upperType = Object(_util__WEBPACK_IMPORTED_MODULE_0__["toUpper"])(type);
  if (upperType === 'WINDOW') return "OVER ".concat(Object(_window__WEBPACK_IMPORTED_MODULE_2__["asWindowSpecToSQL"])(asWindowSpec));
  if (upperType === 'ON UPDATE') {
    var onUpdate = "".concat(Object(_util__WEBPACK_IMPORTED_MODULE_0__["toUpper"])(type), " ").concat(Object(_util__WEBPACK_IMPORTED_MODULE_0__["toUpper"])(keyword));
    var args = Object(_expr__WEBPACK_IMPORTED_MODULE_1__["exprToSQL"])(expr) || [];
    if (parentheses) onUpdate = "".concat(onUpdate, "(").concat(args.join(', '), ")");
    return onUpdate;
  }
  throw new Error('unknown over type');
}


/***/ }),

/***/ "./src/parser.all.js":
/*!***************************!*\
  !*** ./src/parser.all.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pegjs_athena_pegjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pegjs/athena.pegjs */ "./pegjs/athena.pegjs");
/* harmony import */ var _pegjs_athena_pegjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_pegjs_athena_pegjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _pegjs_bigquery_pegjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../pegjs/bigquery.pegjs */ "./pegjs/bigquery.pegjs");
/* harmony import */ var _pegjs_bigquery_pegjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_pegjs_bigquery_pegjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _pegjs_db2_pegjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pegjs/db2.pegjs */ "./pegjs/db2.pegjs");
/* harmony import */ var _pegjs_db2_pegjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_pegjs_db2_pegjs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _pegjs_flinksql_pegjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../pegjs/flinksql.pegjs */ "./pegjs/flinksql.pegjs");
/* harmony import */ var _pegjs_flinksql_pegjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_pegjs_flinksql_pegjs__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _pegjs_hive_pegjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../pegjs/hive.pegjs */ "./pegjs/hive.pegjs");
/* harmony import */ var _pegjs_hive_pegjs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_pegjs_hive_pegjs__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _pegjs_mysql_pegjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../pegjs/mysql.pegjs */ "./pegjs/mysql.pegjs");
/* harmony import */ var _pegjs_mysql_pegjs__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_pegjs_mysql_pegjs__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _pegjs_mariadb_pegjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../pegjs/mariadb.pegjs */ "./pegjs/mariadb.pegjs");
/* harmony import */ var _pegjs_mariadb_pegjs__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_pegjs_mariadb_pegjs__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _pegjs_noql_pegjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../pegjs/noql.pegjs */ "./pegjs/noql.pegjs");
/* harmony import */ var _pegjs_noql_pegjs__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_pegjs_noql_pegjs__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _pegjs_postgresql_pegjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../pegjs/postgresql.pegjs */ "./pegjs/postgresql.pegjs");
/* harmony import */ var _pegjs_postgresql_pegjs__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_pegjs_postgresql_pegjs__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _pegjs_redshift_pegjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../pegjs/redshift.pegjs */ "./pegjs/redshift.pegjs");
/* harmony import */ var _pegjs_redshift_pegjs__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_pegjs_redshift_pegjs__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _pegjs_sqlite_pegjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../pegjs/sqlite.pegjs */ "./pegjs/sqlite.pegjs");
/* harmony import */ var _pegjs_sqlite_pegjs__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_pegjs_sqlite_pegjs__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _pegjs_transactsql_pegjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../pegjs/transactsql.pegjs */ "./pegjs/transactsql.pegjs");
/* harmony import */ var _pegjs_transactsql_pegjs__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_pegjs_transactsql_pegjs__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _pegjs_snowflake_pegjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../pegjs/snowflake.pegjs */ "./pegjs/snowflake.pegjs");
/* harmony import */ var _pegjs_snowflake_pegjs__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_pegjs_snowflake_pegjs__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _pegjs_trino_pegjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../pegjs/trino.pegjs */ "./pegjs/trino.pegjs");
/* harmony import */ var _pegjs_trino_pegjs__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_pegjs_trino_pegjs__WEBPACK_IMPORTED_MODULE_13__);














/* harmony default export */ __webpack_exports__["default"] = ({
  athena: _pegjs_athena_pegjs__WEBPACK_IMPORTED_MODULE_0__["parse"],
  bigquery: _pegjs_bigquery_pegjs__WEBPACK_IMPORTED_MODULE_1__["parse"],
  db2: _pegjs_db2_pegjs__WEBPACK_IMPORTED_MODULE_2__["parse"],
  flinksql: _pegjs_flinksql_pegjs__WEBPACK_IMPORTED_MODULE_3__["parse"],
  hive: _pegjs_hive_pegjs__WEBPACK_IMPORTED_MODULE_4__["parse"],
  mysql: _pegjs_mysql_pegjs__WEBPACK_IMPORTED_MODULE_5__["parse"],
  mariadb: _pegjs_mariadb_pegjs__WEBPACK_IMPORTED_MODULE_6__["parse"],
  noql: _pegjs_noql_pegjs__WEBPACK_IMPORTED_MODULE_7__["parse"],
  postgresql: _pegjs_postgresql_pegjs__WEBPACK_IMPORTED_MODULE_8__["parse"],
  redshift: _pegjs_redshift_pegjs__WEBPACK_IMPORTED_MODULE_9__["parse"],
  snowflake: _pegjs_snowflake_pegjs__WEBPACK_IMPORTED_MODULE_12__["parse"],
  sqlite: _pegjs_sqlite_pegjs__WEBPACK_IMPORTED_MODULE_10__["parse"],
  transactsql: _pegjs_transactsql_pegjs__WEBPACK_IMPORTED_MODULE_11__["parse"],
  trino: _pegjs_trino_pegjs__WEBPACK_IMPORTED_MODULE_13__["parse"]
});

/***/ }),

/***/ "./src/parser.js":
/*!***********************!*\
  !*** ./src/parser.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _expr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./expr */ "./src/expr.js");
/* harmony import */ var _parser_all__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parser.all */ "./src/parser.all.js");
/* harmony import */ var _sql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sql */ "./src/sql.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util */ "./src/util.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }




var Parser = /*#__PURE__*/function () {
  function Parser() {
    _classCallCheck(this, Parser);
  }
  return _createClass(Parser, [{
    key: "astify",
    value: function astify(sql) {
      var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _util__WEBPACK_IMPORTED_MODULE_3__["DEFAULT_OPT"];
      var astInfo = this.parse(sql, opt);
      return astInfo && astInfo.ast;
    }
  }, {
    key: "sqlify",
    value: function sqlify(ast) {
      var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _util__WEBPACK_IMPORTED_MODULE_3__["DEFAULT_OPT"];
      Object(_util__WEBPACK_IMPORTED_MODULE_3__["setParserOpt"])(opt);
      return Object(_sql__WEBPACK_IMPORTED_MODULE_2__["default"])(ast, opt);
    }
  }, {
    key: "exprToSQL",
    value: function exprToSQL(expr) {
      var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _util__WEBPACK_IMPORTED_MODULE_3__["DEFAULT_OPT"];
      Object(_util__WEBPACK_IMPORTED_MODULE_3__["setParserOpt"])(opt);
      return Object(_expr__WEBPACK_IMPORTED_MODULE_0__["exprToSQL"])(expr);
    }
  }, {
    key: "parse",
    value: function parse(sql) {
      var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _util__WEBPACK_IMPORTED_MODULE_3__["DEFAULT_OPT"];
      var _opt$database = opt.database,
        database = _opt$database === void 0 ?  false || 'mysql' : _opt$database;
      Object(_util__WEBPACK_IMPORTED_MODULE_3__["setParserOpt"])(opt);
      var typeCase = database.toLowerCase();
      if (_parser_all__WEBPACK_IMPORTED_MODULE_1__["default"][typeCase]) return _parser_all__WEBPACK_IMPORTED_MODULE_1__["default"][typeCase](opt.trimQuery === false ? sql : sql.trim(), opt.parseOptions || _util__WEBPACK_IMPORTED_MODULE_3__["DEFAULT_OPT"].parseOptions);
      throw new Error("".concat(database, " is not supported currently"));
    }
  }, {
    key: "whiteListCheck",
    value: function whiteListCheck(sql, whiteList) {
      var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _util__WEBPACK_IMPORTED_MODULE_3__["DEFAULT_OPT"];
      if (!whiteList || whiteList.length === 0) return;
      var _opt$type = opt.type,
        type = _opt$type === void 0 ? 'table' : _opt$type;
      if (!this["".concat(type, "List")] || typeof this["".concat(type, "List")] !== 'function') throw new Error("".concat(type, " is not valid check mode"));
      var checkFun = this["".concat(type, "List")].bind(this);
      var authorityList = checkFun(sql, opt);
      var hasAuthority = true;
      var denyInfo = '';
      var _iterator = _createForOfIteratorHelper(authorityList),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var authority = _step.value;
          var hasCorrespondingAuthority = false;
          var _iterator2 = _createForOfIteratorHelper(whiteList),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var whiteAuthority = _step2.value;
              var regex = new RegExp(whiteAuthority, 'i');
              if (regex.test(authority)) {
                hasCorrespondingAuthority = true;
                break;
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
          if (!hasCorrespondingAuthority) {
            denyInfo = authority;
            hasAuthority = false;
            break;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (!hasAuthority) throw new Error("authority = '".concat(denyInfo, "' is required in ").concat(type, " whiteList to execute SQL = '").concat(sql, "'"));
    }
  }, {
    key: "tableList",
    value: function tableList(sql, opt) {
      var astInfo = this.parse(sql, opt);
      return astInfo && astInfo.tableList;
    }
  }, {
    key: "columnList",
    value: function columnList(sql, opt) {
      var astInfo = this.parse(sql, opt);
      return astInfo && astInfo.columnList;
    }
  }]);
}();
/* harmony default export */ __webpack_exports__["default"] = (Parser);

/***/ }),

/***/ "./src/proc.js":
/*!*********************!*\
  !*** ./src/proc.js ***!
  \*********************/
/*! exports provided: procToSQL, returnToSQL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "procToSQL", function() { return procToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "returnToSQL", function() { return returnToSQL; });
/* harmony import */ var _assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assign */ "./src/assign.js");
/* harmony import */ var _expr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./expr */ "./src/expr.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ "./src/util.js");



function returnToSQL(stmt) {
  var type = stmt.type,
    expr = stmt.expr;
  return [Object(_util__WEBPACK_IMPORTED_MODULE_2__["toUpper"])(type), Object(_expr__WEBPACK_IMPORTED_MODULE_1__["exprToSQL"])(expr)].join(' ');
}
function procToSQL(expr) {
  var stmt = expr.stmt;
  switch (stmt.type) {
    case 'assign':
      return Object(_assign__WEBPACK_IMPORTED_MODULE_0__["assignToSQL"])(stmt);
    case 'return':
      return returnToSQL(stmt);
  }
}


/***/ }),

/***/ "./src/select.js":
/*!***********************!*\
  !*** ./src/select.js ***!
  \***********************/
/*! exports provided: selectIntoToSQL, selectToSQL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectIntoToSQL", function() { return selectIntoToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectToSQL", function() { return selectToSQL; });
/* harmony import */ var _expr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./expr */ "./src/expr.js");
/* harmony import */ var _column__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./column */ "./src/column.js");
/* harmony import */ var _limit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./limit */ "./src/limit.js");
/* harmony import */ var _with__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./with */ "./src/with.js");
/* harmony import */ var _tables__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tables */ "./src/tables.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util */ "./src/util.js");






function distinctToSQL(distinct) {
  if (!distinct) return;
  if (typeof distinct === 'string') return distinct;
  var type = distinct.type,
    columns = distinct.columns;
  var result = [Object(_util__WEBPACK_IMPORTED_MODULE_5__["toUpper"])(type)];
  if (columns) result.push("(".concat(columns.map(_column__WEBPACK_IMPORTED_MODULE_1__["columnRefToSQL"]).join(', '), ")"));
  return result.filter(_util__WEBPACK_IMPORTED_MODULE_5__["hasVal"]).join(' ');
}
function selectIntoToSQL(into) {
  if (!into) return;
  var position = into.position;
  if (!position) return;
  var keyword = into.keyword,
    expr = into.expr;
  var result = [];
  var intoType = Object(_util__WEBPACK_IMPORTED_MODULE_5__["toUpper"])(keyword);
  switch (intoType) {
    case 'VAR':
      result.push(expr.map(_expr__WEBPACK_IMPORTED_MODULE_0__["varToSQL"]).join(', '));
      break;
    default:
      result.push(intoType, typeof expr === 'string' ? Object(_util__WEBPACK_IMPORTED_MODULE_5__["identifierToSql"])(expr) : Object(_expr__WEBPACK_IMPORTED_MODULE_0__["exprToSQL"])(expr));
  }
  return result.filter(_util__WEBPACK_IMPORTED_MODULE_5__["hasVal"]).join(' ');
}
/**
 * @param {Object}      stmt
 * @param {?Array}      stmt.with
 * @param {?Array}      stmt.options
 * @param {?string}     stmt.distinct
 * @param {?Array|string}   stmt.columns
 * @param {?Array}      stmt.from
 * @param {?Object}     stmt.where
 * @param {?Array}      stmt.groupby
 * @param {?Object}     stmt.having
 * @param {?Array}      stmt.orderby
 * @param {?Array}      stmt.limit
 * @return {string}
 */

function forXmlToSQL(stmt) {
  if (!stmt) return;
  var expr = stmt.expr,
    keyword = stmt.keyword,
    type = stmt.type;
  var result = [Object(_util__WEBPACK_IMPORTED_MODULE_5__["toUpper"])(type), Object(_util__WEBPACK_IMPORTED_MODULE_5__["toUpper"])(keyword)];
  if (!expr) return result.join(' ');
  return "".concat(result.join(' '), "(").concat(Object(_expr__WEBPACK_IMPORTED_MODULE_0__["exprToSQL"])(expr), ")");
}
function selectToSQL(stmt) {
  var asStructVal = stmt.as_struct_val,
    columns = stmt.columns,
    distinct = stmt.distinct,
    forXml = stmt["for"],
    from = stmt.from,
    _stmt$for_sys_time_as = stmt.for_sys_time_as_of,
    forSystem = _stmt$for_sys_time_as === void 0 ? {} : _stmt$for_sys_time_as,
    lockingRead = stmt.locking_read,
    groupby = stmt.groupby,
    having = stmt.having,
    _stmt$into = stmt.into,
    into = _stmt$into === void 0 ? {} : _stmt$into,
    limit = stmt.limit,
    options = stmt.options,
    orderby = stmt.orderby,
    parentheses = stmt.parentheses_symbol,
    qualify = stmt.qualify,
    top = stmt.top,
    windowInfo = stmt.window,
    withInfo = stmt["with"],
    where = stmt.where;
  var clauses = [Object(_with__WEBPACK_IMPORTED_MODULE_3__["withToSQL"])(withInfo), 'SELECT', Object(_util__WEBPACK_IMPORTED_MODULE_5__["toUpper"])(asStructVal)];
  if (Array.isArray(options)) clauses.push(options.join(' '));
  clauses.push(distinctToSQL(distinct), Object(_util__WEBPACK_IMPORTED_MODULE_5__["topToSQL"])(top), Object(_column__WEBPACK_IMPORTED_MODULE_1__["columnsToSQL"])(columns, from));
  var position = into.position;
  var intoSQL = '';
  if (position) intoSQL = Object(_util__WEBPACK_IMPORTED_MODULE_5__["commonOptionConnector"])('INTO', selectIntoToSQL, into);
  if (position === 'column') clauses.push(intoSQL);
  // FROM + joins
  clauses.push(Object(_util__WEBPACK_IMPORTED_MODULE_5__["commonOptionConnector"])('FROM', _tables__WEBPACK_IMPORTED_MODULE_4__["tablesToSQL"], from));
  if (position === 'from') clauses.push(intoSQL);
  var _ref = forSystem || {},
    keyword = _ref.keyword,
    expr = _ref.expr;
  clauses.push(Object(_util__WEBPACK_IMPORTED_MODULE_5__["commonOptionConnector"])(keyword, _expr__WEBPACK_IMPORTED_MODULE_0__["exprToSQL"], expr));
  clauses.push(Object(_util__WEBPACK_IMPORTED_MODULE_5__["commonOptionConnector"])('WHERE', _expr__WEBPACK_IMPORTED_MODULE_0__["exprToSQL"], where));
  clauses.push(Object(_util__WEBPACK_IMPORTED_MODULE_5__["connector"])('GROUP BY', Object(_expr__WEBPACK_IMPORTED_MODULE_0__["getExprListSQL"])(groupby).join(', ')));
  clauses.push(Object(_util__WEBPACK_IMPORTED_MODULE_5__["commonOptionConnector"])('HAVING', _expr__WEBPACK_IMPORTED_MODULE_0__["exprToSQL"], having));
  clauses.push(Object(_util__WEBPACK_IMPORTED_MODULE_5__["commonOptionConnector"])('QUALIFY', _expr__WEBPACK_IMPORTED_MODULE_0__["exprToSQL"], qualify));
  clauses.push(Object(_util__WEBPACK_IMPORTED_MODULE_5__["commonOptionConnector"])('WINDOW', _expr__WEBPACK_IMPORTED_MODULE_0__["exprToSQL"], windowInfo));
  clauses.push(Object(_expr__WEBPACK_IMPORTED_MODULE_0__["orderOrPartitionByToSQL"])(orderby, 'order by'));
  clauses.push(Object(_limit__WEBPACK_IMPORTED_MODULE_2__["limitToSQL"])(limit));
  clauses.push(Object(_util__WEBPACK_IMPORTED_MODULE_5__["toUpper"])(lockingRead));
  if (position === 'end') clauses.push(intoSQL);
  clauses.push(forXmlToSQL(forXml));
  var sql = clauses.filter(_util__WEBPACK_IMPORTED_MODULE_5__["hasVal"]).join(' ');
  return parentheses ? "(".concat(sql, ")") : sql;
}


/***/ }),

/***/ "./src/show.js":
/*!*********************!*\
  !*** ./src/show.js ***!
  \*********************/
/*! exports provided: showToSQL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showToSQL", function() { return showToSQL; });
/* harmony import */ var _expr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./expr */ "./src/expr.js");
/* harmony import */ var _limit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./limit */ "./src/limit.js");
/* harmony import */ var _tables__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tables */ "./src/tables.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util */ "./src/util.js");




function showEventToSQL(showEventExpr) {
  var inClause = showEventExpr["in"],
    from = showEventExpr.from,
    limit = showEventExpr.limit;
  return [Object(_util__WEBPACK_IMPORTED_MODULE_3__["commonOptionConnector"])('IN', _util__WEBPACK_IMPORTED_MODULE_3__["literalToSQL"], inClause && inClause.right), Object(_util__WEBPACK_IMPORTED_MODULE_3__["commonOptionConnector"])('FROM', _tables__WEBPACK_IMPORTED_MODULE_2__["tablesToSQL"], from), Object(_limit__WEBPACK_IMPORTED_MODULE_1__["limitToSQL"])(limit)].filter(_util__WEBPACK_IMPORTED_MODULE_3__["hasVal"]).join(' ');
}
function showLikeAndWhereToSQL(showCharacterSetExpr) {
  var expr = showCharacterSetExpr.expr;
  if (!expr) return;
  var op = expr.op;
  if (Object(_util__WEBPACK_IMPORTED_MODULE_3__["toUpper"])(op) === 'LIKE') return Object(_util__WEBPACK_IMPORTED_MODULE_3__["commonOptionConnector"])('LIKE', _util__WEBPACK_IMPORTED_MODULE_3__["literalToSQL"], expr.right);
  return Object(_util__WEBPACK_IMPORTED_MODULE_3__["commonOptionConnector"])('WHERE', _expr__WEBPACK_IMPORTED_MODULE_0__["exprToSQL"], expr);
}
function showGrantsForUser(showGrantsForExpr) {
  var forExpr = showGrantsForExpr["for"];
  if (!forExpr) return;
  var user = forExpr.user,
    host = forExpr.host,
    role_list = forExpr.role_list;
  var userAndHost = "'".concat(user, "'");
  if (host) userAndHost += "@'".concat(host, "'");
  return ['FOR', userAndHost, role_list && 'USING', role_list && role_list.map(function (role) {
    return "'".concat(role, "'");
  }).join(', ')].filter(_util__WEBPACK_IMPORTED_MODULE_3__["hasVal"]).join(' ');
}
function showToSQL(showExpr) {
  var keyword = showExpr.keyword;
  var suffix = showExpr.suffix;
  var str = '';
  switch (Object(_util__WEBPACK_IMPORTED_MODULE_3__["toUpper"])(keyword)) {
    case 'BINLOG':
      str = showEventToSQL(showExpr);
      break;
    case 'CHARACTER':
    case 'COLLATION':
      str = showLikeAndWhereToSQL(showExpr);
      break;
    case 'COLUMNS':
    case 'INDEXES':
    case 'INDEX':
      str = Object(_util__WEBPACK_IMPORTED_MODULE_3__["commonOptionConnector"])('FROM', _tables__WEBPACK_IMPORTED_MODULE_2__["tablesToSQL"], showExpr.from);
      break;
    case 'GRANTS':
      str = showGrantsForUser(showExpr);
      break;
    case 'CREATE':
      str = Object(_util__WEBPACK_IMPORTED_MODULE_3__["commonOptionConnector"])('', _tables__WEBPACK_IMPORTED_MODULE_2__["tableToSQL"], showExpr[suffix]);
      break;
    case 'VAR':
      str = Object(_expr__WEBPACK_IMPORTED_MODULE_0__["varToSQL"])(showExpr["var"]);
      keyword = '';
      break;
    default:
      break;
  }
  return ['SHOW', Object(_util__WEBPACK_IMPORTED_MODULE_3__["toUpper"])(keyword), Object(_util__WEBPACK_IMPORTED_MODULE_3__["toUpper"])(suffix), str].filter(_util__WEBPACK_IMPORTED_MODULE_3__["hasVal"]).join(' ');
}


/***/ }),

/***/ "./src/sql.js":
/*!********************!*\
  !*** ./src/sql.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return astToSQL; });
/* harmony import */ var _union__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./union */ "./src/union.js");

var supportedTypes = ['analyze', 'attach', 'select', 'deallocate', 'delete', 'exec', 'update', 'insert', 'drop', 'rename', 'truncate', 'call', 'desc', 'use', 'alter', 'set', 'create', 'lock', 'unlock', 'declare', 'show', 'replace', 'if', 'grant', 'revoke', 'proc', 'raise', 'execute', 'transaction'];
function checkSupported(expr) {
  var ast = expr && expr.ast ? expr.ast : expr;
  if (!supportedTypes.includes(ast.type)) throw new Error("".concat(ast.type, " statements not supported at the moment"));
}
function toSQL(ast) {
  if (Array.isArray(ast)) {
    ast.forEach(checkSupported);
    return Object(_union__WEBPACK_IMPORTED_MODULE_0__["multipleToSQL"])(ast);
  }
  checkSupported(ast);
  return Object(_union__WEBPACK_IMPORTED_MODULE_0__["unionToSQL"])(ast);
}
function goToSQL(stmt) {
  if (!stmt || stmt.length === 0) return '';
  var res = [toSQL(stmt.ast)];
  if (stmt.go_next) res.push(stmt.go.toUpperCase(), goToSQL(stmt.go_next));
  return res.filter(function (sqlItem) {
    return sqlItem;
  }).join(' ');
}
function astToSQL(ast) {
  var sql = ast.go === 'go' ? goToSQL(ast) : toSQL(ast);
  return sql;
}

/***/ }),

/***/ "./src/tables.js":
/*!***********************!*\
  !*** ./src/tables.js ***!
  \***********************/
/*! exports provided: operatorToSQL, tableHintToSQL, tableTumbleToSQL, tablesToSQL, tableOptionToSQL, tableToSQL, unnestToSQL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "operatorToSQL", function() { return operatorToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tableHintToSQL", function() { return tableHintToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tableTumbleToSQL", function() { return tableTumbleToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tablesToSQL", function() { return tablesToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tableOptionToSQL", function() { return tableOptionToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tableToSQL", function() { return tableToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unnestToSQL", function() { return unnestToSQL; });
/* harmony import */ var _binary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./binary */ "./src/binary.js");
/* harmony import */ var _column__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./column */ "./src/column.js");
/* harmony import */ var _expr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./expr */ "./src/expr.js");
/* harmony import */ var _insert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./insert */ "./src/insert.js");
/* harmony import */ var _interval__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./interval */ "./src/interval.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util */ "./src/util.js");






function unnestToSQL(unnestExpr) {
  var type = unnestExpr.type,
    as = unnestExpr.as,
    expr = unnestExpr.expr,
    withOffset = unnestExpr.with_offset;
  var result = ["".concat(Object(_util__WEBPACK_IMPORTED_MODULE_5__["toUpper"])(type), "(").concat(expr && Object(_expr__WEBPACK_IMPORTED_MODULE_2__["exprToSQL"])(expr) || '', ")"), Object(_util__WEBPACK_IMPORTED_MODULE_5__["commonOptionConnector"])('AS', _util__WEBPACK_IMPORTED_MODULE_5__["identifierToSql"], as), Object(_util__WEBPACK_IMPORTED_MODULE_5__["commonOptionConnector"])(Object(_util__WEBPACK_IMPORTED_MODULE_5__["toUpper"])(withOffset && withOffset.keyword), _util__WEBPACK_IMPORTED_MODULE_5__["identifierToSql"], withOffset && withOffset.as)];
  return result.filter(_util__WEBPACK_IMPORTED_MODULE_5__["hasVal"]).join(' ');
}
function pivotOperatorToSQL(operator) {
  var as = operator.as,
    column = operator.column,
    expr = operator.expr,
    in_expr = operator.in_expr,
    type = operator.type;
  var result = [Object(_expr__WEBPACK_IMPORTED_MODULE_2__["exprToSQL"])(expr), 'FOR', Object(_column__WEBPACK_IMPORTED_MODULE_1__["columnRefToSQL"])(column), Object(_binary__WEBPACK_IMPORTED_MODULE_0__["binaryToSQL"])(in_expr)];
  var sql = ["".concat(Object(_util__WEBPACK_IMPORTED_MODULE_5__["toUpper"])(type), "(").concat(result.join(' '), ")")];
  if (as) sql.push('AS', Object(_util__WEBPACK_IMPORTED_MODULE_5__["identifierToSql"])(as));
  return sql.join(' ');
}
function operatorToSQL(operator) {
  if (!operator) return;
  var type = operator.type;
  switch (type) {
    case 'pivot':
    case 'unpivot':
      return pivotOperatorToSQL(operator);
    default:
      return '';
  }
}
function tableHintToSQL(tableHintExpr) {
  if (!tableHintExpr) return;
  var keyword = tableHintExpr.keyword,
    expr = tableHintExpr.expr,
    index = tableHintExpr.index,
    index_columns = tableHintExpr.index_columns,
    parentheses = tableHintExpr.parentheses,
    prefix = tableHintExpr.prefix;
  var result = [];
  switch (keyword.toLowerCase()) {
    case 'forceseek':
      result.push(Object(_util__WEBPACK_IMPORTED_MODULE_5__["toUpper"])(keyword), "(".concat(Object(_util__WEBPACK_IMPORTED_MODULE_5__["identifierToSql"])(index)), "(".concat(index_columns.map(_expr__WEBPACK_IMPORTED_MODULE_2__["exprToSQL"]).filter(_util__WEBPACK_IMPORTED_MODULE_5__["hasVal"]).join(', '), "))"));
      break;
    case 'spatial_window_max_cells':
      result.push(Object(_util__WEBPACK_IMPORTED_MODULE_5__["toUpper"])(keyword), '=', Object(_expr__WEBPACK_IMPORTED_MODULE_2__["exprToSQL"])(expr));
      break;
    case 'index':
      result.push(Object(_util__WEBPACK_IMPORTED_MODULE_5__["toUpper"])(prefix), Object(_util__WEBPACK_IMPORTED_MODULE_5__["toUpper"])(keyword), parentheses ? "(".concat(expr.map(_util__WEBPACK_IMPORTED_MODULE_5__["identifierToSql"]).join(', '), ")") : "= ".concat(Object(_util__WEBPACK_IMPORTED_MODULE_5__["identifierToSql"])(expr)));
      break;
    default:
      result.push(Object(_expr__WEBPACK_IMPORTED_MODULE_2__["exprToSQL"])(expr));
  }
  return result.filter(_util__WEBPACK_IMPORTED_MODULE_5__["hasVal"]).join(' ');
}
function tableTumbleToSQL(tumble) {
  if (!tumble) return '';
  var tableInfo = tumble.data,
    timecol = tumble.timecol,
    size = tumble.size;
  var fullTableName = [Object(_util__WEBPACK_IMPORTED_MODULE_5__["identifierToSql"])(tableInfo.db), Object(_util__WEBPACK_IMPORTED_MODULE_5__["identifierToSql"])(tableInfo.table)].filter(_util__WEBPACK_IMPORTED_MODULE_5__["hasVal"]).join('.');
  var result = ['TABLE(TUMBLE(TABLE', fullTableName, "DESCRIPTOR(".concat(Object(_column__WEBPACK_IMPORTED_MODULE_1__["columnRefToSQL"])(timecol), ")"), "".concat(Object(_interval__WEBPACK_IMPORTED_MODULE_4__["intervalToSQL"])(size), "))")];
  return result.filter(_util__WEBPACK_IMPORTED_MODULE_5__["hasVal"]).join(' ');
}
function tableToSQL(tableInfo) {
  if (Object(_util__WEBPACK_IMPORTED_MODULE_5__["toUpper"])(tableInfo.type) === 'UNNEST') return unnestToSQL(tableInfo);
  var table = tableInfo.table,
    db = tableInfo.db,
    as = tableInfo.as,
    expr = tableInfo.expr,
    operator = tableInfo.operator,
    prefixStr = tableInfo.prefix,
    schema = tableInfo.schema,
    server = tableInfo.server,
    suffix = tableInfo.suffix,
    tablesample = tableInfo.tablesample,
    table_hint = tableInfo.table_hint;
  var serverName = Object(_util__WEBPACK_IMPORTED_MODULE_5__["identifierToSql"])(server);
  var database = Object(_util__WEBPACK_IMPORTED_MODULE_5__["identifierToSql"])(db);
  var schemaStr = Object(_util__WEBPACK_IMPORTED_MODULE_5__["identifierToSql"])(schema);
  var tableName = table && Object(_util__WEBPACK_IMPORTED_MODULE_5__["identifierToSql"])(table);
  if (expr) {
    var exprType = expr.type;
    switch (exprType) {
      case 'values':
        var parentheses = expr.parentheses,
          values = expr.values,
          prefix = expr.prefix;
        var valueSQL = [parentheses && '(', '', parentheses && ')'];
        var valuesExpr = Object(_insert__WEBPACK_IMPORTED_MODULE_3__["valuesToSQL"])(values);
        if (prefix) valuesExpr = valuesExpr.split('(').slice(1).map(function (val) {
          return "".concat(Object(_util__WEBPACK_IMPORTED_MODULE_5__["toUpper"])(prefix), "(").concat(val);
        }).join('');
        valueSQL[1] = "VALUES ".concat(valuesExpr);
        tableName = valueSQL.filter(_util__WEBPACK_IMPORTED_MODULE_5__["hasVal"]).join('');
        break;
      case 'tumble':
        tableName = tableTumbleToSQL(expr);
        break;
      default:
        tableName = Object(_expr__WEBPACK_IMPORTED_MODULE_2__["exprToSQL"])(expr);
    }
  }
  tableName = [Object(_util__WEBPACK_IMPORTED_MODULE_5__["toUpper"])(prefixStr), tableName, Object(_util__WEBPACK_IMPORTED_MODULE_5__["toUpper"])(suffix)].filter(_util__WEBPACK_IMPORTED_MODULE_5__["hasVal"]).join(' ');
  var str = [serverName, database, schemaStr, tableName].filter(_util__WEBPACK_IMPORTED_MODULE_5__["hasVal"]).join('.');
  if (tableInfo.parentheses) str = "(".concat(str, ")");
  var result = [str];
  if (tablesample) {
    var tableSampleSQL = ['TABLESAMPLE', Object(_expr__WEBPACK_IMPORTED_MODULE_2__["exprToSQL"])(tablesample.expr), Object(_util__WEBPACK_IMPORTED_MODULE_5__["literalToSQL"])(tablesample.repeatable)].filter(_util__WEBPACK_IMPORTED_MODULE_5__["hasVal"]).join(' ');
    result.push(tableSampleSQL);
  }
  result.push(Object(_util__WEBPACK_IMPORTED_MODULE_5__["commonOptionConnector"])('AS', _util__WEBPACK_IMPORTED_MODULE_5__["identifierToSql"], as), operatorToSQL(operator));
  if (table_hint) result.push(Object(_util__WEBPACK_IMPORTED_MODULE_5__["toUpper"])(table_hint.keyword), "(".concat(table_hint.expr.map(tableHintToSQL).filter(_util__WEBPACK_IMPORTED_MODULE_5__["hasVal"]).join(', '), ")"));
  return result.filter(_util__WEBPACK_IMPORTED_MODULE_5__["hasVal"]).join(' ');
}

/**
 * @param {Array} tables
 * @return {string}
 */
function tablesToSQL(tables) {
  if (!tables) return '';
  if (!Array.isArray(tables)) {
    var expr = tables.expr,
      parentheses = tables.parentheses;
    var sql = tablesToSQL(expr);
    if (parentheses) return "(".concat(sql, ")");
    return sql;
  }
  var baseTable = tables[0];
  var clauses = [];
  if (baseTable.type === 'dual') return 'DUAL';
  clauses.push(tableToSQL(baseTable));
  for (var i = 1; i < tables.length; ++i) {
    var joinExpr = tables[i];
    var on = joinExpr.on,
      using = joinExpr.using,
      join = joinExpr.join;
    var str = [];
    str.push(join ? " ".concat(Object(_util__WEBPACK_IMPORTED_MODULE_5__["toUpper"])(join)) : ',');
    str.push(tableToSQL(joinExpr));
    str.push(Object(_util__WEBPACK_IMPORTED_MODULE_5__["commonOptionConnector"])('ON', _expr__WEBPACK_IMPORTED_MODULE_2__["exprToSQL"], on));
    if (using) str.push("USING (".concat(using.map(_util__WEBPACK_IMPORTED_MODULE_5__["identifierToSql"]).join(', '), ")"));
    clauses.push(str.filter(_util__WEBPACK_IMPORTED_MODULE_5__["hasVal"]).join(' '));
  }
  return clauses.filter(_util__WEBPACK_IMPORTED_MODULE_5__["hasVal"]).join('');
}
function tableOptionToSQL(tableOption) {
  var keyword = tableOption.keyword,
    symbol = tableOption.symbol,
    value = tableOption.value;
  var sql = [keyword.toUpperCase()];
  if (symbol) sql.push(symbol);
  var val = value;
  switch (keyword) {
    case 'partition by':
    case 'default collate':
      val = Object(_expr__WEBPACK_IMPORTED_MODULE_2__["exprToSQL"])(value);
      break;
    case 'options':
      val = "(".concat(value.map(function (tableOptionItem) {
        return [tableOptionItem.keyword, tableOptionItem.symbol, Object(_expr__WEBPACK_IMPORTED_MODULE_2__["exprToSQL"])(tableOptionItem.value)].join(' ');
      }).join(', '), ")");
      break;
    case 'cluster by':
      val = value.map(_expr__WEBPACK_IMPORTED_MODULE_2__["exprToSQL"]).join(', ');
      break;
  }
  sql.push(val);
  return sql.join(' ');
}


/***/ }),

/***/ "./src/transaction.js":
/*!****************************!*\
  !*** ./src/transaction.js ***!
  \****************************/
/*! exports provided: transactionToSQL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transactionToSQL", function() { return transactionToSQL; });
/* harmony import */ var _expr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./expr */ "./src/expr.js");

function transactionToSQL(stmt) {
  var expr = stmt.expr;
  return Object(_expr__WEBPACK_IMPORTED_MODULE_0__["exprToSQL"])(expr);
}


/***/ }),

/***/ "./src/union.js":
/*!**********************!*\
  !*** ./src/union.js ***!
  \**********************/
/*! exports provided: unionToSQL, multipleToSQL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unionToSQL", function() { return unionToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multipleToSQL", function() { return multipleToSQL; });
/* harmony import */ var _alter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./alter */ "./src/alter.js");
/* harmony import */ var _analyze__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./analyze */ "./src/analyze.js");
/* harmony import */ var _create__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./create */ "./src/create.js");
/* harmony import */ var _select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./select */ "./src/select.js");
/* harmony import */ var _delete__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./delete */ "./src/delete.js");
/* harmony import */ var _update__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./update */ "./src/update.js");
/* harmony import */ var _insert__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./insert */ "./src/insert.js");
/* harmony import */ var _command__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./command */ "./src/command.js");
/* harmony import */ var _exec__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./exec */ "./src/exec.js");
/* harmony import */ var _expr__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./expr */ "./src/expr.js");
/* harmony import */ var _limit__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./limit */ "./src/limit.js");
/* harmony import */ var _proc__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./proc */ "./src/proc.js");
/* harmony import */ var _transaction__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./transaction */ "./src/transaction.js");
/* harmony import */ var _show__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./show */ "./src/show.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./util */ "./src/util.js");















var typeToSQLFn = {
  alter: _alter__WEBPACK_IMPORTED_MODULE_0__["alterToSQL"],
  analyze: _analyze__WEBPACK_IMPORTED_MODULE_1__["analyzeToSQL"],
  attach: _analyze__WEBPACK_IMPORTED_MODULE_1__["attachToSQL"],
  create: _create__WEBPACK_IMPORTED_MODULE_2__["createToSQL"],
  select: _select__WEBPACK_IMPORTED_MODULE_3__["selectToSQL"],
  deallocate: _command__WEBPACK_IMPORTED_MODULE_7__["deallocateToSQL"],
  "delete": _delete__WEBPACK_IMPORTED_MODULE_4__["deleteToSQL"],
  exec: _exec__WEBPACK_IMPORTED_MODULE_8__["execToSQL"],
  execute: _command__WEBPACK_IMPORTED_MODULE_7__["executeToSQL"],
  "for": _command__WEBPACK_IMPORTED_MODULE_7__["forLoopToSQL"],
  update: _update__WEBPACK_IMPORTED_MODULE_5__["updateToSQL"],
  "if": _command__WEBPACK_IMPORTED_MODULE_7__["ifToSQL"],
  insert: _insert__WEBPACK_IMPORTED_MODULE_6__["insertToSQL"],
  drop: _command__WEBPACK_IMPORTED_MODULE_7__["commonCmdToSQL"],
  truncate: _command__WEBPACK_IMPORTED_MODULE_7__["commonCmdToSQL"],
  replace: _insert__WEBPACK_IMPORTED_MODULE_6__["insertToSQL"],
  declare: _command__WEBPACK_IMPORTED_MODULE_7__["declareToSQL"],
  use: _command__WEBPACK_IMPORTED_MODULE_7__["useToSQL"],
  rename: _command__WEBPACK_IMPORTED_MODULE_7__["renameToSQL"],
  call: _command__WEBPACK_IMPORTED_MODULE_7__["callToSQL"],
  desc: _command__WEBPACK_IMPORTED_MODULE_7__["descToSQL"],
  set: _command__WEBPACK_IMPORTED_MODULE_7__["setVarToSQL"],
  lock: _command__WEBPACK_IMPORTED_MODULE_7__["lockUnlockToSQL"],
  unlock: _command__WEBPACK_IMPORTED_MODULE_7__["lockUnlockToSQL"],
  show: _show__WEBPACK_IMPORTED_MODULE_13__["showToSQL"],
  grant: _command__WEBPACK_IMPORTED_MODULE_7__["grantAndRevokeToSQL"],
  revoke: _command__WEBPACK_IMPORTED_MODULE_7__["grantAndRevokeToSQL"],
  proc: _proc__WEBPACK_IMPORTED_MODULE_11__["procToSQL"],
  raise: _command__WEBPACK_IMPORTED_MODULE_7__["raiseToSQL"],
  transaction: _transaction__WEBPACK_IMPORTED_MODULE_12__["transactionToSQL"]
};
function unionToSQL(stmt) {
  if (!stmt) return '';
  var fun = typeToSQLFn[stmt.type];
  var _stmt = stmt,
    _parentheses = _stmt._parentheses,
    _orderby = _stmt._orderby,
    _limit = _stmt._limit;
  var res = [_parentheses && '(', fun(stmt)];
  while (stmt._next) {
    var nextFun = typeToSQLFn[stmt._next.type];
    var unionKeyword = Object(_util__WEBPACK_IMPORTED_MODULE_14__["toUpper"])(stmt.set_op);
    res.push(unionKeyword, nextFun(stmt._next));
    stmt = stmt._next;
  }
  res.push(_parentheses && ')', Object(_expr__WEBPACK_IMPORTED_MODULE_9__["orderOrPartitionByToSQL"])(_orderby, 'order by'), Object(_limit__WEBPACK_IMPORTED_MODULE_10__["limitToSQL"])(_limit));
  return res.filter(_util__WEBPACK_IMPORTED_MODULE_14__["hasVal"]).join(' ');
}
function multipleToSQL(stmt) {
  var res = [];
  for (var i = 0, len = stmt.length; i < len; ++i) {
    var astInfo = stmt[i] && stmt[i].ast ? stmt[i].ast : stmt[i];
    var sql = unionToSQL(astInfo);
    if (i === len - 1 && astInfo.type === 'transaction') sql = "".concat(sql, " ;");
    res.push(sql);
  }
  return res.join(' ; ');
}


/***/ }),

/***/ "./src/update.js":
/*!***********************!*\
  !*** ./src/update.js ***!
  \***********************/
/*! exports provided: updateToSQL, setToSQL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateToSQL", function() { return updateToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setToSQL", function() { return setToSQL; });
/* harmony import */ var _tables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tables */ "./src/tables.js");
/* harmony import */ var _expr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./expr */ "./src/expr.js");
/* harmony import */ var _column__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./column */ "./src/column.js");
/* harmony import */ var _limit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./limit */ "./src/limit.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util */ "./src/util.js");
/* harmony import */ var _with__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./with */ "./src/with.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }







/**
 * @param {Array} sets
 * @return {string}
 */
function setToSQL(sets) {
  if (!sets || sets.length === 0) return '';
  var clauses = [];
  var _iterator = _createForOfIteratorHelper(sets),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var set = _step.value;
      var column = {};
      var value = set.value;
      for (var key in set) {
        if (key === 'value' || key === 'keyword') continue;
        if (Object.prototype.hasOwnProperty.call(set, key)) column[key] = set[key];
      }
      var str = Object(_column__WEBPACK_IMPORTED_MODULE_2__["columnRefToSQL"])(column);
      var setItem = [str];
      var val = '';
      if (value) {
        val = Object(_expr__WEBPACK_IMPORTED_MODULE_1__["exprToSQL"])(value);
        setItem.push('=', val);
      }
      clauses.push(setItem.filter(_util__WEBPACK_IMPORTED_MODULE_4__["hasVal"]).join(' '));
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return clauses.join(', ');
}
function updateToSQL(stmt) {
  var from = stmt.from,
    table = stmt.table,
    set = stmt.set,
    where = stmt.where,
    orderby = stmt.orderby,
    withInfo = stmt["with"],
    limit = stmt.limit,
    returning = stmt.returning;
  var clauses = [Object(_with__WEBPACK_IMPORTED_MODULE_5__["withToSQL"])(withInfo), 'UPDATE', Object(_tables__WEBPACK_IMPORTED_MODULE_0__["tablesToSQL"])(table), Object(_util__WEBPACK_IMPORTED_MODULE_4__["commonOptionConnector"])('SET', setToSQL, set), Object(_util__WEBPACK_IMPORTED_MODULE_4__["commonOptionConnector"])('FROM', _tables__WEBPACK_IMPORTED_MODULE_0__["tablesToSQL"], from), Object(_util__WEBPACK_IMPORTED_MODULE_4__["commonOptionConnector"])('WHERE', _expr__WEBPACK_IMPORTED_MODULE_1__["exprToSQL"], where), Object(_expr__WEBPACK_IMPORTED_MODULE_1__["orderOrPartitionByToSQL"])(orderby, 'order by'), Object(_limit__WEBPACK_IMPORTED_MODULE_3__["limitToSQL"])(limit), Object(_util__WEBPACK_IMPORTED_MODULE_4__["returningToSQL"])(returning)];
  return clauses.filter(_util__WEBPACK_IMPORTED_MODULE_4__["hasVal"]).join(' ');
}


/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! exports provided: arrayStructTypeToSQL, autoIncrementToSQL, columnOrderListToSQL, commonKeywordArgsToSQL, commonOptionConnector, connector, commonTypeValue, commentToSQL, createBinaryExpr, createValueExpr, dataTypeToSQL, DEFAULT_OPT, escape, literalToSQL, columnIdentifierToSql, getParserOpt, identifierToSql, onPartitionsToSQL, replaceParams, returningToSQL, hasVal, setParserOpt, toUpper, topToSQL, triggerEventToSQL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arrayStructTypeToSQL", function() { return arrayStructTypeToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "autoIncrementToSQL", function() { return autoIncrementToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "columnOrderListToSQL", function() { return columnOrderListToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commonKeywordArgsToSQL", function() { return commonKeywordArgsToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commonOptionConnector", function() { return commonOptionConnector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "connector", function() { return connector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commonTypeValue", function() { return commonTypeValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commentToSQL", function() { return commentToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createBinaryExpr", function() { return createBinaryExpr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createValueExpr", function() { return createValueExpr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dataTypeToSQL", function() { return dataTypeToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_OPT", function() { return DEFAULT_OPT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "escape", function() { return escape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "literalToSQL", function() { return literalToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "columnIdentifierToSql", function() { return columnIdentifierToSql; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getParserOpt", function() { return getParserOpt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identifierToSql", function() { return identifierToSql; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onPartitionsToSQL", function() { return onPartitionsToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "replaceParams", function() { return replaceParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "returningToSQL", function() { return returningToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasVal", function() { return hasVal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setParserOpt", function() { return setParserOpt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toUpper", function() { return toUpper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "topToSQL", function() { return topToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "triggerEventToSQL", function() { return triggerEventToSQL; });
/* harmony import */ var _column__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./column */ "./src/column.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }


// const escapeMap = {
//   '\0'   : '\\0',
//   '\''   : '\\\'',
//   '"'    : '\\"',
//   '\b'   : '\\b',
//   '\n'   : '\\n',
//   '\r'   : '\\r',
//   '\t'   : '\\t',
//   '\x1a' : '\\Z',
//   // '\\'   : '\\\\',
// }

var DEFAULT_OPT = {
  database:  false || 'mysql',
  type: 'table',
  trimQuery: true,
  parseOptions: {
    includeLocations: false
  }
};
var parserOpt = DEFAULT_OPT;
function commonOptionConnector(keyword, action, opt) {
  if (!opt) return;
  if (!keyword) return action(opt);
  return "".concat(keyword.toUpperCase(), " ").concat(action(opt));
}
function connector(keyword, str) {
  if (!str) return;
  return "".concat(keyword.toUpperCase(), " ").concat(str);
}

/**
 * @param {(Array|boolean|string|number|null)} value
 * @return {Object}
 */
function createValueExpr(value) {
  var type = _typeof(value);
  if (Array.isArray(value)) return {
    type: 'expr_list',
    value: value.map(createValueExpr)
  };
  if (value === null) return {
    type: 'null',
    value: null
  };
  switch (type) {
    case 'boolean':
      return {
        type: 'bool',
        value: value
      };
    case 'string':
      return {
        type: 'string',
        value: value
      };
    case 'number':
      return {
        type: 'number',
        value: value
      };
    default:
      throw new Error("Cannot convert value \"".concat(type, "\" to SQL"));
  }
}

/**
 * @param operator
 * @param left
 * @param right
 * @return {Object}
 */
function createBinaryExpr(operator, left, right) {
  var expr = {
    operator: operator,
    type: 'binary_expr'
  };
  expr.left = left.type ? left : createValueExpr(left);
  if (operator === 'BETWEEN' || operator === 'NOT BETWEEN') {
    expr.right = {
      type: 'expr_list',
      value: [createValueExpr(right[0]), createValueExpr(right[1])]
    };
    return expr;
  }
  expr.right = right.type ? right : createValueExpr(right);
  return expr;
}

/**
 * Replace param expressions
 *
 * @param {Object} ast    - AST object
 * @param {Object} keys   - Keys = parameter names, values = parameter values
 * @return {Object}     - Newly created AST object
 */
function replaceParamsInner(ast, keys) {
  Object.keys(ast).filter(function (key) {
    var value = ast[key];
    return Array.isArray(value) || _typeof(value) === 'object' && value !== null;
  }).forEach(function (key) {
    var expr = ast[key];
    if (!(_typeof(expr) === 'object' && expr.type === 'param')) return replaceParamsInner(expr, keys);
    if (typeof keys[expr.value] === 'undefined') throw new Error("no value for parameter :".concat(expr.value, " found"));
    ast[key] = createValueExpr(keys[expr.value]);
    return null;
  });
  return ast;
}
function escape(str) {
  return str;
  // const res = []
  // for (let i = 0, len = str.length; i < len; ++i) {
  //   let char = str[i]
  //   const escaped = escapeMap[char]
  //   if (escaped) char = escaped
  //   res.push(char)
  // }
  // return res.join('')
}
function getParserOpt() {
  return parserOpt;
}
function setParserOpt(opt) {
  parserOpt = opt;
}
function topToSQL(opt) {
  if (!opt) return;
  var value = opt.value,
    percent = opt.percent,
    parentheses = opt.parentheses;
  var val = parentheses ? "(".concat(value, ")") : value;
  var prefix = "TOP ".concat(val);
  if (!percent) return prefix;
  return "".concat(prefix, " ").concat(percent.toUpperCase());
}
function columnIdentifierToSql(ident) {
  var _getParserOpt = getParserOpt(),
    database = _getParserOpt.database;
  if (!ident) return;
  switch (database && database.toLowerCase()) {
    case 'db2':
    case 'postgresql':
    case 'redshift':
    case 'snowflake':
    case 'noql':
    case 'trino':
      return "\"".concat(ident, "\"");
    case 'transactsql':
      return "[".concat(ident, "]");
    case 'mysql':
    case 'mariadb':
    case 'bigquery':
    default:
      return "`".concat(ident, "`");
  }
}
function identifierToSql(ident, isDual) {
  var _getParserOpt2 = getParserOpt(),
    database = _getParserOpt2.database;
  if (isDual === true) return "'".concat(ident, "'");
  if (!ident) return;
  if (ident === '*') return ident;
  switch (database && database.toLowerCase()) {
    case 'mysql':
    case 'mariadb':
    case 'sqlite':
      return "`".concat(ident, "`");
    case 'postgresql':
    case 'redshift':
    case 'snowflake':
    case 'trino':
    case 'noql':
      return "\"".concat(ident, "\"");
    case 'transactsql':
      return "[".concat(ident, "]");
    case 'bigquery':
    case 'db2':
      return ident;
    default:
      return "`".concat(ident, "`");
  }
}
function commonTypeValue(opt) {
  var result = [];
  if (!opt) return result;
  var type = opt.type,
    symbol = opt.symbol,
    value = opt.value;
  result.push(type.toUpperCase());
  if (symbol) result.push(symbol);
  result.push(value.toUpperCase());
  return result;
}
function toUpper(val) {
  if (!val) return;
  return val.toUpperCase();
}
function hasVal(val) {
  return val;
}
function literalToSQL(literal) {
  if (!literal) return;
  var prefix = literal.prefix;
  var type = literal.type,
    parentheses = literal.parentheses,
    suffix = literal.suffix,
    value = literal.value;
  var str = typeof literal === 'string' ? literal : value;
  switch (type) {
    case 'backticks_quote_string':
      str = "`".concat(escape(value), "`");
      break;
    case 'string':
      str = "'".concat(escape(value), "'");
      break;
    case 'regex_string':
      str = "r\"".concat(escape(value), "\"");
      break;
    case 'hex_string':
      str = "X'".concat(escape(value), "'");
      break;
    case 'full_hex_string':
      str = "0x".concat(escape(value));
      break;
    case 'natural_string':
      str = "N'".concat(escape(value), "'");
      break;
    case 'bit_string':
      str = "b'".concat(escape(value), "'");
      break;
    case 'double_quote_string':
      str = "\"".concat(escape(value), "\"");
      break;
    case 'single_quote_string':
      str = "'".concat(value, "'");
      break;
    case 'boolean':
    case 'bool':
      str = value ? 'TRUE' : 'FALSE';
      break;
    case 'null':
      str = 'NULL';
      break;
    case 'star':
      str = '*';
      break;
    case 'param':
      str = "".concat(prefix || ':').concat(value);
      prefix = null;
      break;
    case 'origin':
      str = value.toUpperCase();
      break;
    case 'date':
    case 'datetime':
    case 'time':
    case 'timestamp':
      str = "".concat(type.toUpperCase(), " '").concat(value, "'");
      break;
    case 'var_string':
      str = "N'".concat(escape(value), "'");
      break;
    default:
      break;
  }
  var result = [];
  if (prefix) result.push(toUpper(prefix));
  result.push(str);
  if (suffix) result.push(_typeof(suffix) === 'object' && suffix.collate ? commonTypeValue(suffix.collate).join(' ') : toUpper(suffix));
  str = result.join(' ');
  return parentheses ? "(".concat(str, ")") : str;
}
function replaceParams(ast, params) {
  return replaceParamsInner(JSON.parse(JSON.stringify(ast)), params);
}
function onPartitionsToSQL(expr) {
  var type = expr.type,
    partitions = expr.partitions;
  var result = [toUpper(type), "(".concat(partitions.map(function (partition) {
    var partitionType = partition.type;
    if (!(partitionType === 'range')) return literalToSQL(partition);
    var start = partition.start,
      end = partition.end,
      symbol = partition.symbol;
    return "".concat(literalToSQL(start), " ").concat(toUpper(symbol), " ").concat(literalToSQL(end));
  }).join(', '), ")")];
  return result.join(' ');
}
function dataTypeToSQL(expr) {
  var dataType = expr.dataType,
    length = expr.length,
    parentheses = expr.parentheses,
    scale = expr.scale,
    suffix = expr.suffix;
  var str = '';
  if (length != null) str = scale ? "".concat(length, ", ").concat(scale) : length;
  if (parentheses) str = "(".concat(str, ")");
  if (suffix && suffix.length) str += " ".concat(suffix.join(' '));
  return "".concat(dataType).concat(str);
}
function arrayStructTypeToSQL(expr) {
  if (!expr) return;
  var dataType = expr.dataType,
    definition = expr.definition,
    anglebracket = expr.anglebracket;
  var dataTypeUpper = toUpper(dataType);
  var isNotArrayOrStruct = dataTypeUpper !== 'ARRAY' && dataTypeUpper !== 'STRUCT';
  if (isNotArrayOrStruct) return dataTypeUpper;
  var result = definition && definition.map(function (field) {
    var fieldName = field.field_name,
      fieldType = field.field_type;
    var fieldResult = [fieldName, arrayStructTypeToSQL(fieldType)];
    return fieldResult.filter(hasVal).join(' ');
  }).join(', ');
  return anglebracket ? "".concat(dataTypeUpper, "<").concat(result, ">") : "".concat(dataTypeUpper, " ").concat(result);
}
function commentToSQL(comment) {
  if (!comment) return;
  var result = [];
  var keyword = comment.keyword,
    symbol = comment.symbol,
    value = comment.value;
  result.push(keyword.toUpperCase());
  if (symbol) result.push(symbol);
  result.push(literalToSQL(value));
  return result.join(' ');
}
function triggerEventToSQL(events) {
  return events.map(function (event) {
    var eventKw = event.keyword,
      args = event.args;
    var result = [toUpper(eventKw)];
    if (args) {
      var kwArgs = args.keyword,
        columns = args.columns;
      result.push(toUpper(kwArgs), columns.map(_column__WEBPACK_IMPORTED_MODULE_0__["columnRefToSQL"]).join(', '));
    }
    return result.join(' ');
  }).join(' OR ');
}
function returningToSQL(returning) {
  if (!returning) return '';
  var columns = returning.columns;
  return ['RETURNING', columns.map(_column__WEBPACK_IMPORTED_MODULE_0__["columnToSQL"]).filter(hasVal).join(', ')].join(' ');
}
function commonKeywordArgsToSQL(kwArgs) {
  if (!kwArgs) return [];
  return [toUpper(kwArgs.keyword), toUpper(kwArgs.args)];
}
function autoIncrementToSQL(autoIncrement) {
  if (!autoIncrement) return;
  if (typeof autoIncrement === 'string') {
    var _getParserOpt3 = getParserOpt(),
      database = _getParserOpt3.database;
    switch (database && database.toLowerCase()) {
      case 'sqlite':
        return 'AUTOINCREMENT';
      default:
        return 'AUTO_INCREMENT';
    }
  }
  var keyword = autoIncrement.keyword,
    seed = autoIncrement.seed,
    increment = autoIncrement.increment,
    parentheses = autoIncrement.parentheses;
  var result = toUpper(keyword);
  if (parentheses) result += "(".concat(literalToSQL(seed), ", ").concat(literalToSQL(increment), ")");
  return result;
}
function columnOrderListToSQL(columnOrderList) {
  if (!columnOrderList) return;
  return columnOrderList.map(_column__WEBPACK_IMPORTED_MODULE_0__["columnOrderToSQL"]).filter(hasVal).join(', ');
}


/***/ }),

/***/ "./src/window.js":
/*!***********************!*\
  !*** ./src/window.js ***!
  \***********************/
/*! exports provided: asWindowSpecToSQL, namedWindowExprToSQL, namedWindowExprListToSQL, windowFuncToSQL, windowSpecificationToSQL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asWindowSpecToSQL", function() { return asWindowSpecToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "namedWindowExprToSQL", function() { return namedWindowExprToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "namedWindowExprListToSQL", function() { return namedWindowExprListToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "windowFuncToSQL", function() { return windowFuncToSQL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "windowSpecificationToSQL", function() { return windowSpecificationToSQL; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/util.js");
/* harmony import */ var _expr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./expr */ "./src/expr.js");
/* harmony import */ var _over__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./over */ "./src/over.js");



function windowSpecificationToSQL(windowSpec) {
  var name = windowSpec.name,
    partitionby = windowSpec.partitionby,
    orderby = windowSpec.orderby,
    windowFrame = windowSpec.window_frame_clause;
  var result = [name, Object(_expr__WEBPACK_IMPORTED_MODULE_1__["orderOrPartitionByToSQL"])(partitionby, 'partition by'), Object(_expr__WEBPACK_IMPORTED_MODULE_1__["orderOrPartitionByToSQL"])(orderby, 'order by'), Object(_util__WEBPACK_IMPORTED_MODULE_0__["toUpper"])(windowFrame)];
  return result.filter(_util__WEBPACK_IMPORTED_MODULE_0__["hasVal"]).join(' ');
}
function asWindowSpecToSQL(asWindowSpec) {
  if (typeof asWindowSpec === 'string') return asWindowSpec;
  var windowSpec = asWindowSpec.window_specification;
  return "(".concat(windowSpecificationToSQL(windowSpec), ")");
}
function namedWindowExprToSQL(namedWindowExpr) {
  var name = namedWindowExpr.name,
    asWindowSpec = namedWindowExpr.as_window_specification;
  return "".concat(name, " AS ").concat(asWindowSpecToSQL(asWindowSpec));
}
function namedWindowExprListToSQL(namedWindowExprInfo) {
  var expr = namedWindowExprInfo.expr;
  return expr.map(namedWindowExprToSQL).join(', ');
}
function isConsiderNullsInArgs(fnName) {
  // position of IGNORE/RESPECT NULLS varies by function
  switch (Object(_util__WEBPACK_IMPORTED_MODULE_0__["toUpper"])(fnName)) {
    case 'NTH_VALUE':
    case 'LEAD':
    case 'LAG':
      return false;
    default:
      return true;
  }
}
function constructArgsList(expr) {
  var args = expr.args,
    name = expr.name,
    _expr$consider_nulls = expr.consider_nulls,
    consider_nulls = _expr$consider_nulls === void 0 ? '' : _expr$consider_nulls;
  var argsList = args ? Object(_expr__WEBPACK_IMPORTED_MODULE_1__["exprToSQL"])(args).join(', ') : '';
  // cover Syntax from FN_NAME(...args [RESPECT NULLS]) [RESPECT NULLS]
  var isConsidernulls = isConsiderNullsInArgs(name);
  var result = [name, '(', argsList, !isConsidernulls && ')', consider_nulls && ' ', consider_nulls, isConsidernulls && ')'];
  return result.filter(_util__WEBPACK_IMPORTED_MODULE_0__["hasVal"]).join('');
}
function windowFuncToSQL(expr) {
  var over = expr.over;
  var str = constructArgsList(expr);
  var overStr = Object(_over__WEBPACK_IMPORTED_MODULE_2__["overToSQL"])(over);
  return [str, overStr].filter(_util__WEBPACK_IMPORTED_MODULE_0__["hasVal"]).join(' ');
}


/***/ }),

/***/ "./src/with.js":
/*!*********************!*\
  !*** ./src/with.js ***!
  \*********************/
/*! exports provided: withToSQL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withToSQL", function() { return withToSQL; });
/* harmony import */ var _column__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./column */ "./src/column.js");
/* harmony import */ var _expr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./expr */ "./src/expr.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ "./src/util.js");




/**
 * @param {Array<Object>} withExpr
 */
function withToSQL(withExpr) {
  if (!withExpr || withExpr.length === 0) return;
  var isRecursive = withExpr[0].recursive ? 'RECURSIVE ' : '';
  var withExprStr = withExpr.map(function (cte) {
    var name = cte.name,
      stmt = cte.stmt,
      columns = cte.columns;
    var column = Array.isArray(columns) ? "(".concat(columns.map(_column__WEBPACK_IMPORTED_MODULE_0__["columnRefToSQL"]).join(', '), ")") : '';
    return "".concat(name.type === 'default' ? Object(_util__WEBPACK_IMPORTED_MODULE_2__["identifierToSql"])(name.value) : Object(_util__WEBPACK_IMPORTED_MODULE_2__["literalToSQL"])(name)).concat(column, " AS (").concat(Object(_expr__WEBPACK_IMPORTED_MODULE_1__["exprToSQL"])(stmt), ")");
  }).join(', ');
  return "WITH ".concat(isRecursive).concat(withExprStr);
}


/***/ }),

/***/ "./test sync recursive \\.spec.js$":
/*!******************************!*\
  !*** ./test sync \.spec.js$ ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./ast.spec.js": "./test/ast.spec.js",
	"./athena.spec.js": "./test/athena.spec.js",
	"./bigquery.spec.js": "./test/bigquery.spec.js",
	"./cmd.spec.js": "./test/cmd.spec.js",
	"./create.spec.js": "./test/create.spec.js",
	"./delete.spec.js": "./test/delete.spec.js",
	"./flink.spec.js": "./test/flink.spec.js",
	"./hive.spec.js": "./test/hive.spec.js",
	"./index.spec.js": "./test/index.spec.js",
	"./insert.spec.js": "./test/insert.spec.js",
	"./mariadb/cmd.spec.js": "./test/mariadb/cmd.spec.js",
	"./mysql-mariadb.spec.js": "./test/mysql-mariadb.spec.js",
	"./noql.spec.js": "./test/noql.spec.js",
	"./postgres.spec.js": "./test/postgres.spec.js",
	"./redshift.spec.js": "./test/redshift.spec.js",
	"./select.spec.js": "./test/select.spec.js",
	"./show.spec.js": "./test/show.spec.js",
	"./snowflake.spec.js": "./test/snowflake.spec.js",
	"./sqlite.spec.js": "./test/sqlite.spec.js",
	"./transactsql.spec.js": "./test/transactsql.spec.js",
	"./trino.spec.js": "./test/trino.spec.js",
	"./update.spec.js": "./test/update.spec.js",
	"./util.spec.js": "./test/util.spec.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./test sync recursive \\.spec.js$";

/***/ }),

/***/ "./test/ast.spec.js":
/*!**************************!*\
  !*** ./test/ast.spec.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var _require = __webpack_require__(/*! chai */ "chai"),
  expect = _require.expect;
var Parser = __webpack_require__(/*! ../src/parser */ "./src/parser.js")["default"];
var util = __webpack_require__(/*! ../src/util */ "./src/util.js");
var _require2 = __webpack_require__(/*! ../src/expr */ "./src/expr.js"),
  varToSQL = _require2.varToSQL,
  orderOrPartitionByToSQL = _require2.orderOrPartitionByToSQL;
var _require3 = __webpack_require__(/*! ../src/union */ "./src/union.js"),
  multipleToSQL = _require3.multipleToSQL;
describe('AST', function () {
  var parser = new Parser();
  var sql;
  function getParsedSql(sql, opt) {
    var ast = parser.astify(sql, opt);
    return parser.sqlify(ast, opt);
  }
  describe('select statement', function () {
    it('should support MySQL query options', function () {
      expect(getParsedSql('SELECT SQL_CALC_FOUND_ROWS SQL_BUFFER_RESULT col1 FROM t')).to.equal('SELECT SQL_CALC_FOUND_ROWS SQL_BUFFER_RESULT `col1` FROM `t`');
    });
    it('should support MySQL query options function', function () {
      expect(getParsedSql("SELECT xx.dd, Max(IF(stat_key = 'yys', stat_us, 0)) AS 'yys_users' FROM waf.t_cpkg WHERE stat_ty = 'waf_ty' GROUP BY dd;")).to.equal("SELECT `xx`.`dd`, MAX(IF(`stat_key` = 'yys', `stat_us`, 0)) AS `yys_users` FROM `waf`.`t_cpkg` WHERE `stat_ty` = 'waf_ty' GROUP BY `dd`");
    });
    it('should support select *from ast to sql', function () {
      expect(getParsedSql('SELECT *FROM abc')).to.equal('SELECT * FROM `abc`');
    });
    it('should support double quotes MySQL query', function () {
      expect(getParsedSql('select * from (select * from tb_user where user_id = "lmt") as tableA limit 0,2')).to.equal('SELECT * FROM (SELECT * FROM `tb_user` WHERE `user_id` = "lmt") AS `tableA` LIMIT 0, 2');
    });
    describe('logic operator', function () {
      it('should support column concatenation operator', function () {
        expect(getParsedSql('select "a" || "," || b as ab, t.cd && "ef" from t')).to.equal('SELECT "a" || "," || `b` AS `ab`, `t`.`cd` && "ef" FROM `t`');
      });
    });
    describe('common table expressions', function () {
      it('should support single CTE', function () {
        var sql = "WITH cte AS (SELECT 1)\n                            SELECT * FROM cte";
        expect(getParsedSql(sql)).to.equal('WITH `cte` AS (SELECT 1) SELECT * FROM `cte`');
      });
      it('should support multiple CTE', function () {
        var sql = "WITH cte1 AS (SELECT 1), cte2 AS (SELECT 2)\n                              SELECT * FROM cte1 UNION SELECT * FROM cte2";
        var expected = 'WITH `cte1` AS (SELECT 1), `cte2` AS (SELECT 2) ' + 'SELECT * FROM `cte1` UNION SELECT * FROM `cte2`';
        expect(getParsedSql(sql)).to.equal(expected);
      });
      it('should support CTE with column', function () {
        var sql = "WITH cte (col1) AS (SELECT 1)\n                            SELECT * FROM cte";
        expect(getParsedSql(sql)).to.contain('(`col1`)');
      });
      it('should support CTE with multiple columns', function () {
        var sql = "WITH cte (col1, col2) AS (SELECT 1, 2)\n                             SELECT * FROM `cte`";
        expect(getParsedSql(sql)).to.contain('(`col1`, `col2`)');
      });
      it('should support recursive CTE', function () {
        var sql = "WITH RECURSIVE cte(n) AS\n                            (\n                              SELECT 1\n                              UNION\n                              SELECT n + 1 FROM cte WHERE n < 5\n                            )\n                            SELECT * FROM cte";
        expect(getParsedSql(sql)).to.match(/^WITH RECURSIVE/);
      });
    });
    describe('parentheses', function () {
      it('should support select column parentheses ast to sql', function () {
        expect(getParsedSql('SELECT (id) FROM abc')).to.equal('SELECT (`id`) FROM `abc`');
      });
      it('should support select column parentheses ast to sql', function () {
        expect(getParsedSql('select (date(id)) from abc')).to.equal('SELECT (date(`id`)) FROM `abc`');
      });
    });
    describe('expression', function () {
      it('should support asterisk', function () {
        expect(getParsedSql('SELECT * FROM t')).to.equal('SELECT * FROM `t`');
      });
      it('should support asterisk prefixed by table', function () {
        expect(getParsedSql('SELECT t.* FROM t')).to.equal('SELECT `t`.* FROM `t`');
      });
      it('should parse multiple expressions', function () {
        sql = 'SELECT col1 AS a, col2 AS b FROM t';
        expect(getParsedSql(sql)).to.equal('SELECT `col1` AS `a`, `col2` AS `b` FROM `t`');
      });
      it('should escape reserved keywords', function () {
        expect(getParsedSql('SELECT col."select" FROM t')).to.equal('SELECT `col`.`select` FROM `t`');
      });
      it('should escape reserved keywords in aliases', function () {
        expect(getParsedSql('SELECT col AS "index" FROM t')).to.equal('SELECT `col` AS `index` FROM `t`');
      });
      it('should escape aliases with non-identifier chars (/a-z0-9_/i)', function () {
        sql = "SELECT col AS \"foo bar\" FROM t";
        expect(getParsedSql(sql)).to.contain('`col` AS `foo bar`');
      });
      ["'", '"', 'n', 't'].forEach(function (_char) {
        it("should escape char ".concat(_char, " \""), function () {
          sql = "SELECT ' escape ${char}'";
          expect(getParsedSql(sql)).to.equal(sql);
        });
      });
      it('should support boolean values', function () {
        sql = 'SELECT false, true';
        expect(getParsedSql(sql)).to.equal('SELECT FALSE, TRUE');
      });
      it('should support parentheses', function () {
        sql = 'SELECT (2 + 3) * 4';
        expect(getParsedSql(sql)).to.equal(sql);
      });
      it('should support functions', function () {
        sql = "SELECT md5('foo')";
        expect(getParsedSql(sql)).to.equal(sql);
      });
      it('should support aggregate functions', function () {
        sql = 'SELECT COUNT(distinct t.id) FROM t';
        expect(getParsedSql(sql)).to.equal('SELECT COUNT(DISTINCT `t`.`id`) FROM `t`');
      });
      it('should support unary operators', function () {
        sql = 'SELECT (not true), !t.foo as foo FROM t';
        expect(getParsedSql(sql)).to.equal('SELECT (NOT TRUE), !`t`.`foo` AS `foo` FROM `t`');
        sql = 'select -1, -a, +b, +abc.e from abc';
        expect(getParsedSql(sql)).to.equal('SELECT -1, -`a`, +`b`, +`abc`.`e` FROM `abc`');
      });
      var castQueries = {
        'simple casts': ['SELECT CAST(col AS CHAR) FROM t', 'SELECT CAST(`col` AS CHAR) FROM `t`'],
        'null target casts': ['SELECT CAST(col) FROM t', 'SELECT CAST(`col`) FROM `t`'],
        'string casts': ['SELECT CAST(\'col\' AS CHAR) FROM t', 'SELECT CAST(\'col\' AS CHAR) FROM `t`'],
        'signed integer casts': ['SELECT CAST(col as unsigned integer) FROM t', 'SELECT CAST(`col` AS UNSIGNED INTEGER) FROM `t`'],
        'int casts': ['SELECT CAST(col as int64) FROM t', 'SELECT CAST(`col` AS INT64) FROM `t`'],
        'int num casts': ['SELECT CAST(col as int(64)) FROM t', 'SELECT CAST(`col` AS INT(64)) FROM `t`'],
        'simple decimal casts': ['SELECT CAST(col AS DECIMAL) FROM t', 'SELECT CAST(`col` AS DECIMAL) FROM `t`'],
        'decimal casts with precision': ['SELECT CAST(col AS DECIMAL(4)) FROM t', 'SELECT CAST(`col` AS DECIMAL(4)) FROM `t`'],
        'decimal casts with precision and scale': ['SELECT CAST(col AS DECIMAL(6, 2)) FROM t', 'SELECT CAST(`col` AS DECIMAL(6, 2)) FROM `t`'],
        'json casts': ["SELECT CAST('{\"foo\":\"bar\"}' AS JSON) FROM dual", "SELECT CAST('{\"foo\":\"bar\"}' AS JSON) FROM DUAL"],
        'binary casts': ["SELECT CAST(a AS BINARY) FROM t", 'SELECT CAST(`a` AS BINARY) FROM `t`'],
        'char casts': ["SELECT CAST(test AS CHAR CHARACTER SET utf8mb4) COLLATE utf8mb4_bin;", 'SELECT CAST(`test` AS CHAR CHARACTER SET UTF8MB4) COLLATE UTF8MB4_BIN'],
        'time casts': ["SELECT CAST('12:31:41.8418443' AS TIME(6)) AS `time`;", "SELECT CAST('12:31:41.8418443' AS TIME(6)) AS `time`"],
        'datetime casts': ["SELECT CAST('2000-01-01 12:31:41.8418443' AS DATETIME(6)) AS `datetime`;", "SELECT CAST('2000-01-01 12:31:41.8418443' AS DATETIME(6)) AS `datetime`"]
      };
      Object.keys(castQueries).forEach(function (cast) {
        var _castQueries$cast = _slicedToArray(castQueries[cast], 2),
          inputQuery = _castQueries$cast[0],
          expectedQuery = _castQueries$cast[1];
        it("should support ".concat(cast), function () {
          expect(getParsedSql(inputQuery)).to.equal(expectedQuery);
        });
      });
      it('should support pg double colon cast', function () {
        var castQueries = {
          'colon cast': ['SELECT col::CHAR FROM t', 'SELECT col::CHAR FROM `t`'],
          'string cast': ["SELECT CASE\n                                WHEN op110.nkw = 1 THEN 'CV'::text\n                                WHEN op110.pkw = 1 AND op110.transporter = 0 THEN 'PC'::text\n                                WHEN op110.pkw = 1 AND op110.transporter = 1 THEN 'LCV'::text\n                                ELSE NULL::text\n                            END AS category\n                        FROM t1 op110", "SELECT CASE WHEN `op110`.nkw = 1 THEN 'CV'::TEXT WHEN `op110`.pkw = 1 AND `op110`.transporter = 0 THEN 'PC'::TEXT WHEN `op110`.pkw = 1 AND `op110`.transporter = 1 THEN 'LCV'::TEXT ELSE NULL::TEXT END AS `category` FROM `t1` AS `op110`"],
          'multiple colon cast': ['SELECT col::CHAR, colb::geometry FROM t', 'SELECT col::CHAR, colb::GEOMETRY FROM `t`'],
          'colon cast with as': ['select (salary + bonus)::bigint as comp from employee', 'SELECT (salary + bonus)::BIGINT AS `comp` FROM `employee`']
        };
        var opt = {
          database: 'postgresql'
        };
        Object.keys(castQueries).forEach(function (cast) {
          var _castQueries$cast2 = _slicedToArray(castQueries[cast], 2),
            inputQuery = _castQueries$cast2[0],
            expectedQuery = _castQueries$cast2[1];
          expect(parser.sqlify(parser.astify(inputQuery, opt))).to.equal(expectedQuery);
        });
      });
      it('should support hive cast as string', function () {
        expect(getParsedSql("select abc from t1 where cast(abc as string) = \"123\"", {
          database: 'hive'
        })).to.equal('SELECT `abc` FROM `t1` WHERE CAST(`abc` AS STRING) = "123"');
      });
      it('should support subselects', function () {
        expect(getParsedSql("SELECT 'string', (SELECT col FROM t2) subSelect FROM t1")).to.equal("SELECT 'string', (SELECT `col` FROM `t2`) AS `subSelect` FROM `t1`");
      });
      it('should support subselects in FROM clause', function () {
        expect(getParsedSql('SELECT * FROM (SELECT id FROM t1) AS someAlias')).to.equal('SELECT * FROM (SELECT `id` FROM `t1`) AS `someAlias`');
      });
      it('should throw an exception for undefined values', function () {
        // flora-mysql uses plain values instead of equivalent expressions, so expressions
        // have to be created by SQL parser
        expect(function () {
          util.createBinaryExpr('=', {
            type: 'column_ref',
            table: null,
            column: 'id'
          }, undefined);
        }).to["throw"](Error);
      });
      it('should createBinaryExpr using between', function () {
        var expr = util.createBinaryExpr('BETWEEN', 'id', [10, 100]);
        expect(expr).to.be.eql({
          operator: 'BETWEEN',
          type: 'binary_expr',
          left: {
            type: 'string',
            value: 'id'
          },
          right: {
            type: 'expr_list',
            value: [{
              type: 'number',
              value: 10
            }, {
              type: 'number',
              value: 100
            }]
          }
        });
      });
      it('should createBinaryExpr using between', function () {
        var expr = util.createBinaryExpr('=', {
          type: 'column_ref',
          table: null,
          column: 'id'
        }, {
          type: 'number',
          value: 10
        });
        expect(expr).to.be.eql({
          operator: '=',
          type: 'binary_expr',
          left: {
            type: 'column_ref',
            table: null,
            column: 'id'
          },
          right: {
            type: 'number',
            value: 10
          }
        });
      });
      it('should parse ANSI SQL compliant statements', function () {
        sql = "SELECT \"id\", 'foo' AS \"type\" FROM \"table\"";
        expect(getParsedSql(sql)).to.equal('SELECT "id", \'foo\' AS `type` FROM `table`');
      });
      it('should parse DUAL table', function () {
        sql = "SELECT 'id' FROM DUAL";
        expect(getParsedSql(sql)).to.equal(sql);
      });
      it('should parse DUAL table column add str', function () {
        sql = "SELECT id FROM DUAL";
        expect(getParsedSql(sql)).to.equal("SELECT 'id' FROM DUAL");
      });
    });
    describe('date function', function () {
      it('should interval string', function () {
        var opt = {
          database: 'postgresql'
        };
        expect(getParsedSql("SELECT NOW() - INTERVAL '7 DAY'", opt)).to.equal("SELECT NOW() - INTERVAL '7 DAY'");
        expect(getParsedSql("SELECT NOW() - INTERVAL 7 DAY", opt)).to.equal("SELECT NOW() - INTERVAL 7 DAY");
      });
      it('should support adddate function', function () {
        expect(getParsedSql('SELECT ADDDATE(c, INTERVAL 10 DAY) as b FROM tableA')).to.equal('SELECT ADDDATE(`c`, INTERVAL 10 DAY) AS `b` FROM `tableA`');
      });
      it('should support adddate function interval expr', function () {
        expect(getParsedSql('SELECT ADDDATE(c, INTERVAL 1+3 DAY) as b FROM tableA')).to.equal('SELECT ADDDATE(`c`, INTERVAL 1 + 3 DAY) AS `b` FROM `tableA`');
      });
      it('should support adddate function interval column ref', function () {
        expect(getParsedSql('SELECT ADDDATE(c, INTERVAL tableB.col + 3 DAY) as b FROM tableA')).to.equal('SELECT ADDDATE(`c`, INTERVAL `tableB`.`col` + 3 DAY) AS `b` FROM `tableA`');
      });
      it('should support adddate function', function () {
        expect(getParsedSql('SELECT ADDDATE(c, 10) as b FROM tableA')).to.equal('SELECT ADDDATE(`c`, 10) AS `b` FROM `tableA`');
      });
    });
    describe('joins', function () {
      it('should support implicit joins', function () {
        expect(getParsedSql('SELECT a.col , b.c FROM a ,b')).to.equal('SELECT `a`.`col`, `b`.`c` FROM `a`, `b`');
      });
      it('should support (INNER) JOINs', function () {
        sql = 'SELECT a FROM t1 join t2 on t1.t2id = t2.t1id';
        expect(getParsedSql(sql)).to.equal('SELECT `a` FROM `t1` INNER JOIN `t2` ON `t1`.`t2id` = `t2`.`t1id`');
      });
      it('should support LEFT JOINs', function () {
        sql = 'SELECT a FROM t1 left join t2 on t1.t2id = t2.t1id';
        expect(getParsedSql(sql)).to.equal('SELECT `a` FROM `t1` LEFT JOIN `t2` ON `t1`.`t2id` = `t2`.`t1id`');
      });
      it('should support RIGHT JOINs', function () {
        sql = 'SELECT a FROM t1 right join t2 on t1.t2id = t2.t1id';
        expect(getParsedSql(sql)).to.equal('SELECT `a` FROM `t1` RIGHT JOIN `t2` ON `t1`.`t2id` = `t2`.`t1id`');
      });
      it('should support FULL JOINs', function () {
        sql = 'SELECT a FROM t1 full join t2 on t1.t2id = t2.t1id';
        expect(getParsedSql(sql)).to.equal('SELECT `a` FROM `t1` FULL JOIN `t2` ON `t1`.`t2id` = `t2`.`t1id`');
      });
      it('should support multiple joins', function () {
        sql = 'SELECT a FROM t1 LEFT JOIN t2 ON t1.t2id = t2.t1id INNER JOIN t3 ON t1.t3id = t3.t1id';
        expect(getParsedSql(sql)).to.equal('SELECT `a` FROM `t1` LEFT JOIN `t2` ON `t1`.`t2id` = `t2`.`t1id` INNER JOIN `t3` ON `t1`.`t3id` = `t3`.`t1id`');
      });
      it('should support alias for base table', function () {
        sql = 'SELECT col1 FROM awesome_table t';
        expect(getParsedSql(sql)).to.equal('SELECT `col1` FROM `awesome_table` AS `t`');
      });
      it('should support joins with tables from other databases', function () {
        sql = 'SELECT col1 FROM t JOIN otherdb.awesome_table at ON t.id = at.tid';
        expect(getParsedSql(sql)).to.equal('SELECT `col1` FROM `t` INNER JOIN `otherdb`.`awesome_table` AS `at` ON `t`.`id` = `at`.`tid`');
      });
      it('should support aliases in joins', function () {
        expect(getParsedSql('SELECT col1 FROM t1 LEFT JOIN awesome_table AS t2 ON t1.id = t2.t1id')).to.equal('SELECT `col1` FROM `t1` LEFT JOIN `awesome_table` AS `t2` ON `t1`.`id` = `t2`.`t1id`');
      });
      it('should support joined subquery', function () {
        expect(getParsedSql('SELECT * FROM t1 LEFT JOIN (SELECT id, col1 FROM t2) AS someAlias ON t1.id = someAlias.id')).to.equal('SELECT * FROM `t1` LEFT JOIN (SELECT `id`, `col1` FROM `t2`) AS `someAlias` ON `t1`.`id` = `someAlias`.`id`');
      });
      it('should support USING keyword (single column)', function () {
        expect(getParsedSql('SELECT * FROM t1 JOIN t2 USING (id)')).to.equal('SELECT * FROM `t1` INNER JOIN `t2` USING (`id`)');
      });
      it('should support USING keyword (multiple columns)', function () {
        expect(getParsedSql('SELECT * FROM t1 JOIN t2 USING (id1, id2)')).to.equal('SELECT * FROM `t1` INNER JOIN `t2` USING (`id1`, `id2`)');
      });
    });
    describe('where clause', function () {
      ['<', '<=', '=', '!=', '>=', '>'].forEach(function (operator) {
        it("should support simple \"".concat(operator, "\" comparison"), function () {
          sql = "SELECT a fRom db.t wHERE \"type\" ".concat(operator, " 3");
          expect(getParsedSql(sql)).to.equal("SELECT `a` FROM `db`.`t` WHERE \"type\" ".concat(operator, " 3"));
        });
        it("should support simple \"".concat(operator, "\" comparison"), function () {
          sql = "SELECT a fRom db.t wHERE id ".concat(operator, " 3");
          expect(getParsedSql(sql)).to.equal("SELECT `a` FROM `db`.`t` WHERE `id` ".concat(operator, " 3"));
        });
      });
      var operatorMap = {
        '=': 'IN',
        '!=': 'NOT IN'
      };
      Object.keys(operatorMap).forEach(function (operator) {
        var sqlOperator = operatorMap[operator];
        it("should convert \"".concat(operator, "\" to ").concat(sqlOperator, " operator for array values"), function () {
          var ast = {
            type: 'select',
            options: null,
            distinct: null,
            columns: [{
              expr: {
                type: 'column_ref',
                table: null,
                column: 'a'
              },
              as: null
            }],
            from: [{
              db: null,
              table: 't',
              as: null
            }],
            where: {
              type: 'binary_expr',
              operator: operator,
              left: {
                type: 'column_ref',
                table: null,
                column: 'id'
              },
              right: {
                type: 'expr_list',
                value: [{
                  type: 'number',
                  value: 1
                }, {
                  type: 'number',
                  value: 2
                }]
              }
            },
            groupby: null,
            limit: null
          };
          expect(parser.sqlify(ast)).to.equal("SELECT `a` FROM `t` WHERE `id` ".concat(sqlOperator, " (1, 2)"));
        });
      });
      ['IN', 'NOT IN'].forEach(function (operator) {
        it("should support ".concat(operator, " operator"), function () {
          sql = "SELECT a FROM t WHERE id ".concat(operator.toLowerCase(), " (1, 2, 3)");
          expect(getParsedSql(sql)).to.equal("SELECT `a` FROM `t` WHERE `id` ".concat(operator, " (1, 2, 3)"));
        });
      });
      ['IS', 'IS NOT'].forEach(function (operator) {
        it("should support ".concat(operator, " operator"), function () {
          sql = "SELECT a FROM t WHERE col ".concat(operator.toLowerCase(), " NULL");
          expect(getParsedSql(sql)).to.equal("SELECT `a` FROM `t` WHERE `col` ".concat(operator, " NULL"));
        });
      });
      it('should support query param values', function () {
        sql = 'SELECT * FROM t where t.a > :my_param';
        expect(getParsedSql(sql)).to.equal('SELECT * FROM `t` WHERE `t`.`a` > :my_param');
      });
      ['BETWEEN', 'NOT BETWEEN'].forEach(function (operator) {
        it("should support ".concat(operator, " operator"), function () {
          sql = "SELECT a FROM t WHERE id ".concat(operator.toLowerCase(), " '1' and 1337");
          expect(getParsedSql(sql)).to.equal("SELECT `a` FROM `t` WHERE `id` ".concat(operator, " '1' AND 1337"));
        });
      });
      it('should support boolean values', function () {
        sql = 'SELECT col1 FROM t WHERE col2 = false';
        expect(getParsedSql(sql)).to.equal('SELECT `col1` FROM `t` WHERE `col2` = FALSE');
      });
      it('should support string values', function () {
        expect(getParsedSql("SELECT col1 FROM t WHERE col2 = 'foobar'")).to.equal("SELECT `col1` FROM `t` WHERE `col2` = 'foobar'");
      });
      it('should support null values', function () {
        expect(getParsedSql('SELECT col1 FROM t WHERE col2 IS NULL')).to.equal('SELECT `col1` FROM `t` WHERE `col2` IS NULL');
      });
      it('should support array values', function () {
        expect(getParsedSql('SELECT col1 FROM t WHERE col2 IN (1, 3, 5, 7)')).to.equal('SELECT `col1` FROM `t` WHERE `col2` IN (1, 3, 5, 7)');
      });
      ['NOT EXISTS'].forEach(function (operator) {
        it("should support ".concat(operator, " operator"), function () {
          expect(getParsedSql("SELECT a FROM t WHERE ".concat(operator, " (SELECT 1)"))).to.equal("SELECT `a` FROM `t` WHERE ".concat(operator, " (SELECT 1)"));
        });
      });
      it("should support exists operator", function () {
        var operator = 'EXISTS';
        expect(getParsedSql("SELECT a FROM t WHERE ".concat(operator, " (SELECT 1)"))).to.equal("SELECT `a` FROM `t` WHERE ".concat(operator, "(SELECT 1)"));
      });
      it('should support row value constructors', function () {
        expect(getParsedSql("SELECT * FROM \"user\" WHERE (firstname, lastname) = ('John', 'Doe')")).to.equal("SELECT * FROM `user` WHERE (`firstname`, `lastname`) = ('John', 'Doe')");
      });
    });
    describe('group clause', function () {
      it('should support single expressions', function () {
        expect(getParsedSql('SELECT a FROM t group by t.b')).to.equal('SELECT `a` FROM `t` GROUP BY `t`.`b`');
      });
      it('should support multiple expressions', function () {
        expect(getParsedSql('SELECT a FROM t GROUP BY t.b, t.c')).to.equal('SELECT `a` FROM `t` GROUP BY `t`.`b`, `t`.`c`');
      });
      it('should not generate an empty GROUP BY clause on empty arrays', function () {
        var sql = 'SELECT a FROM t';
        var ast = parser.astify(sql);
        ast.groupby = [];
        expect(parser.sqlify(ast)).to.equal('SELECT `a` FROM `t`');
      });
    });
    describe('having clause', function () {
      it('should support simple expressions', function () {
        expect(getParsedSql('SELECT a FROM t GROUP BY t.b having COUNT(*) > 1')).to.equal('SELECT `a` FROM `t` GROUP BY `t`.`b` HAVING COUNT(*) > 1');
      });
      it('should support complex expressions', function () {
        expect(getParsedSql('SELECT a FROM t GROUP BY t.b HAVING COUNT(*) > (SELECT 10)')).to.equal('SELECT `a` FROM `t` GROUP BY `t`.`b` HAVING COUNT(*) > (SELECT 10)');
      });
    });
    describe('order clause', function () {
      it('should support implicit sort order', function () {
        sql = 'SELECT a FROM t order by id';
        expect(getParsedSql(sql)).to.equal('SELECT `a` FROM `t` ORDER BY `id` ASC');
      });
      it('should support explicit sort order', function () {
        sql = 'SELECT a FROM t order by id desc';
        expect(getParsedSql(sql)).to.equal('SELECT `a` FROM `t` ORDER BY `id` DESC');
      });
      it('should support multiple expressions', function () {
        sql = 'SELECT a FROM t order by id desc, name asc';
        expect(getParsedSql(sql)).to.equal('SELECT `a` FROM `t` ORDER BY `id` DESC, `name` ASC');
      });
      it('should support complex expressions', function () {
        expect(getParsedSql('SELECT a FROM t ORDER BY rand() ASC')).to.equal('SELECT `a` FROM `t` ORDER BY rand() ASC');
      });
      it('should not generate an empty ORDER BY clause on empty arrays', function () {
        var sql = 'SELECT a FROM t';
        var ast = parser.astify(sql);
        ast.orderby = [];
        expect(parser.sqlify(ast)).to.equal('SELECT `a` FROM `t`');
      });
    });
    describe('limit clause', function () {
      it('should work w/o offset', function () {
        sql = 'SELECT a FROM t limit 10';
        expect(getParsedSql(sql)).to.equal('SELECT `a` FROM `t` LIMIT 10');
      });
      it('should work w/ offset', function () {
        sql = 'SELECT a FROM t limit 10, 10';
        expect(getParsedSql(sql)).to.equal('SELECT `a` FROM `t` LIMIT 10, 10');
      });
      it('should work db2 fetch', function () {
        sql = "select col1, col2 from library.tablename where col1 = 'foo' fetch first 5 rows only";
        expect(getParsedSql(sql, {
          database: 'db2'
        })).to.equal("SELECT col1, col2 FROM library.tablename WHERE col1 = 'foo' FETCH FIRST 5 ROWS ONLY");
      });
      it('should work db2 fetch offset', function () {
        sql = "select col1, col2 from library.tablename where col1 = 'foo' offset 10 rows fetch next 5 rows only";
        expect(getParsedSql(sql, {
          database: 'db2'
        })).to.equal("SELECT col1, col2 FROM library.tablename WHERE col1 = 'foo' OFFSET 10 ROWS FETCH NEXT 5 ROWS ONLY");
      });
    });
    describe('union operator', function () {
      it('should combine multiple statements', function () {
        sql = "select 1 union select '1' union select a from t union (select true)";
        expect(getParsedSql(sql)).to.equal("SELECT 1 UNION SELECT '1' UNION SELECT `a` FROM `t` UNION (SELECT TRUE)");
      });
      it('should support union with parentheses order by and limit', function () {
        expect(getParsedSql('(select id from app) union (select id from user)')).to.equal('(SELECT `id` FROM `app`) UNION (SELECT `id` FROM `user`)');
        expect(getParsedSql('(select id from app) union (select id from user) order by id')).to.equal('(SELECT `id` FROM `app`) UNION (SELECT `id` FROM `user`) ORDER BY `id` ASC');
        expect(getParsedSql('(select id from app) union (select id from user) order by id limit 10')).to.equal('(SELECT `id` FROM `app`) UNION (SELECT `id` FROM `user`) ORDER BY `id` ASC LIMIT 10');
        expect(getParsedSql('(select id from app) union (select id from user) limit 10')).to.equal('(SELECT `id` FROM `app`) UNION (SELECT `id` FROM `user`) LIMIT 10');
      });
      it('should combine multiple statements default union', function () {
        sql = "select 1 union all select '1' union select a from t union all (select true)";
        var ast = parser.astify(sql);
        ast.union = null;
        expect(parser.sqlify(ast)).to.equal("SELECT 1 UNION ALL SELECT '1' UNION SELECT `a` FROM `t` UNION ALL (SELECT TRUE)");
      });
      it('should combine multiple statements union all', function () {
        sql = "select 1 union all select '1' union select a from t union all (select true)";
        expect(getParsedSql(sql)).to.equal("SELECT 1 UNION ALL SELECT '1' UNION SELECT `a` FROM `t` UNION ALL (SELECT TRUE)");
      });
      it('should combine multiple statements union distinct', function () {
        sql = "select 1 union distinct select '1' union select a from t union distinct (select true)";
        expect(getParsedSql(sql)).to.equal("SELECT 1 UNION DISTINCT SELECT '1' UNION SELECT `a` FROM `t` UNION DISTINCT (SELECT TRUE)");
      });
      it('should support sqlify without ast', function () {
        var ast = [{
          ast: {
            "with": null,
            "type": "select",
            "options": null,
            "distinct": null,
            "columns": [{
              "expr": {
                "type": "number",
                "value": 1
              },
              "as": null
            }],
            "from": null,
            "where": null,
            "groupby": null,
            "having": null,
            "orderby": null,
            "limit": null
          }
        }];
        expect(multipleToSQL(ast)).to.equal('SELECT 1');
      });
      it('should be supported in expressions', function () {
        sql = "select * from (select 1 union select 2) t";
        expect(getParsedSql(sql)).to.equal("SELECT * FROM (SELECT 1 UNION SELECT 2) AS `t`");
      });
    });
  });
  describe('control flow', function () {
    describe('case operator', function () {
      it('should support case-when', function () {
        sql = "select case when 1 then 'one' when 2 then 'two' END";
        expect(getParsedSql(sql)).to.equal("SELECT CASE WHEN 1 THEN 'one' WHEN 2 THEN 'two' END");
      });
      it('should support case-when-else', function () {
        sql = "select case FUNC(a) when 1 then 'one' when 2 then 'two' else 'more' END FROM t";
        expect(getParsedSql(sql)).to.equal("SELECT CASE FUNC(`a`) WHEN 1 THEN 'one' WHEN 2 THEN 'two' ELSE 'more' END FROM `t`");
      });
      it('should support case-when with parenthesis', function () {
        sql = "SELECT CASE WHEN (a - b) = 1 THEN 1 ELSE 0 END FROM t";
        expect(getParsedSql(sql)).to.equal('SELECT CASE WHEN (`a` - `b`) = 1 THEN 1 ELSE 0 END FROM `t`');
      });
    });
    describe('if function', function () {
      it('should support simple calls', function () {
        expect(getParsedSql("SELECT IF(col1 = 'xyz', 'foo', 'bar') FROM t")).to.equal("SELECT IF(`col1` = 'xyz', 'foo', 'bar') FROM `t`");
      });
    });
  });
  describe('literals', function () {
    it('should support string values', function () {
      sql = "SELECT 'foo'";
      expect(getParsedSql(sql)).to.equal("SELECT 'foo'");
    });
    it('should support string with escape values', function () {
      sql = "INSERT INTO mytablehere (ID, post_author) VALUES (2564,'I haven\\'t <a href=\"http://www.someurl.com/somepartofurl\\0\">figured</a>');";
      expect(getParsedSql(sql)).to.equal('INSERT INTO `mytablehere` (ID, post_author) VALUES (2564,\'I haven\\\'t <a href="http://www.someurl.com/somepartofurl\\0">figured</a>\')');
    });
    it('should sqlify back with escape', function () {
      expect(getParsedSql("select * from test where a='te\\'st'")).to.equal("SELECT * FROM `test` WHERE `a` = 'te\\'st'");
    });
    it('should support null values', function () {
      sql = 'SELECT null';
      expect(getParsedSql(sql)).to.equal('SELECT NULL');
    });
    it('should support params values', function () {
      sql = 'SELECT :var_dname FROM dual';
      expect(getParsedSql(sql)).to.equal('SELECT :var_dname FROM DUAL');
    });
    it('should support without prefix', function () {
      expect(varToSQL({
        name: "test"
      })).to.equal('@test');
    });
    it('should support trailing zeros', function () {
      expect(getParsedSql('SELECT 042')).equal('SELECT 42');
      expect(getParsedSql('SELECT -042')).equal('SELECT -42');
    });
    describe('datetime', function () {
      var literals = {
        time: '08:23:16',
        date: '1999-12-25',
        timestamp: '1999-12-25 08:23:16'
      };
      Object.keys(literals).forEach(function (type) {
        var value = literals[type];
        it(type, function () {
          expect(getParsedSql("SELECT ".concat(type, " '").concat(value, "'"))).to.equal("SELECT ".concat(type.toUpperCase(), " '").concat(value, "'"));
        });
      });
    });
  });
  describe('placeholder', function () {
    var ast;
    it('should replace single parameter', function () {
      ast = parser.astify('SELECT col FROM t WHERE id = :id');
      ast = util.replaceParams(ast, {
        id: 1
      });
      expect(ast.where).to.eql({
        type: 'binary_expr',
        operator: '=',
        left: {
          type: 'column_ref',
          table: null,
          column: 'id'
        },
        right: {
          type: 'number',
          value: 1
        }
      });
    });
    it('should replace multiple parameters', function () {
      ast = parser.astify('SELECT col FROM t WHERE id = :id AND "type" = :type');
      ast = util.replaceParams(ast, {
        id: 1,
        type: 'foobar'
      });
      expect(ast.where).to.eql({
        type: 'binary_expr',
        operator: 'AND',
        left: {
          type: 'binary_expr',
          operator: '=',
          left: {
            type: 'column_ref',
            table: null,
            column: 'id'
          },
          right: {
            type: 'number',
            value: 1
          }
        },
        right: {
          type: 'binary_expr',
          operator: '=',
          left: {
            type: 'double_quote_string',
            value: 'type'
          },
          right: {
            type: 'string',
            value: 'foobar'
          }
        }
      });
    });
    it('should set parameter with string', function () {
      ast = parser.astify('SELECT col1 FROM t WHERE col2 = :name');
      ast = util.replaceParams(ast, {
        name: 'John Doe'
      });
      expect(ast.where).to.eql({
        type: 'binary_expr',
        operator: '=',
        left: {
          type: 'column_ref',
          table: null,
          column: 'col2'
        },
        right: {
          type: 'string',
          value: 'John Doe'
        }
      });
    });
    it('should set parameter with boolean value', function () {
      ast = parser.astify('SELECT col1 FROM t WHERE isMain = :main');
      ast = util.replaceParams(ast, {
        main: true
      });
      expect(ast.where).to.eql({
        type: 'binary_expr',
        operator: '=',
        left: {
          type: 'column_ref',
          table: null,
          column: 'isMain'
        },
        right: {
          type: 'bool',
          value: true
        }
      });
    });
    it('should set parameter with null value', function () {
      ast = parser.astify('SELECT col1 FROM t WHERE col2 = :param');
      ast = util.replaceParams(ast, {
        param: null
      });
      expect(ast.where).to.eql({
        type: 'binary_expr',
        operator: '=',
        left: {
          type: 'column_ref',
          table: null,
          column: 'col2'
        },
        right: {
          type: 'null',
          value: null
        }
      });
    });
    it('should set parameter with array as value', function () {
      ast = parser.astify('SELECT col1 FROM t WHERE id = :ids');
      ast = util.replaceParams(ast, {
        ids: [1, 3, 5, 7]
      });
      expect(ast.where).to.eql({
        type: 'binary_expr',
        operator: '=',
        left: {
          type: 'column_ref',
          table: null,
          column: 'id'
        },
        right: {
          type: 'expr_list',
          value: [{
            type: 'number',
            value: 1
          }, {
            type: 'number',
            value: 3
          }, {
            type: 'number',
            value: 5
          }, {
            type: 'number',
            value: 7
          }]
        }
      });
    });
    it('should throw an exception if no value for parameter is available', function () {
      ast = parser.astify('SELECT col FROM t WHERE id = :id');
      expect(function () {
        util.replaceParams(ast, {
          foo: 'bar'
        });
      }).to["throw"]('no value for parameter :id found');
    });
    it('should return new AST object', function () {
      ast = parser.astify('SELECT col FROM t WHERE id = :id');
      var resolvedParamAST = util.replaceParams(ast, {
        id: 1
      });
      expect(ast).to.not.eql(resolvedParamAST);
    });
  });
  describe('multiple statements', function () {
    it('should parser simple multiple statements', function () {
      var sql = 'SELECT * FROM a;SELECT id FROM b';
      var expectSQL = 'SELECT * FROM `a` ; SELECT `id` FROM `b`';
      expect(getParsedSql(sql)).to.equal(expectSQL);
    });
    it('should parser simple multiple statements with same type', function () {
      var sql = 'SELECT * FROM a;SELECT id FROM b UNION SELECT id FROM c';
      var expectSQL = 'SELECT * FROM `a` ; SELECT `id` FROM `b` UNION SELECT `id` FROM `c`';
      expect(getParsedSql(sql)).to.equal(expectSQL);
    });
    it('should parser simple multiple statements with different types', function () {
      var sql = 'SELECT * FROM a;UPDATE b SET id = 1';
      var expectSQL = 'SELECT * FROM `a` ; UPDATE `b` SET `id` = 1';
      expect(getParsedSql(sql)).to.equal(expectSQL);
    });
  });
  describe('delete statements', function () {
    describe('where clause', function () {
      ['<', '<=', '=', '!=', '>=', '>'].forEach(function (operator) {
        it("should support simple \"".concat(operator, "\" comparison"), function () {
          sql = "DELETE a fRom db.t wHERE \"type\" ".concat(operator, " 3");
          expect(getParsedSql(sql)).to.equal("DELETE `a` FROM `db`.`t` WHERE \"type\" ".concat(operator, " 3"));
        });
        it("should support simple \"".concat(operator, "\" comparison"), function () {
          sql = "DELETE a fRom db.t wHERE id ".concat(operator, " 3");
          expect(getParsedSql(sql)).to.equal("DELETE `a` FROM `db`.`t` WHERE `id` ".concat(operator, " 3"));
        });
      });
      var operatorMap = {
        '=': 'IN',
        '!=': 'NOT IN'
      };
      Object.keys(operatorMap).forEach(function (operator) {
        var sqlOperator = operatorMap[operator];
        it("should convert \"".concat(operator, "\" to ").concat(sqlOperator, " operator for array values"), function () {
          var ast = {
            type: 'delete',
            options: null,
            distinct: null,
            table: [{
              db: null,
              table: 't',
              as: null
            }],
            from: [{
              db: null,
              table: 't',
              as: null
            }],
            where: {
              type: 'binary_expr',
              operator: operator,
              left: {
                type: 'column_ref',
                table: null,
                column: 'id'
              },
              right: {
                type: 'expr_list',
                value: [{
                  type: 'number',
                  value: 1
                }, {
                  type: 'number',
                  value: 2
                }]
              }
            },
            groupby: null,
            limit: null
          };
          expect(parser.sqlify(ast)).to.equal("DELETE `t` FROM `t` WHERE `id` ".concat(sqlOperator, " (1, 2)"));
          ast.table[0].addition = true;
          expect(parser.sqlify(ast)).to.equal("DELETE FROM `t` WHERE `id` ".concat(sqlOperator, " (1, 2)"));
        });
      });
      ['IN', 'NOT IN'].forEach(function (operator) {
        it("should support ".concat(operator, " operator"), function () {
          sql = "DELETE a FROM t WHERE id ".concat(operator.toLowerCase(), " (1, 2, 3)");
          expect(getParsedSql(sql)).to.equal("DELETE `a` FROM `t` WHERE `id` ".concat(operator, " (1, 2, 3)"));
        });
      });
      ['IS', 'IS NOT'].forEach(function (operator) {
        it("should support ".concat(operator, " operator"), function () {
          sql = "DELETE a FROM t WHERE col ".concat(operator.toLowerCase(), " NULL");
          expect(getParsedSql(sql)).to.equal("DELETE `a` FROM `t` WHERE `col` ".concat(operator, " NULL"));
        });
      });
      ['BETWEEN', 'NOT BETWEEN'].forEach(function (operator) {
        it("should support ".concat(operator, " operator"), function () {
          sql = "DELETE a FROM t WHERE id ".concat(operator.toLowerCase(), " '1' and 1337");
          expect(getParsedSql(sql)).to.equal("DELETE `a` FROM `t` WHERE `id` ".concat(operator, " '1' AND 1337"));
        });
      });
      it('should support boolean values', function () {
        sql = 'DELETE col1 FROM t WHERE col2 = false';
        expect(getParsedSql(sql)).to.equal('DELETE `col1` FROM `t` WHERE `col2` = FALSE');
      });
      it('should support string values', function () {
        expect(getParsedSql("DELETE col1 FROM t WHERE col2 = 'foobar'")).to.equal("DELETE `col1` FROM `t` WHERE `col2` = 'foobar'");
      });
      it('should support null values', function () {
        expect(getParsedSql('DELETE col1 FROM t WHERE col2 IS NULL')).to.equal('DELETE `col1` FROM `t` WHERE `col2` IS NULL');
      });
      it('should support array values', function () {
        expect(getParsedSql('DELETE col1 FROM t WHERE col2 IN (1, 3, 5, 7)')).to.equal('DELETE `col1` FROM `t` WHERE `col2` IN (1, 3, 5, 7)');
      });
      ['NOT EXISTS'].forEach(function (operator) {
        it("should support ".concat(operator, " operator"), function () {
          expect(getParsedSql("DELETE a FROM t WHERE ".concat(operator, " (SELECT 1)"))).to.equal("DELETE `a` FROM `t` WHERE ".concat(operator, " (SELECT 1)"));
        });
      });
      it("should support exists operator", function () {
        var operator = 'EXISTS';
        expect(getParsedSql("DELETE a FROM t WHERE ".concat(operator, " (SELECT 1)"))).to.equal("DELETE `a` FROM `t` WHERE ".concat(operator, "(SELECT 1)"));
      });
    });
    it('should support JOINs', function () {
      expect(getParsedSql('DELETE t1,t2 FROM t1 LEFT JOIN t2 ON t1.id=t2.id WHERE t1.id = 25')).to.equal('DELETE `t1`, `t2` FROM `t1` LEFT JOIN `t2` ON `t1`.`id` = `t2`.`id` WHERE `t1`.`id` = 25');
    });
  });
  describe('update statements', function () {
    it('should support value is number', function () {
      expect(getParsedSql('UPDATE t SET col1 = 5')).to.equal('UPDATE `t` SET `col1` = 5');
    });
    it('should support backticks', function () {
      expect(getParsedSql('UPDATE `t` SET `col1` = 5')).to.equal('UPDATE `t` SET `col1` = 5');
    });
    it('should support value is string', function () {
      expect(getParsedSql('UPDATE t SET col1 = "abc"')).to.equal('UPDATE `t` SET `col1` = "abc"');
    });
    it('should support value is NULL ', function () {
      expect(getParsedSql('UPDATE t SET name = null')).to.equal('UPDATE `t` SET `name` = NULL');
    });
    it('should support multiple columns', function () {
      expect(getParsedSql('UPDATE t SET id = 1, name = 2')).to.equal('UPDATE `t` SET `id` = 1, `name` = 2');
    });
    it('should support cross-table update', function () {
      expect(getParsedSql('UPDATE Reservations r JOIN Train t ON (r.Train = t.TrainID) SET t.Capacity = t.Capacity + r.NoSeats WHERE r.ReservationID = 12')).to.equal('UPDATE `Reservations` AS `r` INNER JOIN `Train` AS `t` ON (`r`.`Train` = `t`.`TrainID`) SET `t`.`Capacity` = `t`.`Capacity` + `r`.`NoSeats` WHERE `r`.`ReservationID` = 12');
    });
    describe('where clause', function () {
      ['<', '<=', '=', '!=', '>=', '>'].forEach(function (operator) {
        it("should support simple \"".concat(operator, "\" comparison"), function () {
          sql = "UPDATE a SET col1 = 5 WHERE \"type\" ".concat(operator, " 3");
          expect(getParsedSql(sql)).to.equal("UPDATE `a` SET `col1` = 5 WHERE \"type\" ".concat(operator, " 3"));
        });
        it("should support simple \"".concat(operator, "\" comparison"), function () {
          sql = "UPDATE a SET col1 = 5 WHERE id ".concat(operator, " 3");
          expect(getParsedSql(sql)).to.equal("UPDATE `a` SET `col1` = 5 WHERE `id` ".concat(operator, " 3"));
        });
      });
      var operatorMap = {
        '=': 'IN',
        '!=': 'NOT IN'
      };
      Object.keys(operatorMap).forEach(function (operator) {
        var sqlOperator = operatorMap[operator];
        it("should convert \"".concat(operator, "\" to ").concat(sqlOperator, " operator for array values"), function () {
          var ast = {
            "type": "update",
            "table": [{
              "db": null,
              "table": "a",
              "as": null
            }],
            "set": [{
              "column": "col1",
              "value": {
                "type": "number",
                "value": 5
              }
            }],
            "where": {
              "type": "binary_expr",
              "operator": operator,
              "left": {
                "type": "column_ref",
                "table": null,
                "column": "id"
              },
              "right": {
                "type": "expr_list",
                "value": [{
                  "type": "number",
                  "value": 1
                }, {
                  "type": "number",
                  "value": 2
                }]
              }
            }
          };
          expect(parser.sqlify(ast)).to.equal("UPDATE `a` SET `col1` = 5 WHERE `id` ".concat(sqlOperator, " (1, 2)"));
        });
      });
      ['IN', 'NOT IN'].forEach(function (operator) {
        it("should support ".concat(operator, " operator"), function () {
          sql = "UPDATE a SET col1 = 5 WHERE id ".concat(operator.toLowerCase(), " (1, 2, 3)");
          expect(getParsedSql(sql)).to.equal("UPDATE `a` SET `col1` = 5 WHERE `id` ".concat(operator, " (1, 2, 3)"));
        });
      });
      ['IS', 'IS NOT'].forEach(function (operator) {
        it("should support ".concat(operator, " operator"), function () {
          sql = "UPDATE a SET col1 = 5 WHERE col ".concat(operator.toLowerCase(), " NULL");
          expect(getParsedSql(sql)).to.equal("UPDATE `a` SET `col1` = 5 WHERE `col` ".concat(operator, " NULL"));
        });
      });
      ['BETWEEN', 'NOT BETWEEN'].forEach(function (operator) {
        it("should support ".concat(operator, " operator"), function () {
          sql = "UPDATE a SET col1 = 5 WHERE id ".concat(operator.toLowerCase(), " '1' and 1337");
          expect(getParsedSql(sql)).to.equal("UPDATE `a` SET `col1` = 5 WHERE `id` ".concat(operator, " '1' AND 1337"));
        });
      });
      it('should support boolean values', function () {
        sql = 'UPDATE t SET col1 = 5 WHERE col2 = false';
        expect(getParsedSql(sql)).to.equal('UPDATE `t` SET \`col1\` = 5 WHERE `col2` = FALSE');
      });
      it('should support string values', function () {
        expect(getParsedSql("UPDATE t SET col1 = 5 WHERE col2 = 'foobar'")).to.equal("UPDATE `t` SET `col1` = 5 WHERE `col2` = 'foobar'");
      });
      it('should support null values', function () {
        expect(getParsedSql('UPDATE t SET col1 = 5 WHERE col2 IS NULL')).to.equal('UPDATE `t` SET \`col1\` = 5 WHERE `col2` IS NULL');
      });
      it('should support array values', function () {
        expect(getParsedSql('UPDATE t SET col1 = 5 WHERE col2 IN (1, 3, 5, 7)')).to.equal('UPDATE `t` SET \`col1\` = 5 WHERE `col2` IN (1, 3, 5, 7)');
      });
      ['NOT EXISTS'].forEach(function (operator) {
        it("should support ".concat(operator, " operator"), function () {
          expect(getParsedSql("UPDATE a SET col1 = 5 WHERE ".concat(operator, " (SELECT 1)"))).to.equal("UPDATE `a` SET `col1` = 5 WHERE ".concat(operator, " (SELECT 1)"));
        });
      });
      it("should support exists operator", function () {
        var operator = 'EXISTS';
        expect(getParsedSql("UPDATE a SET col1 = 5 WHERE ".concat(operator, " (SELECT 1)"))).to.equal("UPDATE `a` SET `col1` = 5 WHERE ".concat(operator, "(SELECT 1)"));
      });
    });
    it('should support function', function () {
      expect(getParsedSql("UPDATE t SET col1 = concat(name, '\u540D\u5B57')")).to.equal("UPDATE `t` SET `col1` = concat(`name`, '名字')");
    });
  });
  describe('insert statements', function () {
    it('should support insert', function () {
      expect(getParsedSql('INSERT INTO t (col1, col2) VALUES (1, 2)')).to.equal('INSERT INTO `t` (col1, col2) VALUES (1,2)');
    });
    it('should support insert with no columns', function () {
      expect(getParsedSql('INSERT INTO t VALUES (1, 2)')).to.equal('INSERT INTO `t` VALUES (1,2)');
    });
  });
  describe('sql comment', function () {
    it('should support # symbol', function () {
      expect(getParsedSql('select * from app limit 0,1; # comment here')).to.equal('SELECT * FROM `app` LIMIT 0, 1');
    });
    it('should support -- symbol', function () {
      expect(getParsedSql('select * from app limit 0,1; -- comment here')).to.equal('SELECT * FROM `app` LIMIT 0, 1');
    });
    it('should support /**/ symbol', function () {
      expect(getParsedSql("SELECT contact_id, last_name, first_name\n            /* Author: TechOnTheNet.com */\n            FROM contacts;")).to.equal('SELECT `contact_id`, `last_name`, `first_name` FROM `contacts`');
    });
    it('should support comment symbol in middle', function () {
      expect(getParsedSql("SELECT  /* Author: TechOnTheNet.com */  contact_id, last_name, first_name\n            FROM contacts;")).to.equal('SELECT `contact_id`, `last_name`, `first_name` FROM `contacts`');
      expect(getParsedSql("SELECT contact_id, last_name, first_name  -- Author: TechOnTheNet.com\n            FROM contacts;")).to.equal('SELECT `contact_id`, `last_name`, `first_name` FROM `contacts`');
      expect(getParsedSql("SELECT contact_id, last_name, first_name  # Author: TechOnTheNet.com\n            FROM contacts;")).to.equal('SELECT `contact_id`, `last_name`, `first_name` FROM `contacts`');
    });
    it('should support comment multiple lines', function () {
      expect(getParsedSql("SELECT contact_id, last_name, first_name\n            /*\n             * Author: TechOnTheNet.com\n             * Purpose: To show a comment that spans multiple lines in your SQL\n             * statement in MySQL.\n             */\n            FROM contacts;")).to.equal('SELECT `contact_id`, `last_name`, `first_name` FROM `contacts`');
    });
  });
  describe('orderOrPartitionByToSQL', function () {
    it('should support default order partition', function () {
      var expr = [{
        "expr": {
          "type": "column_ref",
          "table": null,
          "column": "gender"
        },
        "as": null
      }];
      expect(orderOrPartitionByToSQL(expr, 'default')).to.equal('DEFAULT `gender`');
    });
  });
  describe('transactsql', function () {
    it('should support basic parser select', function () {
      var sql = "SELECT col, col2 FROM dba.schemab.tbl_c";
      var opt = {
        database: 'transactsql'
      };
      var ast = parser.astify(sql, opt);
      var backSQL = parser.sqlify(ast, opt);
      expect(backSQL).to.equals("SELECT [col], [col2] FROM [dba].[schemab].[tbl_c]");
    });
  });
  describe('unsupported situation', function () {
    it("should throw exception for drop statements", function () {
      expect(parser.sqlify.bind(null, {
        type: 'Alter'
      })).to["throw"](Error, "Alter statements not supported at the moment");
    });
    it("should throw exception for drop statements", function () {
      expect(parser.sqlify.bind(null, {
        ast: {
          type: 'Alter'
        }
      })).to["throw"](Error, "Alter statements not supported at the moment");
    });
  });
  describe('expression parsing', function () {
    it('should be able to reconstruct a where expression in isolation', function () {
      var ast = parser.astify('select * from t where id = 1');
      var sql = parser.exprToSQL(ast.where);
      expect(sql).to.equal('`id` = 1');
    });
  });
});

/***/ }),

/***/ "./test/athena.spec.js":
/*!*****************************!*\
  !*** ./test/athena.spec.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(/*! chai */ "chai"),
  expect = _require.expect;
var Parser = __webpack_require__(/*! ../src/parser */ "./src/parser.js")["default"];
describe('athena', function () {
  var parser = new Parser();
  var DEFAULT_OPT = {
    database: 'athena'
  };
  function getParsedSql(sql) {
    var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_OPT;
    var ast = parser.astify(sql, opt);
    return parser.sqlify(ast, opt);
  }
  it('array data type', function () {
    var sql = "SELECT\n    sessionId session_id,\n    organizationName organization,\n    appMode note_type,\n    rating note_rating,\n    therapistId therapist_id,\n    distinct_id email,\n    FROM_UNIXTIME((mp_processing_time_ms / 1000)) last_updated_ts,\n    source,\n    CAST(json_parse (selectedSubTags) AS ARRAY (varchar)) note_rating_tags,\n    description rating_description\n  FROM\n    events_mp_master_event\n  WHERE\n    (mp_event_name = 'submit feedback clicked')";
    expect(getParsedSql(sql)).to.be.equal("SELECT `sessionId` AS `session_id`, `organizationName` AS `organization`, `appMode` AS `note_type`, `rating` AS `note_rating`, `therapistId` AS `therapist_id`, `distinct_id` AS `email`, FROM_UNIXTIME((`mp_processing_time_ms` / 1000)) AS `last_updated_ts`, `source`, CAST(json_parse(`selectedSubTags`) AS ARRAY(VARCHAR)) AS `note_rating_tags`, `description` AS `rating_description` FROM `events_mp_master_event` WHERE (`mp_event_name` = 'submit feedback clicked')");
  });
});

/***/ }),

/***/ "./test/bigquery.spec.js":
/*!*******************************!*\
  !*** ./test/bigquery.spec.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(/*! chai */ "chai"),
  expect = _require.expect;
var Parser = __webpack_require__(/*! ../src/parser */ "./src/parser.js")["default"];
var _require2 = __webpack_require__(/*! ../src/array-struct */ "./src/array-struct.js"),
  arrayStructValueToSQL = _require2.arrayStructValueToSQL;
var _require3 = __webpack_require__(/*! ../src/tables */ "./src/tables.js"),
  operatorToSQL = _require3.operatorToSQL;
var _require4 = __webpack_require__(/*! ../src/util */ "./src/util.js"),
  arrayStructTypeToSQL = _require4.arrayStructTypeToSQL;
describe('BigQuery', function () {
  var parser = new Parser();
  var opt = {
    database: 'bigquery'
  };
  function getParsedSql(sql, opt) {
    var ast = parser.astify(sql, opt);
    return parser.sqlify(ast, opt);
  }
  describe('operator type', function () {
    it('should return empty when type is unknown', function () {
      expect(operatorToSQL({
        type: 'unknown'
      })).to.be.equals('');
    });
  });
  var SQL_LIST = [{
    title: 'select *',
    sql: ['SELECT * FROM (SELECT "apple" AS fruit, "carrot" AS vegetable);', "SELECT * FROM (SELECT 'apple' AS fruit, 'carrot' AS vegetable)"]
  }, {
    title: 'select simple column with parentheses',
    sql: ['SELECT ((aaa + bbb) / ccc) FROM xxx', "SELECT ((aaa + bbb) / ccc) FROM xxx"]
  }, {
    title: 'select expression.*',
    sql: ["WITH groceries AS\n        (SELECT \"milk\" AS dairy,\n          \"eggs\" AS protein,\n          \"bread\" AS grain)\n        SELECT g.*\n        FROM groceries AS g;", "WITH groceries AS (SELECT 'milk' AS dairy, 'eggs' AS protein, 'bread' AS grain) SELECT g.* FROM groceries AS g"]
  }, {
    title: 'with expr, order',
    sql: ["with\n\n        cte as (\n            select *\n            from product.organization\n            order by id\n            limit 10\n        )\n\n        select *\n        from cte", "WITH cte AS (SELECT * FROM product.organization ORDER BY id ASC LIMIT 10) SELECT * FROM cte"]
  }, {
    title: 'select expression.* with struct',
    sql: ["WITH locations AS\n        (SELECT STRUCT(\"Seattle\" AS city, \"Washington\" AS state) AS location\n        UNION ALL\n        SELECT STRUCT(\"Phoenix\" AS city, \"Arizona\" AS state) AS location)\n      SELECT l.locations.*\n      FROM locations l;", "WITH locations AS (SELECT STRUCT('Seattle' AS city, 'Washington' AS state) AS location UNION ALL SELECT STRUCT('Phoenix' AS city, 'Arizona' AS state) AS location) SELECT l.locations.* FROM locations AS l"]
  }, {
    title: 'select expression.* with array struct',
    sql: ["WITH locations AS\n        (SELECT ARRAY<STRUCT<city STRING, state STRING>>[(\"Seattle\", \"Washington\"),\n          (\"Phoenix\", \"Arizona\")] AS location)\n      SELECT l.*\n      FROM locations l;", "WITH locations AS (SELECT ARRAY<STRUCT<city STRING, state STRING>>[('Seattle', 'Washington'), ('Phoenix', 'Arizona')] AS location) SELECT l.* FROM locations AS l"]
  }, {
    title: 'select * except',
    sql: ["WITH orders AS\n        (SELECT 5 as order_id,\n        \"sprocket\" as item_name,\n        200 as quantity)\n      SELECT * EXCEPT (order_id), orders.* EXCEPT(order_time)\n      FROM orders;", "WITH orders AS (SELECT 5 AS order_id, 'sprocket' AS item_name, 200 AS quantity) SELECT * EXCEPT(order_id), orders.* EXCEPT(order_time) FROM orders"]
  }, {
    title: 'select * replace',
    sql: ["WITH orders AS\n        (SELECT 5 as order_id,\n        \"sprocket\" as item_name,\n        200 as quantity)\n      SELECT * REPLACE (\"widget\" AS item_name)\n      FROM orders;", "WITH orders AS (SELECT 5 AS order_id, 'sprocket' AS item_name, 200 AS quantity) SELECT * REPLACE('widget' AS item_name) FROM orders"]
  }, {
    title: 'select * replace calculate',
    sql: ["WITH orders AS\n        (SELECT 5 as order_id,\n        \"sprocket\" as item_name,\n        200 as quantity)\n      SELECT * REPLACE (quantity/2 AS quantity)\n      FROM orders;", "WITH orders AS (SELECT 5 AS order_id, 'sprocket' AS item_name, 200 AS quantity) SELECT * REPLACE(quantity / 2 AS quantity) FROM orders"]
  }, {
    title: 'select as struct',
    sql: ['SELECT AS STRUCT 1 x, 2, 3 xx', 'SELECT AS STRUCT 1 AS x, 2, 3 AS xx']
  }, {
    title: 'select as value',
    sql: ['SELECT AS VALUE STRUCT(1 AS x, 2, 3 AS x)', 'SELECT AS VALUE STRUCT(1 AS x, 2, 3 AS x)']
  }, {
    title: 'select as value from',
    sql: ['SELECT AS VALUE STRUCT(1 a, 2 b) xyz FROM ttt', 'SELECT AS VALUE STRUCT(1 AS a, 2 AS b) AS xyz FROM ttt']
  }, {
    title: 'select from project.dataset.table',
    sql: ['SELECT * FROM project.dataset.Roster;', 'SELECT * FROM project.dataset.Roster']
  }, {
    title: 'select from table for system_time as of',
    sql: ['SELECT * FROM t FOR SYSTEM_TIME AS OF TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 HOUR);', 'SELECT * FROM t FOR SYSTEM_TIME AS OF TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 HOUR)']
  }, {
    title: 'select from table for system_time as of string',
    sql: ["SELECT * FROM t FOR SYSTEM_TIME AS OF '2017-01-01 10:00:00-07:00';", "SELECT * FROM t FOR SYSTEM_TIME AS OF '2017-01-01 10:00:00-07:00'"]
  }, {
    title: 'select from table for system_time as of in',
    sql: ['SELECT * FROM t1 WHERE t1.a IN (SELECT t2.a FROM t2 FOR SYSTEM_TIME AS OF t1.timestamp_column);', 'SELECT * FROM t1 WHERE t1.a IN (SELECT t2.a FROM t2 FOR SYSTEM_TIME AS OF t1.timestamp_column)']
  }, {
    title: 'select from unnest array expr',
    sql: ["SELECT * FROM UNNEST(ARRAY<STRUCT<x INT64, y STRING>>[(1, 'foo'), (3, 'bar')]);", "SELECT * FROM UNNEST(ARRAY<STRUCT<x INT64, y STRING>>[(1, 'foo'), (3, 'bar')])"]
  }, {
    title: 'select from unnest array path',
    sql: ['SELECT * FROM UNNEST ([1, 2, 3]);', 'SELECT * FROM UNNEST([1, 2, 3])']
  }, {
    title: 'select from unnest JSON_EXTRACT_ARRAY',
    sql: ['SELECT a, b, c, ARRAY(SELECT * FROM UNNEST(JSON_EXTRACT_ARRAY(d))) AS d FROM e WHERE LOWER(f)=\'123\' GROUP BY a, b, c', 'SELECT a, b, c, ARRAY(SELECT * FROM UNNEST(JSON_EXTRACT_ARRAY(d))) AS d FROM e WHERE LOWER(f) = \'123\' GROUP BY a, b, c']
  }, {
    title: 'select from unnest with offset',
    sql: ['SELECT * FROM UNNEST ( ) AS abc WITH OFFSET AS num', 'SELECT * FROM UNNEST() AS abc WITH OFFSET AS num']
  }, {
    title: 'select with_query_name',
    sql: ["WITH\n        subQ1 AS (SELECT * FROM Roster WHERE SchoolID = 52),\n        subQ2 AS (SELECT SchoolID FROM subQ1)\n      SELECT DISTINCT * FROM subQ2;", 'WITH subQ1 AS (SELECT * FROM Roster WHERE SchoolID = 52), subQ2 AS (SELECT SchoolID FROM subQ1) SELECT DISTINCT * FROM subQ2']
  }, {
    title: 'select subquery',
    sql: ["SELECT AVG ( PointsScored )\n        FROM\n        ( SELECT PointsScored\n          FROM Stats\n          WHERE SchoolID = 77 )", 'SELECT AVG(PointsScored) FROM (SELECT PointsScored FROM Stats WHERE SchoolID = 77)']
  }, {
    title: 'select subquery have alias',
    sql: ["SELECT r.LastName\n        FROM\n        ( SELECT * FROM Roster) AS r", 'SELECT r.LastName FROM (SELECT * FROM Roster) AS r']
  }, {
    title: 'select implicit "comma cross join"',
    sql: ['SELECT * FROM Roster, TeamMascot', 'SELECT * FROM Roster, TeamMascot']
  }, {
    title: 'select cross join',
    sql: ['SELECT * FROM Roster cross join TeamMascot', 'SELECT * FROM Roster CROSS JOIN TeamMascot']
  }, {
    title: 'select inner join using',
    sql: ["SELECT FirstName\n        FROM Roster INNER JOIN PlayerStats\n        USING (LastName);", 'SELECT FirstName FROM Roster INNER JOIN PlayerStats USING (LastName)']
  }, {
    title: 'inner could be omit when join',
    sql: ["select\n          organization.name,\n          count(*) as nb_payments\n        from product.organization\n        join product.payment on organization_id = organization.id\n        group by 1\n        order by 2 desc", 'SELECT organization.name, COUNT(*) AS nb_payments FROM product.organization JOIN product.payment ON organization_id = organization.id GROUP BY 1 ORDER BY 2 DESC']
  }, {
    title: 'select order by using parentheses',
    sql: ["( SELECT * FROM Roster\n          UNION ALL\n          SELECT * FROM TeamMascot )\n        ORDER BY SchoolID;", '( SELECT * FROM Roster UNION ALL SELECT * FROM TeamMascot ) ORDER BY SchoolID ASC']
  }, {
    title: 'select window clause',
    sql: ["SELECT item, purchases, category,\n        LAST_VALUE(item)\n        OVER (item_window) AS most_popular\n        FROM Produce\n        WINDOW item_window AS (\n          PARTITION BY category\n          ORDER BY purchases\n          ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING)", 'SELECT item, purchases, category, LAST_VALUE(item) OVER (item_window) AS most_popular FROM Produce WINDOW item_window AS (PARTITION BY category ORDER BY purchases ASC ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING)']
  }, {
    title: 'select window clause list',
    sql: ["SELECT item, purchases, category, LAST_VALUE(item)\n        OVER d AS most_popular\n      FROM Produce\n      WINDOW\n        a AS (PARTITION BY category),\n        b AS (a ORDER BY purchases),\n        c AS (b ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING),\n        d AS (c)", 'SELECT item, purchases, category, LAST_VALUE(item) OVER d AS most_popular FROM Produce WINDOW a AS (PARTITION BY category), b AS (a ORDER BY purchases ASC), c AS (b ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING), d AS (c)']
  }, {
    title: 'select window clause list over window',
    sql: ["SELECT item, purchases, category, LAST_VALUE(item)\n        OVER (c ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING) AS most_popular\n      FROM Produce\n      WINDOW\n        a AS (PARTITION BY category),\n        b AS (a ORDER BY purchases),\n        c AS b", 'SELECT item, purchases, category, LAST_VALUE(item) OVER (c ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING) AS most_popular FROM Produce WINDOW a AS (PARTITION BY category), b AS (a ORDER BY purchases ASC), c AS b']
  }, {
    title: 'select unnest array limit',
    sql: ["SELECT *\n        FROM UNNEST(ARRAY<STRING>['a', 'b', 'c', 'd', 'e']) AS letter\n        ORDER BY letter ASC LIMIT 2", "SELECT * FROM UNNEST(ARRAY<STRING>['a', 'b', 'c', 'd', 'e']) AS letter ORDER BY letter ASC LIMIT 2"]
  }, {
    title: 'select unnest array limit and offset',
    sql: ["SELECT *\n        FROM UNNEST(ARRAY<STRING>['a', 'b', 'c', 'd', 'e']) AS letter\n        ORDER BY letter ASC LIMIT 2 OFFSET 1", "SELECT * FROM UNNEST(ARRAY<STRING>['a', 'b', 'c', 'd', 'e']) AS letter ORDER BY letter ASC LIMIT 2 OFFSET 1"]
  }, {
    title: 'tail comma',
    sql: ["SELECT season as season,\n        academic_year as academic_year,\n        FROM source", 'SELECT season AS season, academic_year AS academic_year FROM source']
  }, {
    title: 'select union distinct',
    sql: ["SELECT win_team_id AS winTeamID, win_market as market, winName as name from winners UNION DISTINCT (SELECT * from losers)", 'SELECT win_team_id AS winTeamID, win_market AS market, winName AS name FROM winners UNION DISTINCT (SELECT * FROM losers)']
  }, {
    title: 'select offset',
    sql: ["WITH locations AS\n        (SELECT ARRAY<STRUCT<city STRING, state STRING>>[(\"Seattle\", \"Washington\"),\n          (\"Phoenix\", \"Arizona\")] AS location)\n      SELECT l.LOCATION[offset(0)].*\n      FROM locations l;", "WITH locations AS (SELECT ARRAY<STRUCT<city STRING, state STRING>>[('Seattle', 'Washington'), ('Phoenix', 'Arizona')] AS location) SELECT l.LOCATION[OFFSET(0)].* FROM locations AS l"]
  }, {
    title: 'select offset or ordinal',
    sql: ["WITH sequences AS\n        (SELECT [0, 1, 1, 2, 3, 5] AS some_numbers\n         UNION ALL SELECT [2, 4, 8, 16, 32] AS some_numbers\n         UNION ALL SELECT [5, 10] AS some_numbers)\n      SELECT some_numbers,\n             some_numbers[0] as index_0,\n             some_numbers[OFFSET(1)] AS offset_1,\n             some_numbers[ORDINAL(1)] AS ordinal_1\n      FROM sequences;", "WITH sequences AS (SELECT [0, 1, 1, 2, 3, 5] AS some_numbers UNION ALL SELECT [2, 4, 8, 16, 32] AS some_numbers UNION ALL SELECT [5, 10] AS some_numbers) SELECT some_numbers, some_numbers[0] AS index_0, some_numbers[OFFSET(1)] AS offset_1, some_numbers[ORDINAL(1)] AS ordinal_1 FROM sequences"]
  }, {
    title: 'select offset after funtion',
    sql: ["select split('To - be - split', ' - ')[OFFSET(0)] from abc", "SELECT split('To - be - split', ' - ')[OFFSET(0)] FROM abc"]
  }, {
    title: 'select scalar function with args',
    sql: ['SELECT CURRENT_DATE(\'America/New_York\') FROM table1;', "SELECT CURRENT_DATE('America/New_York') FROM table1"]
  }, {
    title: 'select extract function with args',
    sql: ["SELECT EXTRACT(DAY FROM DATE '2013-12-25') as the_day FROM table1;", "SELECT EXTRACT(DAY FROM DATE '2013-12-25') AS the_day FROM table1"]
  }, {
    title: 'select regex extract function with args',
    sql: ['SELECT REGEXP_EXTRACT(CAST(date AS String), r"^[0-9]+") AS regexp FROM table1', 'SELECT REGEXP_EXTRACT(CAST(date AS STRING), r"^[0-9]+") AS regexp FROM table1']
  }, {
    title: 'select regex substr function with args',
    sql: ['SELECT REGEXP_SUBSTR(CAST(date AS String), r"^[0-9]+", 2, 10) AS regexp FROM table1', 'SELECT REGEXP_SUBSTR(CAST(date AS STRING), r"^[0-9]+", 2, 10) AS regexp FROM table1']
  }, {
    title: 'select with timestamp prefix',
    sql: ["SELECT\n        DATETIME(2008, 12, 25, 05, 30, 00) as datetime_ymdhms,\n        DATETIME(TIMESTAMP \"2008-12-25 05:30:00+00\", \"America/Los_Angeles\") as datetime_tstz;", "SELECT DATETIME(2008, 12, 25, 5, 30, 0) AS datetime_ymdhms, DATETIME(TIMESTAMP '2008-12-25 05:30:00+00', 'America/Los_Angeles') AS datetime_tstz"]
  }, {
    title: 'select with datetime prefix',
    sql: ["SELECT\n        DATETIME \"2008-12-25 15:30:00\" as original_date,\n        DATETIME_ADD(DATETIME \"2008-12-25 15:30:00\", INTERVAL 10 MINUTE) as later;", "SELECT DATETIME '2008-12-25 15:30:00' AS original_date, DATETIME_ADD(DATETIME '2008-12-25 15:30:00', INTERVAL 10 MINUTE) AS later"]
  }, {
    title: 'select with datetime_diff',
    sql: ["SELECT\n        DATETIME \"2010-07-07 10:20:00\" as first_datetime,\n        DATETIME \"2008-12-25 15:30:00\" as second_datetime,\n        DATETIME_DIFF(DATETIME \"2010-07-07 10:20:00\",\n          DATETIME \"2008-12-25 15:30:00\", DAY) as difference;", "SELECT DATETIME '2010-07-07 10:20:00' AS first_datetime, DATETIME '2008-12-25 15:30:00' AS second_datetime, DATETIME_DIFF(DATETIME '2010-07-07 10:20:00', DATETIME '2008-12-25 15:30:00', DAY) AS difference"]
  }, {
    title: 'select with row_number',
    sql: ["select ROW_NUMBER() OVER(PARTITION BY column1 ORDER BY column2)", "SELECT ROW_NUMBER() OVER (PARTITION BY column1 ORDER BY column2 ASC)"]
  }, {
    title: 'select as backticks_quoted_ident',
    sql: ['select 1 as `from`', 'SELECT 1 AS `from`']
  }, {
    title: 'select from with',
    sql: ["SELECT * FROM (\n          WITH temp AS (\n              SELECT * FROM test\n          )\n          SELECT * FROM temp\n      )", 'SELECT * FROM (WITH temp AS (SELECT * FROM test) SELECT * FROM temp)']
  }, {
    title: 'select from unnest item',
    sql: ["SELECT *\n        FROM product.organization, unnest(array[1,2])\n        LIMIT 10", 'SELECT * FROM product.organization, UNNEST(ARRAY[1, 2]) LIMIT 10']
  }, {
    title: 'strikethrough in tablename',
    sql: ['SELECT previous_block FROM raintank-dev.bitcoin_blockchain.blocks LIMIT 1', 'SELECT previous_block FROM raintank-dev.bitcoin_blockchain.blocks LIMIT 1']
  }, {
    title: 'over window spec',
    sql: ["select\n        date_week,\n        avg(nb_users) over (\n          order by date_week\n          rows between 3 preceding and current row\n      ) as nb_users_ma\n      from active_users_per_week", 'SELECT date_week, AVG(nb_users) OVER (ORDER BY date_week ASC ROWS BETWEEN 3 PRECEDING AND CURRENT ROW) AS nb_users_ma FROM active_users_per_week']
  }, {
    title: 'session user',
    sql: ['select session_user()', 'SELECT SESSION_USER()']
  }, {
    title: 'from pivot operator',
    sql: ["SELECT sales, quarter FROM Produce PIVOT(sum(sales) FOR quarter IN ('Q1', 'Q2', 'Q3', 'Q4'))", "SELECT sales, quarter FROM Produce PIVOT(SUM(sales) FOR quarter IN ('Q1', 'Q2', 'Q3', 'Q4'))"]
  }, {
    title: 'from pivot operator with as',
    sql: ["SELECT sales, quarter FROM Produce PIVOT(sum(sales) FOR quarter IN ('Q1', 'Q2', 'Q3', 'Q4')) as abc", "SELECT sales, quarter FROM Produce PIVOT(SUM(sales) FOR quarter IN ('Q1', 'Q2', 'Q3', 'Q4')) AS abc"]
  }, {
    title: 'select distinct parentheses',
    sql: ["select count (\n          distinct (\n            case\n              when order_purchase_timestamp between '2018-01-01' and '2018-12-31' then order_id\n            end\n          )\n        ) as nb_orders\n        from retail.orders", "SELECT COUNT(DISTINCT (CASE WHEN order_purchase_timestamp BETWEEN '2018-01-01' AND '2018-12-31' THEN order_id END)) AS nb_orders FROM retail.orders"]
  }, {
    title: 'select column and star',
    sql: ['select row_number() over(), * from retail.orders', 'SELECT row_number() OVER (), * FROM retail.orders']
  }, {
    title: 'function name with more dot',
    sql: ['SELECT bqutil.fn.degrees(3.141592653589793) is_this_pi', 'SELECT bqutil.fn.degrees(3.141592653589793) AS is_this_pi']
  }, {
    title: 'extract date',
    sql: ["SELECT\n        CONCAT('transaction ',transaction_id,' from ',\n        EXTRACT(date from TIMESTAMP_SECONDS(CAST(CAST(event_timestamp AS INT64)/1000000 AS INT64))))\n      FROM\n        transactions", "SELECT CONCAT('transaction ', transaction_id, ' from ', EXTRACT(DATE FROM TIMESTAMP_SECONDS(CAST(CAST(event_timestamp AS INT64) / 1000000 AS INT64)))) FROM transactions"]
  }, {
    title: 'schema table and column',
    sql: ['SELECT * FROM t LEFT JOIN e ON (t.a = e.x.y)', 'SELECT * FROM t LEFT JOIN e ON (t.a = e.x.y)']
  }, {
    title: 'schema table and nested column fields',
    sql: ['SELECT * FROM t LEFT JOIN e ON (t.a = e.x.y.z.b.c)', 'SELECT * FROM t LEFT JOIN e ON (t.a = e.x.y.z.b.c)']
  }, {
    title: 'extract time',
    sql: ['SELECT extract(time from ts) FROM events', 'SELECT EXTRACT(TIME FROM ts) FROM events']
  }, {
    title: 'key as column name',
    sql: ['select key from x', 'SELECT key FROM x']
  }, {
    title: 'or operator in column',
    sql: ["SELECT\n        a OR b\n      FROM\n        ds.tbl", 'SELECT a OR b FROM ds.tbl']
  }, {
    title: 'right as function name',
    sql: ["select right('lorem ipsum', 2)", "SELECT right('lorem ipsum', 2)"]
  }, {
    title: 'extract function',
    sql: ['select extract(year from current_date())', 'SELECT EXTRACT(YEAR FROM CURRENT_DATE())']
  }, {
    title: 'and preceding after between in over clause',
    sql: ['SELECT MAX(amount) OVER (ORDER BY invoice_date ASC ROWS BETWEEN UNBOUNDED PRECEDING AND 3 PRECEDING) FROM invoice', 'SELECT MAX(amount) OVER (ORDER BY invoice_date ASC ROWS BETWEEN UNBOUNDED PRECEDING AND 3 PRECEDING) FROM invoice']
  }, {
    title: 'multiple statement',
    sql: ['select abc from table1; select def from table2', 'SELECT abc FROM table1 ; SELECT def FROM table2']
  }, {
    title: 'current date time without parentheses',
    sql: ['select current_date', 'SELECT CURRENT_DATE']
  }, {
    title: 'count distinct case when without parentheses',
    sql: ["SELECT\n        COUNT(\n          DISTINCT CASE WHEN active IS TRUE THEN id END\n        ) AS nb_active\n      FROM\n        dataset.users", 'SELECT COUNT(DISTINCT CASE WHEN active IS TRUE THEN id END) AS nb_active FROM dataset.users']
  }, {
    title: 'qualify clause',
    sql: ["SELECT\n          item,\n          RANK() OVER (PARTITION BY category ORDER BY purchases DESC) as rank\n        FROM Produce\n        WHERE Produce.category = 'vegetable'\n        QUALIFY rank <= 3", "SELECT item, RANK() OVER (PARTITION BY category ORDER BY purchases DESC) AS rank FROM Produce WHERE Produce.category = 'vegetable' QUALIFY rank <= 3"]
  }, {
    title: 'keyword in table name',
    sql: ['select * from a_dataset.table', 'SELECT * FROM a_dataset.table']
  }, {
    title: 'keyword in with clause table name',
    sql: ["with table as (\n          select *\n          from unnest(array[1, 2])\n      )\n      select * from table", 'WITH table AS (SELECT * FROM UNNEST(ARRAY[1, 2])) SELECT * FROM table']
  }, {
    title: 'keyword in column',
    sql: ["SELECT * FROM shop.clothes WHERE type = 'shoe'", "SELECT * FROM shop.clothes WHERE type = 'shoe'"]
  }, {
    title: 'alias clause using keyword',
    sql: ["select 'hello' as session", "SELECT 'hello' AS session"]
  }, {
    title: 'unset parameter using @',
    sql: ['select * from unnest(@whatever)', 'SELECT * FROM UNNEST(@whatever)']
  }, {
    title: 'count distinct',
    sql: ['select count(distinct id || name) from product.organization', 'SELECT COUNT(DISTINCT id || name) FROM product.organization']
  }, {
    title: 'integer type',
    sql: ["select cast ('2' as integer)", "SELECT CAST('2' AS INTEGER)"]
  }, {
    title: 'data_trunc function column',
    sql: ['SELECT DATE_TRUNC(my_date, YEAR)', 'SELECT DATE_TRUNC(my_date, YEAR)']
  }, {
    title: 'safe cast',
    sql: ['SELECT SAFE_CAST(1 AS STRING)', 'SELECT SAFE_CAST(1 AS STRING)']
  }, {
    title: 'extract timestamp',
    sql: ['select extract(year from timestamp)', 'SELECT EXTRACT(YEAR FROM timestamp)']
  }, {
    title: 'in unset expr',
    sql: ['select a from x where a in unnest(:param)', 'SELECT a FROM x WHERE a IN UNNEST(:param)']
  }, {
    title: 'logical operator in where clause',
    sql: ["select *\n        from\n            unnest([ ('a'), ('b'), ('c'), ('ab')]) as col\n        where col = 'a' || 'b'", "SELECT * FROM UNNEST([('a'), ('b'), ('c'), ('ab')]) AS col WHERE col = 'a' || 'b'"]
  }, {
    title: 'any_value function',
    sql: ['SELECT ANY_VALUE(x having max y)', 'SELECT ANY_VALUE(x HAVING MAX y)']
  }, {
    title: 'any_value function with over',
    sql: ['SELECT ANY_VALUE(x) OVER (PARTITION BY column1 ORDER BY column2 ASC)', 'SELECT ANY_VALUE(x) OVER (PARTITION BY column1 ORDER BY column2 ASC)']
  }, {
    title: 'preserving double parenthesis',
    sql: ['SELECT COUNT(( SELECT x))', 'SELECT COUNT((SELECT x))']
  }, {
    title: 'interval isoyear',
    sql: ['SELECT DATE_TRUNC(CURRENT_DATE(), INTERVAL 1 ISOYEAR)', 'SELECT DATE_TRUNC(CURRENT_DATE(), INTERVAL 1 ISOYEAR)']
  }, {
    title: 'extract field',
    sql: ['SELECT TIMESTAMP(DATE_SUB(CURRENT_DATETIME(), INTERVAL EXTRACT(DAYOFWEEK FROM CURRENT_DATETIME())-1 DAY))', 'SELECT TIMESTAMP(DATE_SUB(CURRENT_DATETIME(), INTERVAL EXTRACT(DAYOFWEEK FROM CURRENT_DATETIME()) - 1 DAY))']
  }, {
    title: 'create table',
    sql: ['CREATE TABLE mydataset.newtable ( x INT64 );', 'CREATE TABLE mydataset.newtable (x INT64)']
  }, {
    title: 'create table with multiple options',
    sql: ["CREATE OR REPLACE TEMP TABLE\n        table1\n      DEFAULT COLLATE 'und:ci'\n      PARTITION BY\n        DATE(event_time)\n      CLUSTER BY\n        id\n      OPTIONS (\n        require_partition_filter = TRUE\n      )\n      AS\n      SELECT\n        table2.id,\n        table2.value,\n        table2.event_time\n      FROM\n        table2;", "CREATE OR REPLACE TEMP TABLE table1 DEFAULT COLLATE 'und:ci' PARTITION BY DATE(event_time) CLUSTER BY id OPTIONS (require_partition_filter = TRUE) AS SELECT table2.id, table2.value, table2.event_time FROM table2"]
  }, {
    title: 'string_agg function',
    sql: ['SELECT string_agg(DISTINCT column1) as some_column1, string_agg(column2) as some_column1 from table1', 'SELECT string_agg(DISTINCT column1) AS some_column1, string_agg(column2) AS some_column1 FROM table1']
  }, {
    title: 'if multiple parentheses',
    sql: ['select if(((a)), b, null)', 'SELECT if((a), b, NULL)']
  }, {
    title: 'offset column with dot',
    sql: ["WITH your_table AS (\n          SELECT [STRUCT(1 AS id, 'John' AS name), STRUCT(2 AS id, 'Jane' AS name)] AS some_array_column\n        )\n        SELECT some_array_column[SAFE_OFFSET(0)].id from your_table where 1=1 and check_run.pull_requests[SAFE_OFFSET(0)].number = 6097 and check_run.status = 'completed' and check_run.output.title IS NOT NULL AND check_run.pull_requests[SAFE_OFFSET(0)].id is not null", "WITH your_table AS (SELECT [STRUCT(1 AS id, 'John' AS name), STRUCT(2 AS id, 'Jane' AS name)] AS some_array_column) SELECT some_array_column[SAFE_OFFSET(0)].id FROM your_table WHERE 1 = 1 AND check_run.pull_requests[SAFE_OFFSET(0)].number = 6097 AND check_run.status = 'completed' AND check_run.output.title IS NOT NULL AND check_run.pull_requests[SAFE_OFFSET(0)].id IS NOT NULL"]
  }, {
    title: 'json expr',
    sql: ["SELECT json_value.class.students[0]['name'] AS first_student\n        FROM\n          UNNEST(\n            [\n              JSON '{\"class\" : {\"students\" : [{\"name\" : \"Jane\"}]}}',\n              JSON '{\"class\" : {\"students\" : []}}',\n              JSON '{\"class\" : {\"students\" : [{\"name\" : \"John\"}, {\"name\": \"Jamie\"}]}}'])\n        AS json_value", "SELECT json_value.class.students[0]['name'] AS first_student FROM UNNEST([JSON '{\"class\" : {\"students\" : [{\"name\" : \"Jane\"}]}}', JSON '{\"class\" : {\"students\" : []}}', JSON '{\"class\" : {\"students\" : [{\"name\" : \"John\"}, {\"name\": \"Jamie\"}]}}']) AS json_value"]
  }, {
    title: 'interval week unit',
    sql: ['SELECT * WHERE created_at >= DATE_SUB(CURRENT_DATE(), INTERVAL 1 WEEK)', 'SELECT * WHERE created_at >= DATE_SUB(CURRENT_DATE(), INTERVAL 1 WEEK)']
  }];
  SQL_LIST.forEach(function (sqlInfo) {
    var title = sqlInfo.title,
      sql = sqlInfo.sql;
    it("should support ".concat(title), function () {
      expect(getParsedSql(sql[0], opt)).to.equal(sql[1]);
    });
  });
  it('should return empty str for non-array-struct', function () {
    expect(arrayStructValueToSQL({
      type: 'non-array-struct'
    })).to.equal('');
  });
  it('should support schema in bigquery from clause', function () {
    var catalog = 'project';
    var schema = 'retail';
    var table = 'customers';
    var sql = "select * from ".concat(catalog, ".").concat(schema, ".").concat(table, " limit 3");
    var ast = parser.astify(sql, opt);
    var fromClause = ast.from[0];
    expect(fromClause.catalog).to.be.equal(catalog);
    expect(fromClause.db).to.be.equal(catalog);
    expect(fromClause.schema).to.be.equal(schema);
    expect(fromClause.table).to.be.equal(table);
    expect(parser.sqlify(ast, opt)).to.be.equal('SELECT * FROM project.retail.customers LIMIT 3');
  });
  it('should return empty column list for extract column only', function () {
    var sql = "SELECT EXTRACT(DAY FROM DATE '2013-12-25') as the_day FROM table1;";
    var _parser$parse = parser.parse(sql, opt),
      columnList = _parser$parse.columnList;
    expect(columnList).to.be.eql([]);
  });
  it(SQL_LIST[16].title, function () {
    var ast = parser.astify(SQL_LIST[16].sql[0], opt);
    var expr = ast[0].from[0].expr;
    expr.parentheses = false;
    expr.expr_list = {
      type: 'string',
      value: 'abc'
    };
    expect(arrayStructValueToSQL(expr)).to.equal("['".concat(expr.expr_list.value, "']"));
    expr.brackets = false;
    expr.parentheses = false;
    expect(arrayStructValueToSQL(expr)).to.equal("'".concat(expr.expr_list.value, "'"));
  });
  it('should return undefined and dataType', function () {
    expect(arrayStructTypeToSQL()).to.equal(undefined);
    expect(arrayStructTypeToSQL({
      dataType: 'array'
    })).to.equal('ARRAY undefined');
  });
  it('should support record type access', function () {
    var sql = 'select a.b.c.d.e.f from a';
    var ast = parser.astify(sql, opt);
    var column = {
      expr: {
        type: 'column_ref',
        table: 'a',
        column: 'b',
        subFields: ['c', 'd', 'e', 'f']
      },
      as: null
    };
    expect(ast.columns[0]).to.eql(column);
  });
  it('should get the correct column list', function () {
    var sql = 'SELECT EXTRACT(ISOWEEK FROM mydate)';
    var ast = parser.parse(sql, opt);
    expect(ast.columnList).to.be.eql(['select::null::mydate']);
    sql = 'SELECT DATE_TRUNC(my_date, YEAR)';
    ast = parser.parse(sql, opt);
    expect(ast.columnList).to.be.eql(['select::null::my_date']);
  });
});

/***/ }),

/***/ "./test/cmd.spec.js":
/*!**************************!*\
  !*** ./test/cmd.spec.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(/*! chai */ "chai"),
  expect = _require.expect;
var Parser = __webpack_require__(/*! ../src/parser */ "./src/parser.js")["default"];
var _require2 = __webpack_require__(/*! ../src/command */ "./src/command.js"),
  renameToSQL = _require2.renameToSQL,
  commonCmdToSQL = _require2.commonCmdToSQL;
describe('Command SQL', function () {
  var parser = new Parser();
  var sql;
  function getParsedSql(sql, opt) {
    var ast = parser.astify(sql, opt);
    return parser.sqlify(ast, opt);
  }
  describe('drop and truncate', function () {
    ['drop', 'truncate'].forEach(function (action) {
      it("should support MySQL ".concat(action), function () {
        expect(getParsedSql("".concat(action, " table tableA"))).to.equal("".concat(action.toUpperCase(), " TABLE `tableA`"));
      });
      it("should support MySQL ".concat(action, " with db prefix"), function () {
        expect(getParsedSql("".concat(action, " table dbA.tableA"))).to.equal("".concat(action.toUpperCase(), " TABLE `dbA`.`tableA`"));
      });
      it("should support MySQL ".concat(action, " with semicolon suffix"), function () {
        expect(getParsedSql("".concat(action, " table dbA.tableA;"))).to.equal("".concat(action.toUpperCase(), " TABLE `dbA`.`tableA`"));
      });
    });
    it("should truncate TABLE optional", function () {
      expect(getParsedSql('truncate  dbA.tableA')).to.equal('TRUNCATE TABLE `dbA`.`tableA`');
      expect(getParsedSql('truncate tableA')).to.equal('TRUNCATE TABLE `tableA`');
      expect(getParsedSql('truncate TABLE tableA')).to.equal('TRUNCATE TABLE `tableA`');
    });
    it('should support unsupported keyword', function () {
      var ast = {
        "type": "truncate",
        "table": [{
          "db": null,
          "table": "abc",
          "as": null
        }]
      };
      expect(commonCmdToSQL(ast)).to.be.equal(ast.type.toUpperCase());
    });
    it('should support drop procedure in tsql', function () {
      var opt = {
        database: 'transactsql'
      };
      expect(getParsedSql('drop procedure [test]', opt)).to.equal('DROP PROCEDURE [test]');
      expect(getParsedSql('drop procedure test', opt)).to.equal('DROP PROCEDURE [test]');
    });
  });
  describe('rename', function () {
    it("should support MySQL rename", function () {
      expect(getParsedSql('rename table a to b')).to.equal('RENAME TABLE `a` TO `b`');
    });
    it("should support MySQL rename empty table", function () {
      expect(renameToSQL({
        type: 'rename'
      })).to.equal('RENAME TABLE ');
    });
    it("should support MySQL rename multiples", function () {
      expect(getParsedSql('rename table a to b, c to d')).to.equal('RENAME TABLE `a` TO `b`, `c` TO `d`');
    });
    it("should support MySQL rename multiples with db prefix", function () {
      expect(getParsedSql('rename table d.a to d.b, d.c to d.d')).to.equal('RENAME TABLE `d`.`a` TO `d`.`b`, `d`.`c` TO `d`.`d`');
    });
  });
  describe('call', function () {
    it('should support MySQL call', function () {
      expect(getParsedSql('call sp(1, "123")')).to.equal('CALL sp(1, "123")');
    });
    it('should support MySQL call with no parameters', function () {
      expect(getParsedSql('call sp()')).to.equal('CALL sp()');
    });
    it('should support MySQL call without parentheses and parameters', function () {
      expect(getParsedSql('call sp')).to.equal('CALL sp');
    });
    it('should support MySQL call without dynamic value', function () {
      expect(getParsedSql('call sp(@firstParameter, @secondParameter)')).to.equal('CALL sp(@firstParameter, @secondParameter)');
    });
    it('should support MySQL call with multiple different type parameters', function () {
      expect(getParsedSql('call sp(12, "test", @firstParameter)')).to.equal('CALL sp(12, "test", @firstParameter)');
    });
    it('should support MySQL call cross database', function () {
      expect(getParsedSql('call db.sp(12, "test", @firstParameter)')).to.equal('CALL db.sp(12, "test", @firstParameter)');
      expect(getParsedSql('call `db`.`sp`(12, "test", @firstParameter);')).to.equal('CALL `db`.`sp`(12, "test", @firstParameter)');
      expect(getParsedSql('call `db`.`sp`')).to.equal('CALL `db`.`sp`');
    });
  });
  describe('desc', function () {
    ['desc', 'describe'].forEach(function (keyword) {
      it("should support MySQL ".concat(keyword), function () {
        expect(getParsedSql("".concat(keyword, " tableA"))).to.equal('DESC `tableA`');
      });
    });
  });
  describe('use', function () {
    it("should support MySQL use", function () {
      expect(getParsedSql('use databaseA')).to.equal('USE `databaseA`');
    });
    it("should support MySQL use with semicolon", function () {
      expect(getParsedSql('use databaseA;')).to.equal('USE `databaseA`');
    });
  });
  describe('multiple statement with cmd', function () {
    it("should support cmd multiple use", function () {
      expect(getParsedSql('use databaseA;drop table tableA;truncate table tableB; call sp')).to.equal('USE `databaseA` ; DROP TABLE `tableA` ; TRUNCATE TABLE `tableB` ; CALL sp');
    });
    it("should support cmd and crud multiple use", function () {
      expect(getParsedSql('select * from tableD;use databaseA;drop table tableA;truncate table tableB; call sp;delete from tableC;insert into tableE values("123");update tableF set id="333"')).to.equal('SELECT * FROM `tableD` ; USE `databaseA` ; DROP TABLE `tableA` ; TRUNCATE TABLE `tableB` ; CALL sp ; DELETE FROM `tableC` ; INSERT INTO `tableE` VALUES ("123") ; UPDATE `tableF` SET `id` = "333"');
    });
  });
  describe('alter', function () {
    var KEYWORDS = ['', 'COLUMN '];
    it("should support MySQL alter add column", function () {
      KEYWORDS.forEach(function (keyword) {
        expect(getParsedSql("alter table a add ".concat(keyword, "xxx int"))).to.equal("ALTER TABLE `a` ADD ".concat(keyword, "`xxx` INT"));
        expect(getParsedSql("alter table a add ".concat(keyword, "yyy varchar(128)"))).to.equal("ALTER TABLE `a` ADD ".concat(keyword, "`yyy` VARCHAR(128)"));
        expect(getParsedSql("alter table a add ".concat(keyword, "zzz varchar(128), add aaa date"))).to.equal("ALTER TABLE `a` ADD ".concat(keyword, "`zzz` VARCHAR(128), ADD `aaa` DATE"));
      });
    });
    it('should change column', function () {
      expect(getParsedSql('alter table places change city city2 varchar(255)')).to.equal('ALTER TABLE `places` CHANGE `city` `city2` VARCHAR(255)');
      expect(getParsedSql('alter table places change city city2 varchar(255) first city')).to.equal('ALTER TABLE `places` CHANGE `city` `city2` VARCHAR(255) FIRST `city`');
    });
    it('should support alter column with algorithm and lock option', function () {
      expect(getParsedSql("ALTER TABLE `test`.`test` ADD COLUMN test VARCHAR(20) NOT NULL DEFAULT 'xx', ALGORITHM=INPLACE, LOCK=NONE;")).to.equal("ALTER TABLE `test`.`test` ADD COLUMN `test` VARCHAR(20) NOT NULL DEFAULT 'xx', ALGORITHM = INPLACE, LOCK = NONE");
    });
    it('should support alter with BIT type', function () {
      expect(getParsedSql('ALTER TABLE newtable ADD newcol BIT(1)')).to.equal('ALTER TABLE `newtable` ADD `newcol` BIT(1)');
    });
    it('should support alter drop primary key', function () {
      expect(getParsedSql('alter table places drop primary key')).to.equal('ALTER TABLE `places` DROP PRIMARY KEY');
      expect(getParsedSql('alter table places drop foreign key abc')).to.equal('ALTER TABLE `places` DROP FOREIGN KEY `abc`');
    });
    it('should support alter without expr', function () {
      var expr = [{
        "action": "add",
        "column": {
          type: 'column_ref',
          table: null,
          column: 'xxx'
        },
        "definition": {
          "dataType": "INT"
        },
        "keyword": "COLUMN",
        "resource": "column",
        "type": "alter"
      }];
      var resource = 'unknown';
      var ast = {
        "type": "alter",
        "table": [{
          "db": null,
          "table": "a",
          "as": null
        }]
      };
      expect(parser.sqlify(ast)).to.be.equal('ALTER TABLE `a`');
      ast.expr = expr;
      expect(parser.sqlify(ast)).to.be.equal('ALTER TABLE `a` ADD COLUMN \`xxx\` INT');
      expr[0].resource = resource;
      expect(parser.sqlify(ast)).to.be.equal('ALTER TABLE `a` ADD COLUMN');
    });
    it("should support MySQL alter drop check and column", function () {
      KEYWORDS.concat(['CHECK ']).forEach(function (keyword) {
        expect(getParsedSql("alter table a drop ".concat(keyword, "xxx"))).to.equal("ALTER TABLE `a` DROP ".concat(keyword, "`xxx`"));
        expect(getParsedSql("alter table a drop ".concat(keyword, "xxx, drop ").concat(keyword, "yyy"))).to.equal("ALTER TABLE `a` DROP ".concat(keyword, "`xxx`, DROP ").concat(keyword, "`yyy`"));
      });
      expect(getParsedSql("alter table a drop constraint xxx", {
        database: 'transactsql'
      })).to.equal('ALTER TABLE [a] DROP CONSTRAINT [xxx]');
    });
    it('should support alter add constraint definition', function () {
      expect(getParsedSql("ALTER TABLE `CSEHistory` ADD CONSTRAINT `CSEHistoryDel` FOREIGN KEY ( `SystemUUID` ) REFERENCES `Systems` (UUID)\n      ON UPDATE RESTRICT ON\n      DELETE CASCADE")).to.equal('ALTER TABLE `CSEHistory` ADD CONSTRAINT `CSEHistoryDel` FOREIGN KEY (`SystemUUID`) REFERENCES `Systems` (`UUID`) ON UPDATE RESTRICT ON DELETE CASCADE');
    });
    it('should support alter add constraint check', function () {
      var opt = {
        database: 'transactsql'
      };
      expect(getParsedSql("ALTER TABLE Persons ADD CHECK (Age>=18)")).to.equal('ALTER TABLE `Persons` ADD CHECK (`Age` >= 18)');
      expect(getParsedSql("ALTER TABLE Persons ADD CONSTRAINT CHK_PersonAge CHECK (Age>=18 AND City='Sandnes');")).to.equal('ALTER TABLE `Persons` ADD CONSTRAINT \`CHK_PersonAge\` CHECK (`Age` >= 18 AND `City` = \'Sandnes\')');
      expect(getParsedSql("ALTER TABLE Persons ADD CHECK (Age>=18)", opt)).to.equal('ALTER TABLE [Persons] ADD CHECK ([Age] >= 18)');
      expect(getParsedSql("ALTER TABLE Persons ADD CONSTRAINT CHK_PersonAge CHECK (Age>=18 AND City='Sandnes')", opt));
      expect(getParsedSql('ALTER TABLE [test] alter COLUMN [a] NVARCHAR(MAX) NOT NULL;', opt)).to.equal('ALTER TABLE [test] ALTER COLUMN [a] NVARCHAR(max) NOT NULL');
    });
    it('should support enable and disable check constraint', function () {
      var opt = {
        database: 'transactsql'
      };
      expect(getParsedSql("ALTER TABLE Persons with check check constraint check_salary", opt)).to.equal('ALTER TABLE [Persons] WITH CHECK CHECK CONSTRAINT [check_salary]');
      expect(getParsedSql("ALTER TABLE Persons nocheck constraint check_salary", opt)).to.equal('ALTER TABLE [Persons] NOCHECK CONSTRAINT [check_salary]');
    });
    it('should support MySQL alter mix action', function () {
      KEYWORDS.forEach(function (keyword) {
        expect(getParsedSql("alter table a drop ".concat(keyword, "xxx, add ").concat(keyword, "yyy varchar(256), add ").concat(keyword, "zzz date, drop ").concat(keyword, " aaa"))).to.equal("ALTER TABLE `a` DROP ".concat(keyword, "`xxx`, ADD ").concat(keyword, "`yyy` VARCHAR(256), ADD ").concat(keyword, "`zzz` DATE, DROP ").concat(keyword, "`aaa`"));
      });
    });
    it("should support MySQL alter add index or key", function () {
      ["index", "key"].forEach(function (keyword) {
        expect(getParsedSql("alter table a add ".concat(keyword, " (`name`, `alias`)"))).to.equal("ALTER TABLE `a` ADD ".concat(keyword.toUpperCase(), " (`name`, `alias`)"));
        expect(getParsedSql("alter table a add ".concat(keyword, " name_idx (`name`, `alias`)"))).to.equal("ALTER TABLE `a` ADD ".concat(keyword.toUpperCase(), " name_idx (`name`, `alias`)"));
        expect(getParsedSql("ALTER TABLE `a` ADD ".concat(keyword, " name_idx using btree (`name`, `alias`)"))).to.equal("ALTER TABLE `a` ADD ".concat(keyword.toUpperCase(), " name_idx USING BTREE (`name`, `alias`)"));
        expect(getParsedSql("alter table a add ".concat(keyword, " name_idx (`name`, `alias`) KEY_BLOCK_SIZE = 324"))).to.equal("ALTER TABLE `a` ADD ".concat(keyword.toUpperCase(), " name_idx (`name`, `alias`) KEY_BLOCK_SIZE = 324"));
        expect(getParsedSql("alter table a add ".concat(keyword, " name_idx using hash (`name`, `alias`) KEY_BLOCK_SIZE = 324"))).to.equal("ALTER TABLE `a` ADD ".concat(keyword.toUpperCase(), " name_idx USING HASH (`name`, `alias`) KEY_BLOCK_SIZE = 324"));
        expect(getParsedSql("alter table a add ".concat(keyword, " name_idx using hash (`name`, `alias`) KEY_BLOCK_SIZE 123"))).to.equal("ALTER TABLE `a` ADD ".concat(keyword.toUpperCase(), " name_idx USING HASH (`name`, `alias`) KEY_BLOCK_SIZE 123"));
        expect(getParsedSql("alter table a add ".concat(keyword, " name_idx using hash (`name`, `alias`) with parser parser_name"))).to.equal("ALTER TABLE `a` ADD ".concat(keyword.toUpperCase(), " name_idx USING HASH (`name`, `alias`) WITH PARSER parser_name"));
        expect(getParsedSql("alter table a add ".concat(keyword, " name_idx using hash (`name`, `alias`) visible"))).to.equal("ALTER TABLE `a` ADD ".concat(keyword.toUpperCase(), " name_idx USING HASH (`name`, `alias`) VISIBLE"));
        expect(getParsedSql("alter table a add ".concat(keyword, " name_idx using hash (`name`, `alias`) invisible"))).to.equal("ALTER TABLE `a` ADD ".concat(keyword.toUpperCase(), " name_idx USING HASH (`name`, `alias`) INVISIBLE"));
        expect(getParsedSql("alter table a add ".concat(keyword, " name_idx (`name`, `alias`) using hash"))).to.equal("ALTER TABLE `a` ADD ".concat(keyword.toUpperCase(), " name_idx (`name`, `alias`) USING HASH"));
        expect(getParsedSql("alter table a add ".concat(keyword, " name_idx (`name`, `alias`) using btree"))).to.equal("ALTER TABLE `a` ADD ".concat(keyword.toUpperCase(), " name_idx (`name`, `alias`) USING BTREE"));
      });
    });
    ["fulltext", "spatial"].forEach(function (kc) {
      it("should support MySQL alter add ".concat(kc, " index or key"), function () {
        ["index", "key"].forEach(function (keyword) {
          expect(getParsedSql("alter table a add ".concat(kc, "  (\"name\", \"alias\")"))).to.equal("ALTER TABLE `a` ADD ".concat(kc.toUpperCase(), " (\"name\", \"alias\")"));
          expect(getParsedSql("alter table a add ".concat(kc, " ").concat(keyword, " name_idx (\"name\", \"alias\")"))).to.equal("ALTER TABLE `a` ADD ".concat(kc.toUpperCase(), " ").concat(keyword.toUpperCase(), " name_idx (\"name\", \"alias\")"));
          expect(getParsedSql("alter table a add ".concat(kc, " ").concat(keyword, " name_idx (\"name\", \"alias\") KEY_BLOCK_SIZE = 324"))).to.equal("ALTER TABLE `a` ADD ".concat(kc.toUpperCase(), " ").concat(keyword.toUpperCase(), " name_idx (\"name\", \"alias\") KEY_BLOCK_SIZE = 324"));
          expect(getParsedSql("alter table a add ".concat(kc, " ").concat(keyword, " name_idx (\"name\", \"alias\") KEY_BLOCK_SIZE 123"))).to.equal("ALTER TABLE `a` ADD ".concat(kc.toUpperCase(), " ").concat(keyword.toUpperCase(), " name_idx (\"name\", \"alias\") KEY_BLOCK_SIZE 123"));
          expect(getParsedSql("alter table a add ".concat(kc, " ").concat(keyword, " name_idx (\"name\", \"alias\") with parser parser_name"))).to.equal("ALTER TABLE `a` ADD ".concat(kc.toUpperCase(), " ").concat(keyword.toUpperCase(), " name_idx (\"name\", \"alias\") WITH PARSER parser_name"));
          expect(getParsedSql("alter table a add ".concat(kc, " ").concat(keyword, " name_idx (\"name\", \"alias\") invisible"))).to.equal("ALTER TABLE `a` ADD ".concat(kc.toUpperCase(), " ").concat(keyword.toUpperCase(), " name_idx (\"name\", \"alias\") INVISIBLE"));
          expect(getParsedSql("alter table a add ".concat(kc, " ").concat(keyword, " name_idx ('name', 'alias') visible"))).to.equal("ALTER TABLE `a` ADD ".concat(kc.toUpperCase(), " ").concat(keyword.toUpperCase(), " name_idx ('name', 'alias') VISIBLE"));
          expect(getParsedSql("alter table a add ".concat(kc, " ").concat(keyword, " name_idx ('name', 'alias')"))).to.equal("ALTER TABLE `a` ADD ".concat(kc.toUpperCase(), " ").concat(keyword.toUpperCase(), " name_idx ('name', 'alias')"));
        });
      });
    });
    ['to', 'as'].forEach(function (kw) {
      it("should support alter rename ".concat(kw, " table"), function () {
        var sql = "alter table oldTable rename ".concat(kw, " newTable");
        expect(getParsedSql(sql)).to.equal("ALTER TABLE `oldTable` RENAME ".concat(kw.toUpperCase(), " `newTable`"));
      });
    });
    it("should support MySQL rename column", function () {
      expect(getParsedSql('alter table a rename column id to player_id')).to.equal('ALTER TABLE `a` RENAME COLUMN `id` TO `player_id`');
    });
  });
  describe('set', function () {
    it('should support set variable definde', function () {
      expect(getParsedSql("set @a = 123;")).to.equal("SET @a = 123");
      expect(getParsedSql("set @a = 123; set @b = \"mm\"")).to.equal("SET @a = 123 ; SET @b = \"mm\"");
      expect(getParsedSql("set @a.id = 123; set @b.yy.xx = \"mm\"")).to.equal("SET @a.id = 123 ; SET @b.yy.xx = \"mm\"");
    });
    it('should support set keyword variable defined', function () {
      var KEYWORDS = ['GLOBAL', 'SESSION', 'LOCAL', 'PERSIST', 'PERSIST_ONLY'];
      KEYWORDS.forEach(function (keyword) {
        expect(getParsedSql("set ".concat(keyword, " xx.yy = 123; set ").concat(keyword, " yy = \"abc\""))).to.equal("SET ".concat(keyword, " xx.yy = 123 ; SET ").concat(keyword, " yy = \"abc\""));
        expect(getParsedSql("set @@".concat(keyword, ".id = 123; set @@").concat(keyword, ".yy.xx = \"abcd\""))).to.equal("SET @@".concat(keyword, ".id = 123 ; SET @@").concat(keyword, ".yy.xx = \"abcd\""));
      });
    });
  });
  describe('unlock', function () {
    it('should support unlock tables', function () {
      expect(getParsedSql("unlock tables")).to.equal("UNLOCK TABLES");
    });
  });
  describe('lock', function () {
    var lockType = ['read', 'read local', 'low_priority write', 'write'];
    lockType.forEach(function (lock_type) {
      it("should support lock tables with ".concat(lock_type), function () {
        expect(getParsedSql("lock tables d1.t1 as ta1 ".concat(lock_type))).to.equal("LOCK TABLES `d1`.`t1` AS `ta1` ".concat(lock_type.toUpperCase()));
      });
    });
    it('should support lock multiple tables', function () {
      expect(getParsedSql("lock tables d1.t1 as ta1 read, d2.t2 t3 write")).to.equal('LOCK TABLES `d1`.`t1` AS `ta1` READ, `d2`.`t2` AS `t3` WRITE');
    });
    it('should support pg lock', function () {
      var opt = {
        database: 'postgresql'
      };
      expect(getParsedSql('lock table t1, t2', opt)).to.equal('LOCK TABLE "t1", "t2"');
      expect(getParsedSql('lock table t1, t2 in row share mode', opt)).to.equal('LOCK TABLE "t1", "t2" IN ROW SHARE MODE');
      expect(getParsedSql('lock table t1, t2 in row share mode nowait', opt)).to.equal('LOCK TABLE "t1", "t2" IN ROW SHARE MODE NOWAIT');
    });
  });
  describe('declare in tsql', function () {
    var opt = {
      database: 'transactsql'
    };
    it('should support declare variables', function () {
      expect(getParsedSql('DECLARE @find varchar(30)', opt)).to.equal('DECLARE @find VARCHAR(30)');
      expect(getParsedSql("DECLARE @find varchar(30) = 'Man%'", opt)).to.equal("DECLARE @find VARCHAR(30) = 'Man%'");
      expect(getParsedSql('DECLARE @Group nvarchar(50), @Sales money', opt)).to.equal('DECLARE @Group NVARCHAR(50), @Sales MONEY');
    });
    it('should support declare variables', function () {
      var ast = parser.astify('DECLARE @find varchar(30)', opt);
      ast.declare[0].keyword = null;
      expect(parser.sqlify(ast, opt)).to.equal('DECLARE @find');
    });
    it('should support declare cursor', function () {
      expect(getParsedSql('DECLARE @find CURSOR', opt)).to.equal('DECLARE @find CURSOR');
    });
    it('should support declare table', function () {
      expect(getParsedSql("DECLARE @MyTableVar table(\n        EmpID int NOT NULL,\n        OldVacationHours int,\n        NewVacationHours int,\n        ModifiedDate datetime);", opt)).to.equal('DECLARE @MyTableVar TABLE ([EmpID] INT NOT NULL, [OldVacationHours] INT, [NewVacationHours] INT, [ModifiedDate] DATETIME)');
    });
    it('should support declare with other sql', function () {
      expect(getParsedSql("DECLARE @QuizID BIGINT;\n      INSERT INTO quiz\n      (name, max_attempts, num_questions, passing_score)\n      VALUES ('Class Quiz', 3, 10, 70);\n      SELECT @QuizID = (SELECT SCOPE_IDENTITY());", opt)).to.equal("DECLARE @QuizID BIGINT ; INSERT INTO [quiz] (name, max_attempts, num_questions, passing_score) VALUES ('Class Quiz',3,10,70) ; SELECT [@QuizID] = (SELECT SCOPE_IDENTITY())");
    });
  });
  describe('drop', function () {
    it('should support drop index', function () {
      expect(getParsedSql('DROP INDEX IX_NAME ON TABLE_NAME;')).to.equal('DROP INDEX `IX_NAME` ON `TABLE_NAME`');
      expect(getParsedSql('DROP INDEX abc.IX_NAME ON TABLE_NAME algorithm inplace;')).to.equal('DROP INDEX `abc`.`IX_NAME` ON `TABLE_NAME` ALGORITHM INPLACE');
      expect(getParsedSql('DROP INDEX abc.IX_NAME ON TABLE_NAME algorithm = copy lock SHARED;')).to.equal('DROP INDEX `abc`.`IX_NAME` ON `TABLE_NAME` ALGORITHM = COPY LOCK SHARED');
    });
    it('should support drop index for tsql', function () {
      var opt = {
        database: 'transactsql'
      };
      expect(getParsedSql('DROP INDEX IX_NAME ON TABLE_NAME;', opt)).to.equal('DROP INDEX [IX_NAME] ON [TABLE_NAME]');
      expect(getParsedSql('DROP INDEX abc.IX_NAME ON TABLE_NAME algorithm inplace;', opt)).to.equal('DROP INDEX [abc].[IX_NAME] ON [TABLE_NAME] ALGORITHM INPLACE');
      expect(getParsedSql('DROP INDEX abc.IX_NAME ON TABLE_NAME algorithm = copy lock SHARED;', opt)).to.equal('DROP INDEX [abc].[IX_NAME] ON [TABLE_NAME] ALGORITHM = COPY LOCK SHARED');
    });
  });
  describe('go', function () {
    it("should support go", function () {
      expect(getParsedSql('use abc go')).to.equal('USE `abc` GO');
      expect(getParsedSql('use abc; select * from abc go update abc set id = 1')).to.equal('USE `abc` ; SELECT * FROM `abc` GO UPDATE `abc` SET `id` = 1');
    });
    it("should support multiple go", function () {
      expect(getParsedSql('use abc; select * from abc go update abc set id = 1 go select id from abc')).to.equal('USE `abc` ; SELECT * FROM `abc` GO UPDATE `abc` SET `id` = 1 GO SELECT `id` FROM `abc`');
    });
  });
});

/***/ }),

/***/ "./test/create.spec.js":
/*!*****************************!*\
  !*** ./test/create.spec.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(/*! chai */ "chai"),
  expect = _require.expect;
var Parser = __webpack_require__(/*! ../src/parser */ "./src/parser.js")["default"];
var _require2 = __webpack_require__(/*! ../src/index-definition */ "./src/index-definition.js"),
  indexOptionToSQL = _require2.indexOptionToSQL,
  indexTypeAndOptionToSQL = _require2.indexTypeAndOptionToSQL;
var _require3 = __webpack_require__(/*! ../src/util */ "./src/util.js"),
  columnOrderListToSQL = _require3.columnOrderListToSQL;
describe('create', function () {
  var parser = new Parser();
  var DEFAULT_OPT = {
    database: 'mysql'
  };
  var PG_OPT = {
    database: 'postgresql'
  };
  function getParsedSql(sql) {
    var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_OPT;
    var ast = parser.astify(sql, opt);
    return parser.sqlify(ast, opt);
  }
  describe('create table with basic', function () {
    it('should support create table', function () {
      expect(getParsedSql("create temporary table dbname.tableName (id int, name varchar(128), compeated boolean)")).to.equal('CREATE TEMPORARY TABLE `dbname`.`tableName` (`id` INT, `name` VARCHAR(128), `compeated` BOOLEAN)');
      expect(getParsedSql("create temporary table dbname.tableName (id int not null default 1, name varchar(128) null default \"xx\")")).to.equal('CREATE TEMPORARY TABLE `dbname`.`tableName` (`id` INT NOT NULL DEFAULT 1, `name` VARCHAR(128) NULL DEFAULT "xx")');
      expect(getParsedSql("create table dbname.tableName (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, date DATETIME not null unique key);")).to.equal('CREATE TABLE `dbname`.`tableName` (`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, `date` DATETIME NOT NULL UNIQUE KEY)');
      expect(getParsedSql("create table dbname.tableName (id INT(11) primary key) ENGINE = MEMORY default character SET = utf8 comment = 'comment test'")).to.equal('CREATE TABLE `dbname`.`tableName` (`id` INT(11) PRIMARY KEY) ENGINE = MEMORY DEFAULT CHARACTER SET = utf8 COMMENT = \'comment test\'');
      expect(getParsedSql("create table dbname.tableName (id decimal(11, 2) primary key, bc bit(6)) ENGINE = MEMORY default charset = utf8 comment = 'comment test'")).to.equal('CREATE TABLE `dbname`.`tableName` (`id` DECIMAL(11, 2) PRIMARY KEY, `bc` BIT(6)) ENGINE = MEMORY DEFAULT CHARSET = utf8 COMMENT = \'comment test\'');
      expect(getParsedSql("create table dbname.tableName (id INT(11) primary key) ENGINE = MEMORY default charset = utf8 comment = 'comment test'")).to.equal('CREATE TABLE `dbname`.`tableName` (`id` INT(11) PRIMARY KEY) ENGINE = MEMORY DEFAULT CHARSET = utf8 COMMENT = \'comment test\'');
      expect(getParsedSql('CREATE TABLE `Person` (`id_Person` int(10) unsigned NOT NULL AUTO_INCREMENT, `id_person_gender` int(11) unsigned zerofill NOT NULL, `id_person_origin` int(11) zerofill NOT NULL, `age` int(11) NOT NULL, `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, updateTime datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT "最新更新时间", `is_alive` tinyint(1) DEFAULT NULL, `updated_by` varchar(48) DEFAULT NULL, PRIMARY KEY (`id_Person`), UNIQUE KEY `pft_ge_or` (`id_person_gender`, `id_person_origin`) );')).to.equal('CREATE TABLE `Person` (`id_Person` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT, `id_person_gender` INT(11) UNSIGNED ZEROFILL NOT NULL, `id_person_origin` INT(11) ZEROFILL NOT NULL, `age` INT(11) NOT NULL, `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, `updateTime` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT "最新更新时间", `is_alive` TINYINT(1) DEFAULT NULL, `updated_by` VARCHAR(48) DEFAULT NULL, PRIMARY KEY (`id_Person`), UNIQUE KEY `pft_ge_or` (`id_person_gender`, `id_person_origin`))');
      expect(getParsedSql("create table dbname.tableName (id INT(11) primary key, name varchar(128) unique) ENGINE = MEMORY compression = 'zlib'")).to.equal('CREATE TABLE `dbname`.`tableName` (`id` INT(11) PRIMARY KEY, `name` VARCHAR(128) UNIQUE) ENGINE = MEMORY COMPRESSION = \'ZLIB\'');
      expect(getParsedSql("create table dbname.tableName (id INT(11), name varchar(128), primary key(id)) ENGINE = MEMORY compression = 'zlib'")).to.equal('CREATE TABLE `dbname`.`tableName` (`id` INT(11), `name` VARCHAR(128), PRIMARY KEY (`id`)) ENGINE = MEMORY COMPRESSION = \'ZLIB\'');
      expect(getParsedSql("create table dbname.tableName (id BIGINT(11), name varchar(128), primary key(id)) ENGINE = MEMORY compression = 'zlib'")).to.equal('CREATE TABLE `dbname`.`tableName` (`id` BIGINT(11), `name` VARCHAR(128), PRIMARY KEY (`id`)) ENGINE = MEMORY COMPRESSION = \'ZLIB\'');
      expect(getParsedSql("create table dbname.tableName (id INT(11), name varchar(128), update_time timestamp not null default current_timestamp ON update current_timestamp, primary key(id)) ENGINE = MEMORY compression = 'zlib'")).to.equal('CREATE TABLE `dbname`.`tableName` (`id` INT(11), `name` VARCHAR(128), `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE = MEMORY COMPRESSION = \'ZLIB\'');
      expect(getParsedSql("create table dbname.tableName (id INT(11), name text not null, mt mediumtext not null, lt longtext, tt tinytext, primary key(id)) ENGINE = MEMORY compression = 'zlib'")).to.equal('CREATE TABLE `dbname`.`tableName` (`id` INT(11), `name` TEXT NOT NULL, `mt` MEDIUMTEXT NOT NULL, `lt` LONGTEXT, `tt` TINYTEXT, PRIMARY KEY (`id`)) ENGINE = MEMORY COMPRESSION = \'ZLIB\'');
      expect(getParsedSql("create table dbname.tableName (id INT(11), float_a FLOAT not null, double_b DOUBLE, decimal_c DECIMAL (6,5), float_m float(7), float_md float(7,4), double_m double(6), double_md double(6, 3),primary key(id)) ENGINE = MEMORY compression = 'zlib'")).to.equal('CREATE TABLE `dbname`.`tableName` (`id` INT(11), `float_a` FLOAT NOT NULL, `double_b` DOUBLE, `decimal_c` DECIMAL(6, 5), `float_m` FLOAT(7), `float_md` FLOAT(7, 4), `double_m` DOUBLE(6), `double_md` DOUBLE(6, 3), PRIMARY KEY (`id`)) ENGINE = MEMORY COMPRESSION = \'ZLIB\'');
      expect(getParsedSql('CREATE TABLE `test` (`date` date NULL DEFAULT NULL, `datetime` datetime(6) NULL DEFAULT NULL);CREATE TABLE `test`.`Untitled` (`date` date NULL DEFAULT NULL, `datetime` datetime NULL DEFAULT NULL, `time` time NULL DEFAULT NULL, `timestamp` timestamp(6) NULL DEFAULT NULL);')).to.equal('CREATE TABLE `test` (`date` DATE NULL DEFAULT NULL, `datetime` DATETIME(6) NULL DEFAULT NULL) ; CREATE TABLE `test`.`Untitled` (`date` DATE NULL DEFAULT NULL, `datetime` DATETIME NULL DEFAULT NULL, `time` TIME NULL DEFAULT NULL, `timestamp` TIMESTAMP(6) NULL DEFAULT NULL)');
      expect(getParsedSql("CREATE TABLE `action`(`id` int NOT NULL AUTO_INCREMENT, `platform` enum('IOS','ANDROID','PC_WEB','MOBILE_WEB','ETC') NOT NULL DEFAULT 'PC_WEB', `size` ENUM('small', CONCAT('med','ium'), 'large'), `date` datetime NOT NULL,PRIMARY KEY (`id`));")).to.equal("CREATE TABLE `action` (`id` INT NOT NULL AUTO_INCREMENT, `platform` ENUM('IOS', 'ANDROID', 'PC_WEB', 'MOBILE_WEB', 'ETC') NOT NULL DEFAULT 'PC_WEB', `size` ENUM('small', CONCAT('med', 'ium'), 'large'), `date` DATETIME NOT NULL, PRIMARY KEY (`id`))");
      expect(getParsedSql("CREATE TABLE comp  (\n        id int(11) NOT NULL AUTO_INCREMENT,\n        compCode varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '\u6211\u662Fcomment',\n        compCode2 varchar(255) CHARACTER SET = utf8 COLLATE = utf8_general_ci NOT NULL COMMENT '\u6211\u662Fcomment'\n      ) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '\u6211\u662Fcomment' ROW_FORMAT = Dynamic")).to.equal("CREATE TABLE `comp` (`id` INT(11) NOT NULL AUTO_INCREMENT, `compCode` VARCHAR(255) NOT NULL COMMENT '我是comment' CHARACTER SET UTF8 COLLATE UTF8_GENERAL_CI, `compCode2` VARCHAR(255) NOT NULL COMMENT '我是comment' CHARACTER SET = UTF8 COLLATE = UTF8_GENERAL_CI) ENGINE = INNODB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '我是comment' ROW_FORMAT = DYNAMIC");
    });
    it('should support create temporary table', function () {
      expect(getParsedSql("create temporary table dbname.tableName (id INT primary key) ENGINE = MEMORY min_rows 10 max_rows 100")).to.equal('CREATE TEMPORARY TABLE `dbname`.`tableName` (`id` INT PRIMARY KEY) ENGINE = MEMORY MIN_ROWS 10 MAX_ROWS 100');
    });
    it('should support create if not exists table', function () {
      expect(getParsedSql("create table if /*comments*/ not  exists dbname.tableName (id INT(11) primary key) ENGINE = MEMORY")).to.equal('CREATE TABLE IF NOT EXISTS `dbname`.`tableName` (`id` INT(11) PRIMARY KEY) ENGINE = MEMORY');
    });
    it('should support create temporary if not exists table', function () {
      expect(getParsedSql("create temporary table if  not exists dbname.tableName (id INT(11) primary key) ENGINE = MEMORY")).to.equal('CREATE TEMPORARY TABLE IF NOT EXISTS `dbname`.`tableName` (`id` INT(11) PRIMARY KEY) ENGINE = MEMORY');
    });
    describe('column definition options', function () {
      it('should support create table with auto_increment', function () {
        expect(getParsedSql("create temporary table if not exists dbname.tableName (id INT(11) auto_increment primary key) ENGINE = MEMORY")).to.equal('CREATE TEMPORARY TABLE IF NOT EXISTS `dbname`.`tableName` (`id` INT(11) AUTO_INCREMENT PRIMARY KEY) ENGINE = MEMORY');
      });
      it('should support create table with engine', function () {
        expect(getParsedSql("create temporary table if not exists dbname.tableName (id INT(11) auto_increment primary key) ENGINE = innodb")).to.equal('CREATE TEMPORARY TABLE IF NOT EXISTS `dbname`.`tableName` (`id` INT(11) AUTO_INCREMENT PRIMARY KEY) ENGINE = INNODB');
      });
      it('should support create table with comment', function () {
        expect(getParsedSql("create temporary table if not exists dbname.tableName (id INT(11) auto_increment primary key comment \"id column\", name varchar(128) unique key comment \"user name\") ENGINE = MEMORY")).to.equal('CREATE TEMPORARY TABLE IF NOT EXISTS `dbname`.`tableName` (`id` INT(11) AUTO_INCREMENT PRIMARY KEY COMMENT "id column", `name` VARCHAR(128) UNIQUE KEY COMMENT "user name") ENGINE = MEMORY');
      });
      it('should support create table with collate', function () {
        expect(getParsedSql("create temporary table if not exists dbname.tableName (id INT(11) auto_increment primary key comment \"id column\" collate utf8_bin, name varchar(128) unique key comment \"user name\" collate utf8_bin) ENGINE = MEMORY")).to.equal('CREATE TEMPORARY TABLE IF NOT EXISTS `dbname`.`tableName` (`id` INT(11) AUTO_INCREMENT PRIMARY KEY COMMENT "id column" COLLATE UTF8_BIN, `name` VARCHAR(128) UNIQUE KEY COMMENT "user name" COLLATE UTF8_BIN) ENGINE = MEMORY');
      });
      it('should support create table with collate', function () {
        expect(getParsedSql("create temporary table if not exists dbname.tableName (id INT(11) auto_increment primary key comment \"id column\" collate utf8_bin, name varchar(128) unique key comment \"user name\" collate utf8_bin) ENGINE = MEMORY")).to.equal('CREATE TEMPORARY TABLE IF NOT EXISTS `dbname`.`tableName` (`id` INT(11) AUTO_INCREMENT PRIMARY KEY COMMENT "id column" COLLATE UTF8_BIN, `name` VARCHAR(128) UNIQUE KEY COMMENT "user name" COLLATE UTF8_BIN) ENGINE = MEMORY');
      });
      it('should support create table with column_format', function () {
        expect(getParsedSql("create temporary table if not exists dbname.tableName (id INT(11) auto_increment primary key comment \"id column\" collate utf8_bin column_format fixed, name varchar(128) unique key comment \"user name\" collate utf8_bin column_format dynamic) ENGINE = MEMORY")).to.equal('CREATE TEMPORARY TABLE IF NOT EXISTS `dbname`.`tableName` (`id` INT(11) AUTO_INCREMENT PRIMARY KEY COMMENT "id column" COLLATE UTF8_BIN COLUMN_FORMAT FIXED, `name` VARCHAR(128) UNIQUE KEY COMMENT "user name" COLLATE UTF8_BIN COLUMN_FORMAT DYNAMIC) ENGINE = MEMORY');
      });
      it('should support create table with storage', function () {
        expect(getParsedSql("create temporary table if not exists dbname.tableName (id INT(11) auto_increment primary key comment \"id column\" collate utf8_bin column_format fixed storage disk, name varchar(128) unique key comment \"user name\" collate utf8_bin column_format dynamic storage memory) ENGINE = MEMORY")).to.equal('CREATE TEMPORARY TABLE IF NOT EXISTS `dbname`.`tableName` (`id` INT(11) AUTO_INCREMENT PRIMARY KEY COMMENT "id column" COLLATE UTF8_BIN COLUMN_FORMAT FIXED STORAGE DISK, `name` VARCHAR(128) UNIQUE KEY COMMENT "user name" COLLATE UTF8_BIN COLUMN_FORMAT DYNAMIC STORAGE MEMORY) ENGINE = MEMORY');
      });
      it('should support create table with reference definition', function () {
        expect(getParsedSql("create temporary table if not exists dbname.tableName (id INT(11) auto_increment primary key comment \"id column\" collate utf8_bin column_format fixed storage disk references rdb.rta(id) match full on delete cascade on update restrict, name varchar(128) unique key comment \"user name\" collate utf8_bin column_format dynamic storage memory references rdb.rtb(name) match simple on delete set null on update set default) ENGINE = MEMORY")).to.equal('CREATE TEMPORARY TABLE IF NOT EXISTS `dbname`.`tableName` (`id` INT(11) AUTO_INCREMENT PRIMARY KEY COMMENT "id column" COLLATE UTF8_BIN COLUMN_FORMAT FIXED STORAGE DISK REFERENCES `rdb`.`rta` (`id`) MATCH FULL ON DELETE CASCADE ON UPDATE RESTRICT, `name` VARCHAR(128) UNIQUE KEY COMMENT "user name" COLLATE UTF8_BIN COLUMN_FORMAT DYNAMIC STORAGE MEMORY REFERENCES `rdb`.`rtb` (`name`) MATCH SIMPLE ON DELETE SET NULL ON UPDATE SET DEFAULT) ENGINE = MEMORY');
      });
      it('should support create table with column check', function () {
        expect(getParsedSql("CREATE TABLE parts (part_no VARCHAR(18) PRIMARY KEY,description VARCHAR(40),cost DECIMAL(10,2 ) NOT NULL CHECK (cost >= 0),price DECIMAL(10,2) NOT NULL CHECK (price >= 0));")).to.equal('CREATE TABLE `parts` (`part_no` VARCHAR(18) PRIMARY KEY, `description` VARCHAR(40), `cost` DECIMAL(10, 2) NOT NULL CHECK (`cost` >= 0), `price` DECIMAL(10, 2) NOT NULL CHECK (`price` >= 0))');
        expect(getParsedSql("CREATE TABLE parts (part_no VARCHAR(18) PRIMARY KEY,description VARCHAR(40),cost DECIMAL(10,2 ) NOT NULL CHECK (cost >= 0) enforced,price DECIMAL(10,2) NOT NULL CHECK (price >= 0) not enforced);")).to.equal('CREATE TABLE `parts` (`part_no` VARCHAR(18) PRIMARY KEY, `description` VARCHAR(40), `cost` DECIMAL(10, 2) NOT NULL CHECK (`cost` >= 0) ENFORCED, `price` DECIMAL(10, 2) NOT NULL CHECK (`price` >= 0) NOT ENFORCED)');
      });
      it('should support binary and columns with or without length', function () {
        expect(getParsedSql("create table dbname.tableName (id1 BINARY(16), id2 BINARY);")).to.equal('CREATE TABLE `dbname`.`tableName` (`id1` BINARY(16), `id2` BINARY)');
      });
      it('should support varbinary columns with length', function () {
        expect(getParsedSql("create table dbname.tableName (id VARBINARY(16));")).to.equal('CREATE TABLE `dbname`.`tableName` (`id` VARBINARY(16))');
      });
      it('should support generated columns', function () {
        expect(getParsedSql("CREATE TABLE contacts (id INT KEY, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, fullname varchar(101) CHARACTER SET latin1 COLLATE latin1_general_cs AS (CONCAT(first_name,' ',last_name)) STORED NOT NULL);")).to.equal("CREATE TABLE `contacts` (`id` INT KEY, `first_name` VARCHAR(50) NOT NULL, `last_name` VARCHAR(50) NOT NULL, `fullname` VARCHAR(101) NOT NULL CHARACTER SET LATIN1 COLLATE LATIN1_GENERAL_CS AS (CONCAT(`first_name`, ' ', `last_name`)) STORED)");
        expect(getParsedSql("CREATE TABLE contacts (id INT KEY, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, fullname varchar(101) AS (CONCAT(first_name,' ',last_name)) STORED);")).to.equal("CREATE TABLE `contacts` (`id` INT KEY, `first_name` VARCHAR(50) NOT NULL, `last_name` VARCHAR(50) NOT NULL, `fullname` VARCHAR(101) AS (CONCAT(`first_name`, ' ', `last_name`)) STORED)");
        expect(getParsedSql("CREATE TABLE contacts (id INT KEY, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, fullname varchar(101) AS (CONCAT(first_name,' ',last_name)) VIRTUAL);")).to.equal("CREATE TABLE `contacts` (`id` INT KEY, `first_name` VARCHAR(50) NOT NULL, `last_name` VARCHAR(50) NOT NULL, `fullname` VARCHAR(101) AS (CONCAT(`first_name`, ' ', `last_name`)) VIRTUAL)");
      });
      it('should support generated columns with generated always', function () {
        expect(getParsedSql("CREATE TABLE contacts (id INT KEY, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, fullname varchar(101) CHARACTER SET latin1 COLLATE latin1_general_cs GENERATED ALWAYS AS (CONCAT(first_name,' ',last_name)) STORED NOT NULL);")).to.equal("CREATE TABLE `contacts` (`id` INT KEY, `first_name` VARCHAR(50) NOT NULL, `last_name` VARCHAR(50) NOT NULL, `fullname` VARCHAR(101) NOT NULL CHARACTER SET LATIN1 COLLATE LATIN1_GENERAL_CS GENERATED ALWAYS AS (CONCAT(`first_name`, ' ', `last_name`)) STORED)");
        expect(getParsedSql("CREATE TABLE contacts (id INT KEY, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, fullname varchar(101) GENERATED ALWAYS AS (CONCAT(first_name,' ',last_name)) VIRTUAL);")).to.equal("CREATE TABLE `contacts` (`id` INT KEY, `first_name` VARCHAR(50) NOT NULL, `last_name` VARCHAR(50) NOT NULL, `fullname` VARCHAR(101) GENERATED ALWAYS AS (CONCAT(`first_name`, ' ', `last_name`)) VIRTUAL)");
        expect(getParsedSql("CREATE TABLE contacts (id INT KEY, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, fullname varchar(101) GENERATED ALWAYS AS (CONCAT(first_name,' ',last_name)) STORED);")).to.equal("CREATE TABLE `contacts` (`id` INT KEY, `first_name` VARCHAR(50) NOT NULL, `last_name` VARCHAR(50) NOT NULL, `fullname` VARCHAR(101) GENERATED ALWAYS AS (CONCAT(`first_name`, ' ', `last_name`)) STORED)");
      });
    });
    describe('create index or key', function () {
      it('should support create index in mysql', function () {
        expect(getParsedSql('create index city_idx on places(city)')).to.equal('CREATE INDEX `city_idx` ON `places` (`city`)');
        expect(getParsedSql('create unique index city_idx on places(city, country desc)')).to.equal('CREATE UNIQUE INDEX `city_idx` ON `places` (`city`, `country` DESC)');
        expect(getParsedSql('create index city_idx on places(city(10), country desc)')).to.equal('CREATE INDEX `city_idx` ON `places` (city(10), `country` DESC)');
        expect(getParsedSql('CREATE INDEX idx1 ON t1 ((col1 + col2));')).to.equal('CREATE INDEX `idx1` ON `t1` ((`col1` + `col2`))');
        expect(getParsedSql('CREATE fulltext INDEX idx2 ON t1 ((col1 + col2) asc, (col1 - col2) desc, col1 asc);')).to.equal('CREATE FULLTEXT INDEX `idx2` ON `t1` ((`col1` + `col2`) ASC, (`col1` - `col2`) DESC, `col1` ASC)');
      });
      ['index', 'key'].forEach(function (type) {
        it("should support create table ".concat(type), function () {
          expect(getParsedSql("create temporary table dbname.tableName (id int, name varchar(128), ".concat(type, " idx_name using hash (name) key_block_size 128) engine = innodb auto_increment = 10"))).to.equal("CREATE TEMPORARY TABLE `dbname`.`tableName` (`id` INT, `name` VARCHAR(128), ".concat(type.toUpperCase(), " idx_name USING HASH (`name`) KEY_BLOCK_SIZE 128) ENGINE = INNODB AUTO_INCREMENT = 10"));
          expect(getParsedSql("create temporary table dbname.tableName (id int, name varchar(128), ".concat(type, " using btree (name) key_block_size = 128 visible)"))).to.equal("CREATE TEMPORARY TABLE `dbname`.`tableName` (`id` INT, `name` VARCHAR(128), ".concat(type.toUpperCase(), " USING BTREE (`name`) KEY_BLOCK_SIZE = 128 VISIBLE)"));
          expect(getParsedSql("create temporary table dbname.tableName (id int, name varchar(128), ".concat(type, " using btree (name) key_block_size = 128 visible with parser newparser)"))).to.equal("CREATE TEMPORARY TABLE `dbname`.`tableName` (`id` INT, `name` VARCHAR(128), ".concat(type.toUpperCase(), " USING BTREE (`name`) KEY_BLOCK_SIZE = 128 VISIBLE WITH PARSER newparser)"));
          expect(getParsedSql("create temporary table dbname.tableName (id int, name varchar(128), ".concat(type, " using btree (name) key_block_size = 128 visible with parser newparser comment \"index comment\")"))).to.equal("CREATE TEMPORARY TABLE `dbname`.`tableName` (`id` INT, `name` VARCHAR(128), ".concat(type.toUpperCase(), " USING BTREE (`name`) KEY_BLOCK_SIZE = 128 VISIBLE WITH PARSER newparser COMMENT \"index comment\")"));
          expect(getParsedSql("create temporary table dbname.tableName (id int, name varchar(128), ".concat(type, " using btree (name) key_block_size = 128 invisible with parser newparser comment \"index comment\")"))).to.equal("CREATE TEMPORARY TABLE `dbname`.`tableName` (`id` INT, `name` VARCHAR(128), ".concat(type.toUpperCase(), " USING BTREE (`name`) KEY_BLOCK_SIZE = 128 INVISIBLE WITH PARSER newparser COMMENT \"index comment\")"));
          expect(getParsedSql("create temporary table dbname.tableName (id int, name varchar(128), ".concat(type, " using btree (`id` asc, `name` desc) key_block_size = 128 invisible with parser newparser comment \"index comment\")"))).to.equal("CREATE TEMPORARY TABLE `dbname`.`tableName` (`id` INT, `name` VARCHAR(128), ".concat(type.toUpperCase(), " USING BTREE (`id` ASC, `name` DESC) KEY_BLOCK_SIZE = 128 INVISIBLE WITH PARSER newparser COMMENT \"index comment\")"));
        });
      });
      it('should support create index multiple columns in tsql', function () {
        var sql = "CREATE INDEX ix_class_segment_progress_segment_id_user_id_archived ON [class_segment_progress]\n        (\n          [segment_id], [user_id] desc, [archived]\n        );";
        var opt = {
          database: 'transactsql'
        };
        expect(getParsedSql(sql, opt)).to.equal('CREATE INDEX [ix_class_segment_progress_segment_id_user_id_archived] ON [class_segment_progress] ([segment_id], [user_id] DESC, [archived])');
      });
      ['fulltext', 'spatial'].forEach(function (prefix) {
        ['index', 'key'].forEach(function (kind) {
          var type = "".concat(prefix, " ").concat(kind);
          it("should support create table ".concat(type), function () {
            expect(getParsedSql("create temporary table dbname.tableName (id int, name varchar(128), ".concat(type, " idx_name (name) key_block_size 128)"))).to.equal("CREATE TEMPORARY TABLE `dbname`.`tableName` (`id` INT, `name` VARCHAR(128), ".concat(type.toUpperCase(), " idx_name (`name`) KEY_BLOCK_SIZE 128)"));
            expect(getParsedSql("create temporary table dbname.tableName (id int, name varchar(128), ".concat(type, " (name) key_block_size = 128 visible)"))).to.equal("CREATE TEMPORARY TABLE `dbname`.`tableName` (`id` INT, `name` VARCHAR(128), ".concat(type.toUpperCase(), " (`name`) KEY_BLOCK_SIZE = 128 VISIBLE)"));
            expect(getParsedSql("create temporary table dbname.tableName (id int, name varchar(128), ".concat(type, " (name) key_block_size = 128 visible with parser newparser)"))).to.equal("CREATE TEMPORARY TABLE `dbname`.`tableName` (`id` INT, `name` VARCHAR(128), ".concat(type.toUpperCase(), " (`name`) KEY_BLOCK_SIZE = 128 VISIBLE WITH PARSER newparser)"));
            expect(getParsedSql("create temporary table dbname.tableName (id int, name varchar(128), ".concat(type, " (name) key_block_size = 128 visible with parser newparser comment \"index comment\")"))).to.equal("CREATE TEMPORARY TABLE `dbname`.`tableName` (`id` INT, `name` VARCHAR(128), ".concat(type.toUpperCase(), " (`name`) KEY_BLOCK_SIZE = 128 VISIBLE WITH PARSER newparser COMMENT \"index comment\")"));
            expect(getParsedSql("create temporary table dbname.tableName (id int, name varchar(128), ".concat(type, " (name) key_block_size = 128 invisible with parser newparser comment \"index comment\")"))).to.equal("CREATE TEMPORARY TABLE `dbname`.`tableName` (`id` INT, `name` VARCHAR(128), ".concat(type.toUpperCase(), " (`name`) KEY_BLOCK_SIZE = 128 INVISIBLE WITH PARSER newparser COMMENT \"index comment\")"));
          });
        });
      });
      it('should support empty index option', function () {
        expect(indexOptionToSQL()).to.equal(undefined);
        var indexOpt = {
          type: 'unknow'
        };
        expect(indexOptionToSQL(indexOpt)).to.equal(indexOpt.type.toUpperCase());
        expect(indexTypeAndOptionToSQL({})).to.be.eql(['']);
      });
    });
    describe('create constraint', function () {
      var type = 'constraint';
      it("should support primary key", function () {
        expect(getParsedSql("create temporary table dbname.tableName (id int, name varchar(128), ".concat(type, " idx_name primary key using hash (name) key_block_size 128)"))).to.equal("CREATE TEMPORARY TABLE `dbname`.`tableName` (`id` INT, `name` VARCHAR(128), ".concat(type.toUpperCase(), " `idx_name` PRIMARY KEY USING HASH (`name`) KEY_BLOCK_SIZE 128)"));
      });
      it("should support unique key", function () {
        ['index', 'key'].forEach(function (kind) {
          expect(getParsedSql("create temporary table dbname.tableName (id int, name varchar(128), ".concat(type, " idx_name unique ").concat(kind, " index_name using btree (name) key_block_size 128)"))).to.equal("CREATE TEMPORARY TABLE `dbname`.`tableName` (`id` INT, `name` VARCHAR(128), ".concat(type.toUpperCase(), " `idx_name` UNIQUE ").concat(kind.toUpperCase(), " `index_name` USING BTREE (`name`) KEY_BLOCK_SIZE 128)"));
        });
      });
      it("should support foreign key", function () {
        expect(getParsedSql("create temporary table dbname.tableName (id int, name varchar(128), ".concat(type, " `idx_name` foreign key index_name (name) references rdb.rta (name_alias) match simple on delete cascade on update set default)"))).to.equal("CREATE TEMPORARY TABLE `dbname`.`tableName` (`id` INT, `name` VARCHAR(128), ".concat(type.toUpperCase(), " `idx_name` FOREIGN KEY `index_name` (`name`) REFERENCES `rdb`.`rta` (`name_alias`) MATCH SIMPLE ON DELETE CASCADE ON UPDATE SET DEFAULT)"));
      });
      it("should support constraint check", function () {
        expect(getParsedSql("CREATE TABLE Persons (\n              ID int NOT NULL,\n              LastName varchar(255) NOT NULL,\n              FirstName varchar(255),\n              Age int,\n              CHECK (Age >= 18)\n          )")).to.equal("CREATE TABLE `Persons` (`ID` INT NOT NULL, `LastName` VARCHAR(255) NOT NULL, `FirstName` VARCHAR(255), `Age` INT, CHECK (`Age` >= 18))");
        expect(getParsedSql("CREATE TABLE Persons (\n            ID int NOT NULL,\n            LastName varchar(255) NOT NULL,\n            FirstName varchar(255),\n            Age int CHECK (Age >= 18),\n          )", {
          database: 'transactsql'
        })).to.equal("CREATE TABLE [Persons] ([ID] INT NOT NULL, [LastName] VARCHAR(255) NOT NULL, [FirstName] VARCHAR(255), [Age] INT CHECK ([Age] >= 18))");
        expect(getParsedSql("CREATE TABLE Persons (\n            ID int NOT NULL,\n            LastName varchar(255) NOT NULL,\n            FirstName varchar(255),\n            Age int,\n            City varchar(255),\n            CONSTRAINT CHK_Person CHECK (Age >= 18 AND City = 'Sandnes')\n        )")).to.equal("CREATE TABLE `Persons` (`ID` INT NOT NULL, `LastName` VARCHAR(255) NOT NULL, `FirstName` VARCHAR(255), `Age` INT, `City` VARCHAR(255), CONSTRAINT `CHK_Person` CHECK (`Age` >= 18 AND `City` = 'Sandnes'))");
      });
    });
    describe('create table from like', function () {
      it('should support create table', function () {
        expect(getParsedSql("create temporary table if not exists dbname.tableName like odb.ota")).to.equal('CREATE TEMPORARY TABLE IF NOT EXISTS `dbname`.`tableName` LIKE `odb`.`ota`');
      });
    });
    describe('create table from query', function () {
      it('should support create table from simple select', function () {
        expect(getParsedSql("create temporary table if not exists  dbname.tableName (id int, name varchar(128)) engine = innodb ignore as select id, name from qdb.qta")).to.equal('CREATE TEMPORARY TABLE IF NOT EXISTS `dbname`.`tableName` (`id` INT, `name` VARCHAR(128)) ENGINE = INNODB IGNORE AS SELECT `id`, `name` FROM `qdb`.`qta`');
      });
      it('should support create table from union', function () {
        expect(getParsedSql("create temporary table if not exists  dbname.tableName (id int, name varchar(128)) engine = innodb ignore as select id, name from qdb.qta union select ab as id, cd as name from qdb.qtc")).to.equal('CREATE TEMPORARY TABLE IF NOT EXISTS `dbname`.`tableName` (`id` INT, `name` VARCHAR(128)) ENGINE = INNODB IGNORE AS SELECT `id`, `name` FROM `qdb`.`qta` UNION SELECT `ab` AS `id`, `cd` AS `name` FROM `qdb`.`qtc`');
      });
      it('should support create table as select', function () {
        expect(getParsedSql("create table places2 as select * from places;")).to.equal('CREATE TABLE `places2` AS SELECT * FROM `places`');
        expect(getParsedSql("create table places2 select * from places;")).to.equal('CREATE TABLE `places2` SELECT * FROM `places`');
      });
    });
    describe('create table unknown resource', function () {
      it('should throw error, when resource unkonwn', function () {
        var columnDefinition = [{
          "column": {
            "type": "column_ref",
            "table": null,
            "column": "id"
          },
          "definition": {
            "dataType": "INT"
          },
          "nullable": null,
          "default_val": null,
          "auto_increment": null,
          "unique": null,
          "comment": null,
          "collate": null,
          "column_format": null,
          "storage": null,
          "reference_definition": null,
          "resource": "xx"
        }];
        var ast = {
          "type": "create",
          "keyword": "table",
          "temporary": "temporary",
          "if_not_exists": null,
          "table": [{
            "db": "dbname",
            "table": "tableName",
            "as": null
          }],
          "ignore_replace": null,
          "as": null,
          "query_expr": null,
          "table_options": null
        };
        expect(parser.sqlify(ast)).to.be.eql('CREATE TEMPORARY TABLE `dbname`.`tableName`');
        ast.create_definitions = [];
        expect(parser.sqlify(ast)).to.be.eql('CREATE TEMPORARY TABLE `dbname`.`tableName` ()');
        ast.create_definitions = ['', null];
        expect(parser.sqlify(ast)).to.be.eql('CREATE TEMPORARY TABLE `dbname`.`tableName` (, )');
        ast.create_definitions = columnDefinition;
        expect(parser.sqlify.bind(parser, ast)).to["throw"]('unknown resource = xx type');
      });
    });
    describe('create table using pg', function () {
      it('supports basic things', function () {
        expect(getParsedSql("CREATE TABLE foo (id uuid)", {
          database: 'postgresql'
        })).to.equal('CREATE TABLE "foo" (id UUID)');
        expect(getParsedSql("CREATE TABLE foo (value text unique)", {
          database: 'postgresql'
        })).to.equal('CREATE TABLE "foo" (value TEXT UNIQUE)');
        expect(getParsedSql("CREATE TABLE accounts (\n          id UUID DEFAULT uuid_generate_v4() NOT NULL,\n          email TEXT NOT NULL,\n          password TEXT NOT NULL,\n\n          created_at TIMESTAMP NOT NULL DEFAULT NOW(),\n          updated_at TIMESTAMP NULL,\n\n          PRIMARY KEY (id)\n        );", {
          database: 'postgresql'
        })).to.equal('CREATE TABLE "accounts" (id UUID NOT NULL DEFAULT uuid_generate_v4(), email TEXT NOT NULL, password TEXT NOT NULL, created_at TIMESTAMP NOT NULL DEFAULT NOW(), updated_at TIMESTAMP NULL, PRIMARY KEY (id))');
      });
      it('should support pg bool/boolean type', function () {
        expect(getParsedSql("CREATE TABLE \"foos\"\n        (\n            \"Id\" varchar(25) not null,\n            \"status\" boolean default 't',\n            \"is_deleted\" bool null,\n            \"is_man\" boolean not null default 'f'\n        );", PG_OPT)).to.equal("CREATE TABLE \"foos\" (\"Id\" VARCHAR(25) NOT NULL, \"status\" BOOLEAN DEFAULT 't', \"is_deleted\" BOOL NULL, \"is_man\" BOOLEAN NOT NULL DEFAULT 'f')");
      });
      it('should support pg time length type', function () {
        expect(getParsedSql("CREATE TABLE \"foos\"\n        (\n            \"Id\" varchar(25) not null,\n            \"TIME\" time(7) null\n        );", PG_OPT)).to.equal("CREATE TABLE \"foos\" (\"Id\" VARCHAR(25) NOT NULL, \"TIME\" TIME(7) NULL)");
      });
    });
    describe('create index using pg', function () {
      var indexSQLList = [{
        origin: 'CREATE UNIQUE INDEX title_idx ON films (title);',
        description: 'should create a B-tree index on the column title in the table films',
        sqlify: 'CREATE UNIQUE INDEX "title_idx" ON "films" (title)'
      }, {
        origin: 'CREATE INDEX ON films ((lower("title")));',
        description: 'should create an index on the expression lower(title), allowing efficient case-insensitive searches',
        sqlify: 'CREATE INDEX ON "films" ((lower("title")))'
      }, {
        origin: 'CREATE INDEX title_idx_german ON films (title COLLATE "de_DE");',
        description: 'should create an index with non-default collation',
        sqlify: 'CREATE INDEX "title_idx_german" ON "films" (title COLLATE "de_DE")'
      }, {
        origin: 'CREATE INDEX title_idx_nulls_low ON films (title NULLS FIRST);',
        description: 'should create an index with non-default sort ordering of nulls',
        sqlify: 'CREATE INDEX "title_idx_nulls_low" ON "films" (title NULLS FIRST)'
      }, {
        origin: 'CREATE UNIQUE INDEX title_idx ON films (title) WITH (fillfactor = 70);',
        description: 'should create an index with non-default fill factor',
        sqlify: 'CREATE UNIQUE INDEX "title_idx" ON "films" (title) WITH (FILLFACTOR = 70)'
      }, {
        origin: 'CREATE UNIQUE INDEX title_idx ON films (title) WITH (fillfactor = 70) where id > 100',
        description: 'should create an index with non-default fill factor',
        sqlify: 'CREATE UNIQUE INDEX "title_idx" ON "films" (title) WITH (FILLFACTOR = 70) WHERE id > 100'
      }, {
        origin: 'CREATE INDEX gin_idx ON documents_table USING gin (locations) WITH (fastupdate = off);',
        description: 'should create a GIN index with fast updates disabled',
        sqlify: 'CREATE INDEX "gin_idx" ON "documents_table" USING GIN (locations) WITH (FASTUPDATE = OFF)'
      }, {
        origin: 'CREATE INDEX code_idx ON films (code) TABLESPACE indexspace;',
        description: 'should create an index on the column code in the table films and have the index reside in the tablespace indexspace',
        sqlify: 'CREATE INDEX "code_idx" ON "films" (code) TABLESPACE INDEXSPACE'
      }, {
        origin: 'CREATE INDEX pointloc ON points USING gist (box(location,location))',
        description: 'should create a GiST index on a point attribute so that we can efficiently use box operators on the result of the conversion function',
        sqlify: 'CREATE INDEX "pointloc" ON "points" USING GIST (box(location, location))'
      }, {
        origin: 'CREATE INDEX CONCURRENTLY sales_quantity_index ON sales_table (quantity);',
        description: 'should create an index without locking out writes to the table',
        sqlify: 'CREATE INDEX CONCURRENTLY "sales_quantity_index" ON "sales_table" (quantity)'
      }];
      indexSQLList.forEach(function (indexSQL) {
        var description = indexSQL.description,
          origin = indexSQL.origin,
          sqlify = indexSQL.sqlify;
        it(description, function () {
          expect(getParsedSql(origin, PG_OPT)).to.equal(sqlify);
        });
      });
    });
    describe('create trigger pg', function () {
      it('should support basic trigger', function () {
        expect(getParsedSql("CREATE TRIGGER check_update\n        BEFORE INSERT ON accounts\n        FOR EACH ROW\n        EXECUTE PROCEDURE check_account_update();", PG_OPT)).to.equal('CREATE TRIGGER "check_update" BEFORE INSERT ON "accounts" FOR EACH ROW EXECUTE PROCEDURE check_account_update()');
      });
      it('should support trigger with when expression', function () {
        expect(getParsedSql("CREATE TRIGGER check_update\n        BEFORE DELETE ON accounts\n        NOT DEFERRABLE INITIALLY DEFERRED\n        FOR EACH ROW\n        WHEN (OLD.balance IS DISTINCT FROM NEW.balance)\n        EXECUTE PROCEDURE check_account_update();", PG_OPT)).to.equal('CREATE TRIGGER "check_update" BEFORE DELETE ON "accounts" NOT DEFERRABLE INITIALLY DEFERRED FOR EACH ROW WHEN "OLD".balance IS DISTINCT FROM "NEW"."balance" EXECUTE PROCEDURE check_account_update()');
      });
      it('should support trigger with when expression with * and deferrable', function () {
        expect(getParsedSql("CREATE TRIGGER log_update\n        AFTER TRUNCATE ON accounts\n        FROM bank.accounts\n        DEFERRABLE INITIALLY IMMEDIATE\n        FOR EACH ROW\n        WHEN (OLD.* IS DISTINCT FROM NEW.*)\n        EXECUTE PROCEDURE log_account_update();", PG_OPT)).to.equal('CREATE TRIGGER "log_update" AFTER TRUNCATE ON "accounts" FROM "bank"."accounts" DEFERRABLE INITIALLY IMMEDIATE FOR EACH ROW WHEN "OLD".* IS DISTINCT FROM "NEW".* EXECUTE PROCEDURE log_account_update()');
      });
      it('should support trigger with update of', function () {
        expect(getParsedSql("CREATE TRIGGER log_update\n        AFTER UPDATE OF user, name, salary OR INSERT ON accounts\n        DEFERRABLE INITIALLY IMMEDIATE\n        WHEN (OLD.* IS DISTINCT FROM NEW.*)\n        EXECUTE PROCEDURE log_account_update();", PG_OPT)).to.equal('CREATE TRIGGER "log_update" AFTER UPDATE OF user, name, salary OR INSERT ON "accounts" DEFERRABLE INITIALLY IMMEDIATE WHEN "OLD".* IS DISTINCT FROM "NEW".* EXECUTE PROCEDURE log_account_update()');
      });
    });
  });
  describe('create extension pg', function () {
    it('should support basic extension', function () {
      expect(getParsedSql("CREATE EXTENSION hstore;", PG_OPT)).to.equal('CREATE EXTENSION hstore');
    });
    it('should support create extension if not exists', function () {
      expect(getParsedSql("CREATE EXTENSION if not exists hstore SCHEMA public FROM unpackaged;", PG_OPT)).to.equal('CREATE EXTENSION IF NOT EXISTS hstore SCHEMA public FROM unpackaged');
    });
    it('should support create extension with version', function () {
      expect(getParsedSql("CREATE EXTENSION if not exists hstore with SCHEMA public version latested FROM unpackaged;", PG_OPT)).to.equal('CREATE EXTENSION IF NOT EXISTS hstore WITH SCHEMA public VERSION latested FROM unpackaged');
    });
    it('should support create extension literal string version ', function () {
      expect(getParsedSql("CREATE EXTENSION if not exists hstore SCHEMA public version \"latest\" FROM unpackaged;", PG_OPT)).to.equal('CREATE EXTENSION IF NOT EXISTS hstore SCHEMA public VERSION "latest" FROM unpackaged');
    });
  });
  describe('create table with tsql', function () {
    it('should support identity without number', function () {
      expect(getParsedSql("CREATE TABLE test (\n        id BIGINT NOT NULL IDENTITY PRIMARY KEY,\n        title VARCHAR(100) NOT NULL,\n        uuid UNIQUEIDENTIFIER NOT NULL DEFAULT(NEWID()) unique,\n        nc nchar(123) not null,\n        nvc nvarchar(200) not null,\n        nvcm nvarchar(max) not null,\n        created_at datetime NOT NULL DEFAULT GETDATE()\n      )", {
        database: 'transactsql'
      })).to.equal('CREATE TABLE [test] ([id] BIGINT NOT NULL IDENTITY PRIMARY KEY, [title] VARCHAR(100) NOT NULL, [uuid] UNIQUEIDENTIFIER NOT NULL DEFAULT (NEWID()) UNIQUE, [nc] NCHAR(123) NOT NULL, [nvc] NVARCHAR(200) NOT NULL, [nvcm] NVARCHAR(max) NOT NULL, [created_at] DATETIME NOT NULL DEFAULT GETDATE())');
    });
    it('should support identity without number', function () {
      expect(getParsedSql("CREATE TABLE test (\n        id BIGINT NOT NULL IDENTITY PRIMARY KEY,\n        [title] VARCHAR(100) NOT NULL,\n        [uuid] UNIQUEIDENTIFIER NOT NULL DEFAULT(NEWID()) unique,\n        [nc] nchar(123) not null,\n        [nvc] nvarchar(200) not null,\n        [nvcm] nvarchar(max) not null\n      )", {
        database: 'transactsql'
      })).to.equal('CREATE TABLE [test] ([id] BIGINT NOT NULL IDENTITY PRIMARY KEY, [title] VARCHAR(100) NOT NULL, [uuid] UNIQUEIDENTIFIER NOT NULL DEFAULT (NEWID()) UNIQUE, [nc] NCHAR(123) NOT NULL, [nvc] NVARCHAR(200) NOT NULL, [nvcm] NVARCHAR(max) NOT NULL)');
    });
    it('should support identity with seed and increment', function () {
      expect(getParsedSql("CREATE TABLE test (\n        id BIGINT NOT NULL IDENTITY(1,2) PRIMARY KEY,\n        title VARCHAR(100) NOT NULL\n      )", {
        database: 'transactsql'
      })).to.equal('CREATE TABLE [test] ([id] BIGINT NOT NULL IDENTITY(1, 2) PRIMARY KEY, [title] VARCHAR(100) NOT NULL)');
    });
    it('should support identity with seed and increment', function () {
      expect(getParsedSql("CREATE TABLE test (\n        id BIGINT NOT NULL PRIMARY KEY IDENTITY(1,2),\n        title VARCHAR(100) NOT NULL\n      )", {
        database: 'transactsql'
      })).to.equal('CREATE TABLE [test] ([id] BIGINT NOT NULL IDENTITY(1, 2) PRIMARY KEY, [title] VARCHAR(100) NOT NULL)');
    });
    it('should support create column as ', function () {
      expect(getParsedSql("CREATE TABLE test (\n        id BIGINT NOT NULL PRIMARY KEY IDENTITY(1, 1),\n        questions_correct BIGINT NOT NULL DEFAULT(0),\n        questions_total BIGINT NOT NULL,\n        score AS (questions_correct * 100 / questions_total)\n      );", {
        database: 'transactsql'
      })).to.equal('CREATE TABLE [test] ([id] BIGINT NOT NULL IDENTITY(1, 1) PRIMARY KEY, [questions_correct] BIGINT NOT NULL DEFAULT (0), [questions_total] BIGINT NOT NULL, [score] AS ([questions_correct] * 100 / [questions_total]))');
      expect(getParsedSql("CREATE TABLE test (\n        id BIGINT NOT NULL PRIMARY KEY IDENTITY(1, 1),\n        questions_correct BIGINT NOT NULL DEFAULT(0),\n        questions_total BIGINT NOT NULL,\n        score AS questions_correct * 100 / questions_total\n      );", {
        database: 'transactsql'
      })).to.equal('CREATE TABLE [test] ([id] BIGINT NOT NULL IDENTITY(1, 1) PRIMARY KEY, [questions_correct] BIGINT NOT NULL DEFAULT (0), [questions_total] BIGINT NOT NULL, [score] AS [questions_correct] * 100 / [questions_total])');
    });
    it('should support bracket around data type', function () {
      expect(getParsedSql("CREATE TABLE [dbo].[foo]\n      (\n          [Id] [nvarchar](25) NOT NULL,\n          name [nchar](123) not null,\n          [test] [real] NULL,\n          [gmt_modified] [time](7) NULL,\n          [abc] [UNIQUEIDENTIFIER] null,\n      );", {
        database: 'transactsql'
      })).to.equal('CREATE TABLE [dbo].[foo] ([Id] NVARCHAR(25) NOT NULL, [name] NCHAR(123) NOT NULL, [test] REAL NULL, [gmt_modified] TIME(7) NULL, [abc] UNIQUEIDENTIFIER NULL)');
    });
  });
  describe('create index with tsql', function () {
    it('should support a nonclustered index on a table or view', function () {
      expect(getParsedSql('CREATE INDEX i1 ON t1 (col1, col2 DESC);', {
        database: 'transactsql'
      })).to.equal('CREATE INDEX [i1] ON [t1] ([col1], [col2] DESC)');
    });
    it('should suport create a clustered, unique, nonclustered', function () {
      expect(getParsedSql('CREATE CLUSTERED INDEX i1 ON d1.s1.t1 (col1);', {
        database: 'transactsql'
      })).to.equal('CREATE CLUSTERED INDEX [i1] ON [d1].[s1].[t1] ([col1])');
      expect(getParsedSql('CREATE UNIQUE INDEX i1 ON t1 (col1 DESC, col2 ASC, col3 DESC);', {
        database: 'transactsql'
      })).to.equal('CREATE UNIQUE INDEX [i1] ON [t1] ([col1] DESC, [col2] ASC, [col3] DESC)');
      expect(getParsedSql('CREATE NONCLUSTERED INDEX ix_test ON [test] ([test_col]);', {
        database: 'transactsql'
      })).to.equal('CREATE NONCLUSTERED INDEX [ix_test] ON [test] ([test_col])');
    });
    it('should support include', function () {
      expect(getParsedSql('CREATE NONCLUSTERED INDEX ix_test ON [test] ([test_col]) include (test_col, test_col2);', {
        database: 'transactsql'
      })).to.equal('CREATE NONCLUSTERED INDEX [ix_test] ON [test] ([test_col]) INCLUDE ([test_col], [test_col2])');
    });
    it('should support include and where', function () {
      expect(getParsedSql("CREATE NONCLUSTERED INDEX ix_test ON [test] ([test_col]) include (test_col, test_col2) where StartDate > '20000101' AND EndDate <= '20000630' and ComponentID IN (533, 324, 753) and EndDate IS NOT NULL;", {
        database: 'transactsql'
      })).to.equal("CREATE NONCLUSTERED INDEX [ix_test] ON [test] ([test_col]) INCLUDE ([test_col], [test_col2]) WHERE [StartDate] > '20000101' AND [EndDate] <= '20000630' AND [ComponentID] IN (533, 324, 753) AND [EndDate] IS NOT NULL");
    });
    it('should support include and where', function () {
      expect(getParsedSql("CREATE NONCLUSTERED INDEX ix_test ON [test] ([test_col]) include (test_col, test_col2) where StartDate > '20000101' AND EndDate <= '20000630' and ComponentID IN (533, 324, 753) and EndDate IS NOT NULL with (DATA_COMPRESSION = ROW ON PARTITIONS (2, 4, 6 TO 8));", {
        database: 'transactsql'
      })).to.equal("CREATE NONCLUSTERED INDEX [ix_test] ON [test] ([test_col]) INCLUDE ([test_col], [test_col2]) WHERE [StartDate] > '20000101' AND [EndDate] <= '20000630' AND [ComponentID] IN (533, 324, 753) AND [EndDate] IS NOT NULL WITH (DATA_COMPRESSION = ROW ON PARTITIONS (2, 4, 6 TO 6))");
    });
    it('should support include and where', function () {
      expect(getParsedSql("CREATE NONCLUSTERED INDEX ix_test ON [test] ([test_col]) include (test_col, test_col2) where StartDate > '20000101' AND EndDate <= '20000630' and ComponentID IN (533, 324, 753) and EndDate IS NOT NULL with (DATA_COMPRESSION = ROW ON PARTITIONS (2, 4, 6 TO 8)) on pn(abc) FILESTREAM_ON filename;", {
        database: 'transactsql'
      })).to.equal("CREATE NONCLUSTERED INDEX [ix_test] ON [test] ([test_col]) INCLUDE ([test_col], [test_col2]) WHERE [StartDate] > '20000101' AND [EndDate] <= '20000630' AND [ComponentID] IN (533, 324, 753) AND [EndDate] IS NOT NULL WITH (DATA_COMPRESSION = ROW ON PARTITIONS (2, 4, 6 TO 6)) ON pn([abc]) FILESTREAM_ON filename");
    });
    it('should return undefined for empty index columns', function () {
      expect(columnOrderListToSQL()).to.be.equal(undefined);
    });
  });
  describe('create database', function () {
    it('should support create database', function () {
      expect(getParsedSql('CREATE DATABASE abc')).to.equal('CREATE DATABASE `abc`');
      expect(getParsedSql('CREATE DATABASE IF NOT EXISTS abc')).to.equal('CREATE DATABASE IF NOT EXISTS `abc`');
      expect(getParsedSql('CREATE DATABASE IF NOT EXISTS abc default CHARACTER SET utf8mb4')).to.equal('CREATE DATABASE IF NOT EXISTS `abc` DEFAULT CHARACTER SET utf8mb4');
      expect(getParsedSql('CREATE DATABASE IF NOT EXISTS abc CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci')).to.equal('CREATE DATABASE IF NOT EXISTS `abc` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci');
    });
  });
  describe('create view', function () {
    it('should parse column list', function () {
      expect(getParsedSql('CREATE VIEW test.v AS SELECT * FROM t;')).to.equal('CREATE VIEW `test`.`v` AS SELECT * FROM `t`');
      expect(getParsedSql("CREATE VIEW v (mycol) AS SELECT 'abc'")).to.equal("CREATE VIEW `v` (`mycol`) AS SELECT 'abc'");
    });
    it('should support optional setting', function () {
      expect(getParsedSql('CREATE OR REPLACE ALGORITHM = UNDEFINED DEFINER = "abc"@"localhost" SQL SECURITY INVOKER VIEW test.v AS SELECT * FROM t WITH CHECK OPTION;')).to.equal('CREATE OR REPLACE ALGORITHM = UNDEFINED DEFINER = "abc"@"localhost" SQL SECURITY INVOKER VIEW `test`.`v` AS SELECT * FROM `t` WITH CHECK OPTION');
      expect(getParsedSql('CREATE OR REPLACE ALGORITHM = MERGE DEFINER = \'abc\'@\'localhost\' SQL SECURITY INVOKER VIEW test.v AS SELECT * FROM t WITH CASCADED CHECK OPTION;')).to.equal('CREATE OR REPLACE ALGORITHM = MERGE DEFINER = \'abc\'@\'localhost\' SQL SECURITY INVOKER VIEW `test`.`v` AS SELECT * FROM `t` WITH CASCADED CHECK OPTION');
    });
  });
  it('throw error when create type is unknown', function () {
    var ast = {
      type: 'create',
      keyword: 'unknown_create_type'
    };
    expect(parser.sqlify.bind(parser, ast)).to["throw"]("unknown create resource ".concat(ast.keyword));
  });
});

/***/ }),

/***/ "./test/delete.spec.js":
/*!*****************************!*\
  !*** ./test/delete.spec.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(/*! chai */ "chai"),
  expect = _require.expect;
var Parser = __webpack_require__(/*! ../src/parser */ "./src/parser.js")["default"];
var _require2 = __webpack_require__(/*! ../src/delete */ "./src/delete.js"),
  deleteToSQL = _require2.deleteToSQL;
describe('delete', function () {
  var parser = new Parser();
  function getParsedSql(sql, opt) {
    var ast = parser.astify(sql, opt);
    return parser.sqlify(ast, opt);
  }
  it('should parse baisc usage', function () {
    var _parser$parse = parser.parse('delete from a where id = 1'),
      tableList = _parser$parse.tableList,
      columnList = _parser$parse.columnList,
      ast = _parser$parse.ast;
    expect(tableList).to.eql(['delete::null::a']);
    expect(columnList).to.eql(['select::null::id', 'delete::a::(.*)']);
    expect(ast.type).to.be.eql('delete');
    expect(ast.table).to.be.eql([{
      db: null,
      table: 'a',
      as: null,
      addition: true
    }]);
    expect(ast.from).to.eql([{
      db: null,
      table: 'a',
      as: null
    }]);
    expect(ast.where).to.eql({
      type: 'binary_expr',
      operator: '=',
      left: {
        type: 'column_ref',
        table: null,
        column: 'id'
      },
      right: {
        type: 'number',
        value: 1
      }
    });
  });
  it('should parse baisc usage', function () {
    var _parser$parse2 = parser.parse('delete from a'),
      tableList = _parser$parse2.tableList,
      columnList = _parser$parse2.columnList,
      ast = _parser$parse2.ast;
    expect(tableList).to.eql(['delete::null::a']);
    expect(columnList).to.eql(['delete::a::(.*)']);
    expect(ast.type).to.be.eql('delete');
    expect(ast.table).to.be.eql([{
      db: null,
      table: 'a',
      as: null,
      addition: true
    }]);
    expect(ast.from).to.eql([{
      db: null,
      table: 'a',
      as: null
    }]);
  });
  it('should sqlify delete without table', function () {
    expect(deleteToSQL({})).to.equal('DELETE');
  });
  it('should parse table in delete usage', function () {
    var _parser$parse3 = parser.parse('DELETE t1,t2 from t1 LEFT JOIN t2 ON t1.id=t2.id WHERE t1.id=25'),
      tableList = _parser$parse3.tableList,
      columnList = _parser$parse3.columnList,
      ast = _parser$parse3.ast;
    expect(tableList).to.eql(['delete::null::t1', 'select::null::t2']);
    expect(columnList).to.eql(['select::t1::id', 'select::t2::id', 'delete::t1::(.*)']);
    expect(ast.type).to.be.eql('delete');
    expect(ast.table).to.eql([{
      db: null,
      table: 't1',
      as: null
    }, {
      db: null,
      table: 't2',
      as: null
    }]);
    expect(ast.from).to.eql([{
      db: null,
      table: 't1',
      as: null
    }, {
      db: null,
      table: 't2',
      as: null,
      join: 'LEFT JOIN',
      on: {
        type: 'binary_expr',
        operator: '=',
        left: {
          type: 'column_ref',
          table: 't1',
          column: 'id'
        },
        right: {
          type: 'column_ref',
          table: 't2',
          column: 'id'
        }
      }
    }]);
    expect(ast.where).to.eql({
      type: 'binary_expr',
      operator: '=',
      left: {
        type: 'column_ref',
        table: 't1',
        column: 'id'
      },
      right: {
        type: 'number',
        value: 25
      }
    });
  });
  it('should support order by and limit in delete sql', function () {
    expect(getParsedSql('delete from t1 where id = 1 order by id')).to.be.equal('DELETE FROM `t1` WHERE `id` = 1 ORDER BY `id` ASC');
    expect(getParsedSql('delete from t1 where id = 1 limit 10')).to.be.equal('DELETE FROM `t1` WHERE `id` = 1 LIMIT 10');
    expect(getParsedSql('delete from t1 where id = 1 order by id limit 10')).to.be.equal('DELETE FROM `t1` WHERE `id` = 1 ORDER BY `id` ASC LIMIT 10');
    expect(getParsedSql('delete from t1 order by id limit 10')).to.be.equal('DELETE FROM `t1` ORDER BY `id` ASC LIMIT 10');
  });
});

/***/ }),

/***/ "./test/flink.spec.js":
/*!****************************!*\
  !*** ./test/flink.spec.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(/*! chai */ "chai"),
  expect = _require.expect;
var Parser = __webpack_require__(/*! ../src/parser */ "./src/parser.js")["default"];
var tableTumbleToSQL = __webpack_require__(/*! ../src/tables */ "./src/tables.js").tableTumbleToSQL;
describe('Flink', function () {
  var parser = new Parser();
  var opt = {
    database: 'flinksql'
  };
  function getParsedSql(sql, opt) {
    var ast = parser.astify(sql, opt);
    return parser.sqlify(ast, opt);
  }
  var SQL_LIST = [{
    title: "select current_date",
    sql: ["SELECT CURRENT_DATE FROM mytable", "SELECT CURRENT_DATE FROM `mytable`"]
  }, {
    title: "trim function",
    sql: ["SELECT TRIM('.' from \"....test.....\") AS TrimmedString;", 'SELECT TRIM(\'.\' FROM "....test.....") AS `TrimmedString`']
  }, {
    title: "trim function with position",
    sql: ["SELECT TRIM(BOTH '.' from \"....test.....\") AS TrimmedString;", 'SELECT TRIM(BOTH \'.\' FROM "....test.....") AS `TrimmedString`']
  }, {
    title: "trim function with position",
    sql: ["SELECT TRIM(TRAILING  from \" test \") AS TrimmedString;", 'SELECT TRIM(TRAILING FROM " test ") AS `TrimmedString`']
  }, {
    title: "trim function without config",
    sql: ["SELECT TRIM(\" test \") AS TrimmedString;", 'SELECT TRIM(" test ") AS `TrimmedString`']
  }, {
    title: "status as column name",
    sql: ["SELECT status FROM users;", "SELECT `status` FROM `users`"]
  }, {
    title: "UNION",
    sql: ["(SELECT s FROM t1) UNION (SELECT s FROM t2)", "(SELECT `s` FROM `t1`) UNION (SELECT `s` FROM `t2`)"]
  }, {
    title: "UNION ALL",
    sql: ["(SELECT s FROM t1) UNION ALL (SELECT s FROM t2)", "(SELECT `s` FROM `t1`) UNION ALL (SELECT `s` FROM `t2`)"]
  }, {
    title: "UNION DISTINCT",
    sql: ["(SELECT s FROM t1) UNION DISTINCT (SELECT s FROM t2)", "(SELECT `s` FROM `t1`) UNION DISTINCT (SELECT `s` FROM `t2`)"]
  }, {
    title: "INTERSECT",
    sql: ["(SELECT s FROM t1) INTERSECT (SELECT s FROM t2)", "(SELECT `s` FROM `t1`) INTERSECT (SELECT `s` FROM `t2`)"]
  }, {
    title: "INTERSECT ALL",
    sql: ["(SELECT s FROM t1) INTERSECT ALL (SELECT s FROM t2)", "(SELECT `s` FROM `t1`) INTERSECT ALL (SELECT `s` FROM `t2`)"]
  }, {
    title: "EXCEPT",
    sql: ["(SELECT s FROM t1) EXCEPT (SELECT s FROM t2)", "(SELECT `s` FROM `t1`) EXCEPT (SELECT `s` FROM `t2`)"]
  }, {
    title: "EXCEPT ALL",
    sql: ["(SELECT s FROM t1) EXCEPT ALL (SELECT s FROM t2)", "(SELECT `s` FROM `t1`) EXCEPT ALL (SELECT `s` FROM `t2`)"]
  }, {
    title: "nested INTERSECT",
    sql: ["SELECT *\n           FROM (\n             (SELECT user_id FROM Orders WHERE a % 2 = 0)\n           INTERSECT\n             (SELECT user_id FROM Orders WHERE b = 0)\n         )", "SELECT * FROM ((SELECT `user_id` FROM `Orders` WHERE `a` % 2 = 0) INTERSECT (SELECT `user_id` FROM `Orders` WHERE `b` = 0))"]
  }, {
    title: "IN",
    sql: ["\n          SELECT user_id, amount\n          FROM Orders\n          WHERE product IN (\n            SELECT product FROM NewProducts\n          )\n        ", "SELECT `user_id`, `amount` FROM `Orders` WHERE `product` IN (SELECT `product` FROM `NewProducts`)"]
  }, {
    title: "NOT IN",
    sql: ["\n          SELECT user_id, amount\n          FROM Orders\n          WHERE product NOT IN (\n            SELECT product FROM NewProducts\n          )\n        ", "SELECT `user_id`, `amount` FROM `Orders` WHERE `product` NOT IN (SELECT `product` FROM `NewProducts`)"]
  }, {
    title: "EXISTS",
    sql: ["\n          SELECT user_id, amount\n          FROM Orders\n          WHERE product EXISTS (\n              SELECT product FROM NewProducts\n          )\n        ", "SELECT `user_id`, `amount` FROM `Orders` WHERE `product` EXISTS (SELECT `product` FROM `NewProducts`)"]
  }, {
    title: "NOT EXISTS",
    sql: ["\n          SELECT user_id, amount\n          FROM Orders\n          WHERE product NOT EXISTS (\n              SELECT product FROM NewProducts\n          )\n        ", "SELECT `user_id`, `amount` FROM `Orders` WHERE `product` NOT EXISTS (SELECT `product` FROM `NewProducts`)"]
  }, {
    title: "like with escape",
    sql: ["SELECT * FROM users WHERE a LIKE '%abc%' ESCAPE '-'", "SELECT * FROM `users` WHERE `a` LIKE '%abc%' ESCAPE '-'"]
  }, {
    title: "DISTINCT FROM",
    sql: ["SELECT * FROM users WHERE a IS DISTINCT FROM 'b'", "SELECT * FROM `users` WHERE `a` IS DISTINCT FROM 'b'"]
  }, {
    title: "NOT DISTINCT FROM",
    sql: ["SELECT * FROM users WHERE a IS NOT DISTINCT FROM b", "SELECT * FROM `users` WHERE `a` IS NOT DISTINCT FROM `b`"]
  }, {
    title: "DISTINCT FROM NULL",
    sql: ["SELECT * FROM users WHERE a IS DISTINCT FROM NULL", "SELECT * FROM `users` WHERE `a` IS DISTINCT FROM NULL"]
  }, {
    title: "JOIN",
    sql: ["SELECT * FROM Orders JOIN Product ON Orders.productId = Product.id", "SELECT * FROM `Orders` JOIN `Product` ON `Orders`.`productId` = `Product`.`id`"]
  }, {
    title: "NATURAL JOIN",
    sql: ["SELECT * FROM Orders NATURAL JOIN Product", "SELECT * FROM `Orders` NATURAL JOIN `Product`"]
  }, {
    title: "INNER JOIN",
    sql: ["SELECT * FROM Orders INNER JOIN Product ON Orders.productId = Product.id", "SELECT * FROM `Orders` INNER JOIN `Product` ON `Orders`.`productId` = `Product`.`id`"]
  }, {
    title: "LEFT JOIN",
    sql: ["SELECT * FROM Orders LEFT JOIN Product ON Orders.product_id = Product.id", "SELECT * FROM `Orders` LEFT JOIN `Product` ON `Orders`.`product_id` = `Product`.`id`"]
  }, {
    title: "RIGHT JOIN",
    sql: ["SELECT * FROM Orders RIGHT JOIN Product ON Orders.product_id = Product.id", "SELECT * FROM `Orders` RIGHT JOIN `Product` ON `Orders`.`product_id` = `Product`.`id`"]
  }, {
    title: "FULL OUTER JOIN",
    sql: ["SELECT * FROM Orders FULL OUTER JOIN Product ON Orders.product_id = Product.id", "SELECT * FROM `Orders` FULL OUTER JOIN `Product` ON `Orders`.`product_id` = `Product`.`id`"]
  }, {
    title: "CROSS JOIN",
    sql: ["SELECT column_list FROM A CROSS JOIN B", "SELECT `column_list` FROM `A` CROSS JOIN `B`"]
  }, {
    title: "CROSS APPLY",
    sql: ["SELECT  t1.*, t2o.*\n         FROM    t1\n         CROSS APPLY\n                (\n                SELECT  *\n                FROM    t2\n                WHERE   t2.t1_id = t1.id\n                ) t2o\n        ", "SELECT `t1`.*, `t2o`.* FROM `t1` CROSS APPLY (SELECT * FROM `t2` WHERE `t2`.`t1_id` = `t1`.`id`) AS `t2o`"]
  }, {
    title: "complex JOINs",
    sql: ["SELECT * FROM (SELECT * FROM table1) t1 FULL OUTER JOIN ( SELECT * FROM ( SELECT * FROM table2 ) JOIN db.table3 ON table2.id=table3.id ) t2 ON t1.id=t2.id", "SELECT * FROM (SELECT * FROM `table1`) AS `t1` FULL OUTER JOIN (SELECT * FROM (SELECT * FROM `table2`) JOIN `db`.`table3` ON `table2`.`id` = `table3`.`id`) AS `t2` ON `t1`.`id` = `t2`.`id`"]
  }, {
    title: "WITH clause",
    sql: ["WITH orders_with_total AS (SELECT order_id, price + tax AS total FROM Orders)\n         SELECT order_id, SUM(total) FROM orders_with_total GROUP BY order_id;", "WITH `orders_with_total` AS (SELECT `order_id`, `price` + `tax` AS `total` FROM `Orders`) SELECT `order_id`, SUM(`total`) FROM `orders_with_total` GROUP BY `order_id`"]
  }, {
    title: "string concatenation function",
    sql: ["SELECT a || b FROM users WHERE a || b = 'ab';", "SELECT `a` || `b` FROM `users` WHERE `a` || `b` = 'ab'"]
  }, {
    title: "SIMILAR TO",
    sql: ["SELECT * FROM users WHERE a SIMILAR TO '%[^a-z0-9 .]%'", "SELECT * FROM `users` WHERE `a` SIMILAR TO '%[^a-z0-9 .]%'"]
  }, {
    title: "NOT SIMILAR TO",
    sql: ["SELECT * FROM users WHERE a NOT SIMILAR TO 'abc'", "SELECT * FROM `users` WHERE `a` NOT SIMILAR TO 'abc'"]
  }, {
    title: "SIMILAR with escape",
    sql: ["SELECT * FROM users WHERE a SIMILAR TO '%[^a-z0-9 .]%' ESCAPE '-'", "SELECT * FROM `users` WHERE `a` SIMILAR TO '%[^a-z0-9 .]%' ESCAPE '-'"]
  }, {
    title: "POSITION",
    sql: ["SELECT * FROM users WHERE POSITION('a' IN a) = 2", "SELECT * FROM `users` WHERE POSITION('a' IN `a`) = 2"]
  }, {
    title: "POSITION with start",
    sql: ["SELECT * FROM users WHERE POSITION('a' IN a FROM 3) = 2", "SELECT * FROM `users` WHERE POSITION('a' IN `a` FROM 3) = 2"]
  }, {
    title: "SUBSTRING",
    sql: ["SELECT * FROM users WHERE SUBSTRING('abcde' FROM 2) = 'llo'", "SELECT * FROM `users` WHERE SUBSTRING('abcde' FROM 2) = 'llo'"]
  }, {
    title: "SUBSTRING with length",
    sql: ["SELECT * FROM users WHERE SUBSTRING(a FROM 2 FOR 2) = 'll'", "SELECT * FROM `users` WHERE SUBSTRING(`a` FROM 2 FOR 2) = 'll'"]
  }, {
    title: "CAST",
    sql: ["SELECT SHA512(CAST(CONCAT(a, b, c) AS VARCHAR)) AS Hashed FROM v", "SELECT SHA512(CAST(CONCAT(`a`, `b`, `c`) AS VARCHAR)) AS `Hashed` FROM `v`"]
  }, {
    title: "TRY_CAST",
    sql: ["SELECT SHA512(TRY_CAST(CONCAT(a, b, c) AS VARCHAR)) AS Hashed FROM v", "SELECT SHA512(TRY_CAST(CONCAT(`a`, `b`, `c`) AS VARCHAR)) AS `Hashed` FROM `v`"]
  }, {
    title: "OVERLAY",
    sql: ["SELECT OVERLAY(a PLACING 'a' FROM 3) FROM users", "SELECT OVERLAY(`a` PLACING 'a' FROM 3) FROM `users`"]
  }, {
    title: "OVERLAY with length",
    sql: ["SELECT * FROM users WHERE OVERLAY(a PLACING 'abc' FROM 3 FOR 2) = 'abcde'", "SELECT * FROM `users` WHERE OVERLAY(`a` PLACING 'abc' FROM 3 FOR 2) = 'abcde'"]
  }, {
    title: 'tumble table',
    sql: ["SELECT\n          window_start,\n          window_end,\n          http_status,\n          count(*) as count_http_status\n        FROM\n        TABLE (\n          TUMBLE (\n            TABLE parsed_logs,\n            DESCRIPTOR (_operationTs),\n            INTERVAL '60' SECONDS\n          )\n        )", "SELECT `window_start`, `window_end`, `http_status`, COUNT(*) AS `count_http_status` FROM TABLE(TUMBLE(TABLE `parsed_logs` DESCRIPTOR(`_operationTs`) INTERVAL '60' SECONDS))"]
  }];
  SQL_LIST.forEach(function (sqlInfo) {
    var title = sqlInfo.title,
      sql = sqlInfo.sql;
    it("should support ".concat(title), function () {
      expect(getParsedSql(sql[0], opt)).to.equal(sql[1]);
    });
  });
  describe('test function', function () {
    it('should return empty when tumble info is null', function () {
      expect(tableTumbleToSQL(null)).to.be.equals('');
    });
  });
});

/***/ }),

/***/ "./test/hive.spec.js":
/*!***************************!*\
  !*** ./test/hive.spec.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(/*! chai */ "chai"),
  expect = _require.expect;
var Parser = __webpack_require__(/*! ../src/parser */ "./src/parser.js")["default"];
describe('Hive', function () {
  var parser = new Parser();
  var option = {
    database: 'hive'
  };
  function getParsedSql(sql) {
    var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : option;
    var ast = parser.astify(sql, opt);
    return parser.sqlify(ast, opt);
  }
  it('should support colume start with number', function () {
    var sql = "SELECT min(salary)\n    FROM \"MyTable\" as ST\n    WHERE (ST.3_year_base_employee_count= 390)\n    GROUP BY ST.bankruptcy_date,ST.3_year_base_employee_count";
    expect(getParsedSql(sql)).to.be.equal("SELECT MIN(`salary`) FROM `MyTable` AS `ST` WHERE (`ST`.`3_year_base_employee_count` = 390) GROUP BY `ST`.`bankruptcy_date`, `ST`.`3_year_base_employee_count`");
  });
  it('should support where clause with parentheses', function () {
    var sql = "select * from ab where\n    (\n    (upstream.created_time >= from_unixtime((businessBeginTime - 3600000) / 1000, 'yyyy-MM-dd hh:mm:ss') and upstream.created_time < from_unixtime((businessEndTime - 3600000) / 1000, 'yyyy-MM-dd hh:mm:ss'))\n    or\n    (item.create_time >= businessBeginTime - 3600000 and item.create_time < from_unixtime((businessEndTime - 3600000) / 1000, 'yyyy-MM-dd hh:mm:ss'))\n    )\n    and\n    (\n    upstream.upper_amount is null\n    or item.amount is null\n    or coalesce(upstream.upper_amount, 0) <> coalesce(item.amount, 0)\n    or upstream.settle_type <> item.settle_type\n    )";
    expect(getParsedSql(sql)).to.be.equal("SELECT * FROM `ab` WHERE ((`upstream`.`created_time` >= from_unixtime((`businessBeginTime` - 3600000) / 1000, 'yyyy-MM-dd hh:mm:ss') AND `upstream`.`created_time` < from_unixtime((`businessEndTime` - 3600000) / 1000, 'yyyy-MM-dd hh:mm:ss')) OR (`item`.`create_time` >= `businessBeginTime` - 3600000 AND `item`.`create_time` < from_unixtime((`businessEndTime` - 3600000) / 1000, 'yyyy-MM-dd hh:mm:ss'))) AND (`upstream`.`upper_amount` IS NULL OR `item`.`amount` IS NULL OR coalesce(`upstream`.`upper_amount`, 0) <> coalesce(`item`.`amount`, 0) OR `upstream`.`settle_type` <> `item`.`settle_type`)");
  });
  it('should support rlike', function () {
    var sql = "select emp_id,name,email_id\n    from emp_info\n    where email_id RLIKE '^([0-9]|[a-z]|[A-Z])';";
    expect(getParsedSql(sql)).to.be.equal("SELECT `emp_id`, `name`, `email_id` FROM `emp_info` WHERE `email_id` RLIKE '^([0-9]|[a-z]|[A-Z])'");
  });
  it('should support not rlike', function () {
    var sql = "select emp_id,name,email_id\n    from emp_info\n    where email_id NOT RLIKE '^([0-9]|[a-z]|[A-Z])';";
    expect(getParsedSql(sql)).to.be.equal("SELECT `emp_id`, `name`, `email_id` FROM `emp_info` WHERE `email_id` NOT RLIKE '^([0-9]|[a-z]|[A-Z])'");
  });
  it('should support window function', function () {
    var sql = "SELECT COALESCE(\n      LAST_VALUE(prop1) OVER (PARTITION BY duid, vid, inserteddate ORDER BY STAMP ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW),\n      LAST_VALUE(prop2) OVER (PARTITION BY duid, vid, inserteddate ORDER BY STAMP ASC ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING),\n      'unknown')";
    expect(getParsedSql(sql)).to.be.equal("SELECT COALESCE(LAST_VALUE(`prop1`) OVER (PARTITION BY `duid`, `vid`, `inserteddate` ORDER BY `STAMP` ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW), LAST_VALUE(`prop2`) OVER (PARTITION BY `duid`, `vid`, `inserteddate` ORDER BY `STAMP` ASC ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING), 'unknown')");
    sql = "SELECT CASE\n      WHEN(\n          LAST_VALUE(\n              CASE\n                  WHEN prop1='const1' THEN 'const2'\n                  ELSE NULL\n              END, True\n          ) OVER (PARTITION BY duid, vid, market ORDER BY stamp ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) = 'const3'\n      ) THEN 'const4'\n      ELSE NULL\n    END";
    expect(getParsedSql(sql)).to.be.equal("SELECT CASE WHEN (LAST_VALUE(CASE WHEN `prop1` = 'const1' THEN 'const2' ELSE NULL END, TRUE) OVER (PARTITION BY `duid`, `vid`, `market` ORDER BY `stamp` ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) = 'const3') THEN 'const4' ELSE NULL END");
  });
  it('should support cross join', function () {
    var sql = 'SELECT * FROM a CROSS JOIN b ON (a.id = b.id AND a.department = b.department)';
    expect(getParsedSql(sql)).to.be.equal('SELECT * FROM `a` CROSS JOIN `b` ON (`a`.`id` = `b`.`id` AND `a`.`department` = `b`.`department`)');
  });
  it('should support ==', function () {
    var sql = "select * from some_table where column1 == 'value'";
    expect(getParsedSql(sql)).to.be.equal("SELECT * FROM `some_table` WHERE `column1` == 'value'");
  });
  it('should support array index', function () {
    var sql = "select some_array[0] from some_table;";
    expect(getParsedSql(sql)).to.be.equal("SELECT `some_array`[0] FROM `some_table`");
    sql = "select lower(some_array[0]) from some_table;";
    expect(getParsedSql(sql)).to.be.equal("SELECT lower(`some_array`[0]) FROM `some_table`");
    sql = "select some_array[0].some_prop from some_table;";
    expect(getParsedSql(sql)).to.be.equal("SELECT `some_array`[0].some_prop FROM `some_table`");
    sql = "select lower(some_array[0].some_prop) from some_table;";
    expect(getParsedSql(sql)).to.be.equal("SELECT lower(`some_array`[0].some_prop) FROM `some_table`");
  });
  it('should support date interval cal', function () {
    var sql = "SELECT id from origindb.tt WHERE _update_timestamp >= timestamp businessBeginTime - interval '3' day";
    expect(getParsedSql(sql)).to.be.equal("SELECT `id` FROM `origindb`.`tt` WHERE `_update_timestamp` >= TIMESTAMP `businessBeginTime` - INTERVAL '3' DAY");
    sql = "select id from origindb.tt where date '2012-08-08' + interval '2' day";
    expect(getParsedSql(sql)).to.be.equal("SELECT `id` FROM `origindb`.`tt` WHERE DATE '2012-08-08' + INTERVAL '2' DAY");
    sql = "SELECT timestamp '2012-10-31 01:00 UTC';";
    expect(getParsedSql(sql)).to.be.equal("SELECT TIMESTAMP '2012-10-31 01:00 UTC'");
  });
  it("should support union", function () {
    var sql = "select * from a union select * from b";
    expect(getParsedSql(sql)).to.be.equal("SELECT * FROM `a` UNION SELECT * FROM `b`");
    sql = "select * from a union all select * from b";
    expect(getParsedSql(sql)).to.be.equal("SELECT * FROM `a` UNION ALL SELECT * FROM `b`");
    sql = "select * from a union distinct select * from b";
    expect(getParsedSql(sql)).to.be.equal("SELECT * FROM `a` UNION DISTINCT SELECT * FROM `b`");
  });
});

/***/ }),

/***/ "./test/index.spec.js":
/*!****************************!*\
  !*** ./test/index.spec.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(/*! chai */ "chai"),
  expect = _require.expect;
var Parser = __webpack_require__(/*! ../src/parser */ "./src/parser.js")["default"];
describe('MariaDB Command SQL', function () {
  var parser = new Parser();
  function getParsedSql(sql, opt) {
    var ast = parser.astify(sql, opt);
    return parser.sqlify(ast, opt);
  }
  it('unknow database', function () {
    var sql = 'select id from db.abc';
    var opt = {
      database: 'unknownDB'
    };
    expect(parser.parse.bind(parser, sql, opt)).to["throw"]("".concat(opt.database, " is not supported currently"));
  });
  describe('blank line or whitespace auto remove', function () {
    var sql = "\n\n    CALL utility.create_backup_script(schemaName, 'table_name', 'ticket_name');\n\n    DELETE FROM table_name WHERE id = 0;\n\n    ";
    it('should support blank line', function () {
      var ast = parser.parse(sql);
      expect(ast.ast.length).to.be.equal(2);
    });
  });
  describe('different quota based on database', function () {
    var sql = 'select id, "name" from db.abc';
    it('support pg to double quote', function () {
      expect(getParsedSql(sql, {
        database: 'PostgresQL'
      })).to.equal('SELECT id, "name" FROM "db"."abc"');
    });
    it('support mariadb quote', function () {
      expect(getParsedSql(sql, {
        database: 'MariaDB'
      })).to.equal('SELECT `id`, "name" FROM `db`.`abc`');
    });
  });
});

/***/ }),

/***/ "./test/insert.spec.js":
/*!*****************************!*\
  !*** ./test/insert.spec.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var _require = __webpack_require__(/*! chai */ "chai"),
  expect = _require.expect;
var Parser = __webpack_require__(/*! ../src/parser */ "./src/parser.js")["default"];
describe('insert', function () {
  var parser = new Parser();
  function getParsedSql(sql, opt) {
    var ast = parser.astify(sql, opt);
    return parser.sqlify(ast, opt);
  }
  it('should parse baisc usage', function () {
    var _parser$parse = parser.parse('INSERT INTO t (col1, col2) VALUES (1, 2)'),
      tableList = _parser$parse.tableList,
      columnList = _parser$parse.columnList,
      ast = _parser$parse.ast;
    expect(tableList).to.eql(['insert::null::t']);
    expect(columnList).to.eql(['insert::t::col1', 'insert::t::col2']);
    expect(ast.type).to.be.eql('insert');
    expect(ast.table).to.be.eql([{
      db: null,
      table: 't',
      as: null
    }]);
    expect(ast.columns).to.be.eql(["col1", "col2"]);
    expect(ast.values).to.eql([{
      type: "expr_list",
      value: [{
        type: "number",
        value: 1
      }, {
        type: "number",
        value: 2
      }]
    }]);
  });
  it('should support parse insert with multiple rows', function () {
    var sql = 'INSERT INTO t1 values("1223", "name"), ("1224", "name2")';
    var ast = parser.astify(sql);
    var backSQL = parser.sqlify(ast);
    expect(backSQL).to.be.equal('INSERT INTO `t1` VALUES ("1223","name"), ("1224","name2")');
  });
  it("should throw error if column count doesn't match value count", function () {
    var sql = 'INSERT INTO t1 (col1, col2, col3) values("1223", "name"), ("1224", "name2")';
    var fun = parser.astify.bind(parser, sql);
    expect(fun).to["throw"]("column count doesn't match value count at row 1");
  });
  it('should support parse insert from select', function () {
    var sql = 'INSERT INTO t1(col_a, col_b) select col_a, col_b from t2';
    var ast = parser.astify(sql);
    var backSQL = parser.sqlify(ast);
    expect(backSQL).to.be.equal("INSERT INTO `t1` (col_a, col_b) SELECT `col_a`, `col_b` FROM `t2`");
  });
  it('should parse insert and select', function () {
    var sql = 'INSERT INTO t1 values("1223", "name") ; SELECT * FROM t';
    var _sql$split = sql.split(';'),
      _sql$split2 = _slicedToArray(_sql$split, 2),
      sqla = _sql$split2[0],
      sqlb = _sql$split2[1];
    var astFirstSQL = parser.astify(sqla.trim());
    var astSecondSQL = parser.astify(sqlb.trim());
    var _parser$parse2 = parser.parse(sql),
      tableList = _parser$parse2.tableList,
      columnList = _parser$parse2.columnList,
      ast = _parser$parse2.ast;
    expect(tableList).to.eql(['insert::null::t1', 'select::null::t']);
    expect(columnList).to.eql(['insert::t1::(.*)', 'select::null::(.*)']);
    expect(ast).to.have.lengthOf(2);
    expect(ast[0]).to.eql(astFirstSQL);
    expect(ast[1]).to.eql(astSecondSQL);
  });
  it('should parser no columns', function () {
    var ast = {
      "type": "insert",
      "table": [{
        "db": null,
        "table": "t",
        "as": null
      }],
      "values": [{
        "type": "expr_list",
        "value": [{
          "type": "number",
          "value": 1
        }, {
          "type": "number",
          "value": 2
        }]
      }]
    };
    expect(parser.sqlify(ast)).to.be.eql('INSERT INTO `t` VALUES (1,2)');
    ast.columns = ['col1', 'col2'];
    expect(parser.sqlify(ast)).to.be.eql('INSERT INTO `t` (col1, col2) VALUES (1,2)');
  });
  it('should support big number', function () {
    var bigNumberList = ['3511161156327326047123', '23.3e+12323243434'];
    for (var _i = 0, _bigNumberList = bigNumberList; _i < _bigNumberList.length; _i++) {
      var bigNumber = _bigNumberList[_i];
      var sql = "INSERT INTO t1(id) VALUES(".concat(bigNumber, ")");
      var ast = parser.astify(sql);
      expect(ast.values[0].value).to.be.eql([{
        type: 'bigint',
        value: bigNumber
      }]);
      expect(parser.sqlify(ast)).to.equal('INSERT INTO `t1` (id) VALUES (' + bigNumber + ')');
    }
  });
  it('should support parse hive sql insert from select', function () {
    var sql = 'INSERT overwrite table account select col_a, col_b from t2';
    var ast = parser.astify(sql, {
      database: 'hive'
    });
    var backSQL = parser.sqlify(ast);
    expect(backSQL).to.be.equal("INSERT OVERWRITE TABLE `account` SELECT `col_a`, `col_b` FROM `t2`");
  });
  it('should support parse insert partition', function () {
    var sql = 'INSERT into account partition(date, id) select col_a, col_b from t2';
    var ast = parser.astify(sql);
    var backSQL = parser.sqlify(ast);
    expect(backSQL).to.be.equal("INSERT INTO `account` PARTITION(`date`, `id`) SELECT `col_a`, `col_b` FROM `t2`");
  });
  it('should support parse insert partition', function () {
    var sql = 'INSERT into account partition(date, id) (id, name) values(123, "test"), (124, "test2")';
    var ast = parser.astify(sql);
    var backSQL = parser.sqlify(ast);
    expect(backSQL).to.be.equal('INSERT INTO `account` PARTITION(`date`, `id`) (id, name) VALUES (123,"test"), (124,"test2")');
  });
  it('should support parse insert on duplicate key update', function () {
    var sql = 'INSERT into account partition(date, id) (id, name) values(123, "test"), (124, "test2") on duplicate key update id = 123, name = "test"';
    var ast = parser.astify(sql);
    var backSQL = parser.sqlify(ast);
    expect(backSQL).to.be.equal('INSERT INTO `account` PARTITION(`date`, `id`) (id, name) VALUES (123,"test"), (124,"test2") ON DUPLICATE KEY UPDATE `id` = 123, `name` = "test"');
    expect(parser.sqlify(parser.astify("INSERT INTO user (id, name, age) VALUES (1, 'user1', 50) ON DUPLICATE KEY UPDATE name = VALUES(name), age = VALUES(age)"))).to.be.equal("INSERT INTO `user` (id, name, age) VALUES (1,'user1',50) ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `age` = VALUES(`age`)");
  });
  it('should support parse insert set', function () {
    var sql = 'INSERT into account partition(date, id) set id = 234, name="my-name" on duplicate key update id = 123, name = "test"';
    var ast = parser.astify(sql);
    var backSQL = parser.sqlify(ast);
    expect(backSQL).to.be.equal('INSERT INTO `account` PARTITION(`date`, `id`) SET `id` = 234, `name` = "my-name" ON DUPLICATE KEY UPDATE `id` = 123, `name` = "test"');
  });
  it('should support parse insert partition expr', function () {
    var sql = 'INSERT into account partition(date = 20191218, id = 2) (id, name) values(123, "test"), (124, "test2")';
    var ast = parser.astify(sql);
    var backSQL = parser.sqlify(ast);
    expect(backSQL).to.be.equal('INSERT INTO `account` PARTITION(`date` = 20191218, `id` = 2) (id, name) VALUES (123,"test"), (124,"test2")');
  });
  it('should support parse insert partition for hive', function () {
    var sql = 'INSERT overwrite table account partition(date, id) select * from tmp';
    var ast = parser.astify(sql, {
      database: 'hive'
    });
    var backSQL = parser.sqlify(ast);
    expect(backSQL).to.be.equal("INSERT OVERWRITE TABLE `account` PARTITION(`date`, `id`) SELECT * FROM `tmp`");
  });
  it('should support parse pg insert returning', function () {
    var sql = 'INSERT into account (date, id) values("2019-12-23", 123) returning id';
    var opt = {
      database: 'postgresql'
    };
    var ast = parser.astify(sql, opt);
    var backSQL = parser.sqlify(ast, opt);
    expect(backSQL).to.be.equal('INSERT INTO "account" (date, id) VALUES ("2019-12-23",123) RETURNING id');
    expect(parser.sqlify(parser.astify("INSERT INTO account (date, id) VALUES (\"2019-12-23\",123) RETURNING *", opt), opt)).to.be.equal('INSERT INTO "account" (date, id) VALUES ("2019-12-23",123) RETURNING *');
  });
  it('should support insert hex value', function () {
    // TODO: reserve original quote
    expect(parser.sqlify(parser.astify("INSERT INTO `t`\n      (`a`, `b`) VALUES\n      (X'AD', 0x123BF)"))).to.be.equal("INSERT INTO `t` (a, b) VALUES (X'AD',0x123BF)");
  });
  it('should support replace into', function () {
    var sql = "REPLACE INTO test (test_column1, test_column2) VALUES ('testvalue1', 'testvalue2')";
    expect(getParsedSql(sql)).to.be.equal("REPLACE INTO `test` (test_column1, test_column2) VALUES ('testvalue1','testvalue2')");
  });
  describe('support ascii pnCtrl single-char', function () {
    it('should support ascii pnCtrl', function () {
      // 0～31及127(共33个)是控制字符或通信专用字符 \0-\x1F和\x7f in ascii, ETX ascii code is 0x03
      var sql = "INSERT INTO posts (content) VALUES('\\'s \x03')";
      var ast = parser.astify(sql);
      var backSQL = parser.sqlify(ast);
      expect(backSQL).to.be.equal("INSERT INTO `posts` (content) VALUES ('\\\'s ')");
    });
  });
});

/***/ }),

/***/ "./test/mariadb/cmd.spec.js":
/*!**********************************!*\
  !*** ./test/mariadb/cmd.spec.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(/*! chai */ "chai"),
  expect = _require.expect;
var Parser = __webpack_require__(/*! ../../src/parser */ "./src/parser.js")["default"];
describe('MariaDB Command SQL', function () {
  var parser = new Parser();
  var opt = {
    database: 'mariadb'
  };
  function getParsedSql(sql) {
    var ast = parser.astify(sql, opt);
    return parser.sqlify(ast, opt);
  }
  describe('alter', function () {
    var KEYWORDS = ['', 'COLUMN ', 'COLUMN IF NOT EXISTS ', 'IF NOT EXISTS '];
    it("should support MariaDB alter add column", function () {
      KEYWORDS.forEach(function (keyword) {
        expect(getParsedSql("alter table a add ".concat(keyword, "xxx int"))).to.equal("ALTER TABLE `a` ADD ".concat(keyword, "`xxx` INT"));
        expect(getParsedSql("alter table a add ".concat(keyword, "yyy varchar(128)"))).to.equal("ALTER TABLE `a` ADD ".concat(keyword, "`yyy` VARCHAR(128)"));
        expect(getParsedSql("alter table a add ".concat(keyword, "zzz varchar(128), add aaa date"))).to.equal("ALTER TABLE `a` ADD ".concat(keyword, "`zzz` VARCHAR(128), ADD `aaa` DATE"));
      });
    });
  });
});

/***/ }),

/***/ "./test/mysql-mariadb.spec.js":
/*!************************************!*\
  !*** ./test/mysql-mariadb.spec.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(/*! chai */ "chai"),
  expect = _require.expect;
var Parser = __webpack_require__(/*! ../src/parser */ "./src/parser.js")["default"];
var _require2 = __webpack_require__(/*! ../src/select */ "./src/select.js"),
  selectIntoToSQL = _require2.selectIntoToSQL;
describe('mysql', function () {
  var parser = new Parser();
  function getParsedSql(sql, opt) {
    var ast = parser.astify(sql, opt);
    return parser.sqlify(ast, opt);
  }
  var mariadb = {
    database: 'mariadb'
  };
  describe('select', function () {
    var SQL_LIST = [{
      title: 'basic regexp',
      sql: ["SELECT 'Michael!' REGEXP '.*';", "SELECT 'Michael!' REGEXP '.*'"]
    }, {
      title: 'basic regexp with newline',
      sql: ["SELECT 'new*\n*line' REGEXP 'new\\*.\\*line';", "SELECT 'new*\n*line' REGEXP 'new\\*.\\*line'"]
    }, {
      title: 'basic regexp with binary',
      sql: ["SELECT 'a' REGEXP '^[a-d]', 'a' REGEXP BINARY 'A';", "SELECT 'a' REGEXP '^[a-d]', 'a' REGEXP BINARY 'A'"]
    }, {
      title: 'regexp_instr',
      sql: ["SELECT REGEXP_INSTR('dog cat dog', 'dog');", "SELECT REGEXP_INSTR('dog cat dog', 'dog')"]
    }, {
      title: 'regexp_instr with pos',
      sql: ["SELECT REGEXP_INSTR('dog cat dog', 'dog', 2);", "SELECT REGEXP_INSTR('dog cat dog', 'dog', 2)"]
    }, {
      title: 'regexp_like',
      sql: ["SELECT REGEXP_LIKE('CamelCase', 'CAMELCASE');", "SELECT REGEXP_LIKE('CamelCase', 'CAMELCASE')"]
    }, {
      title: 'regexp_like with regex',
      sql: ["SELECT REGEXP_LIKE('fo\r\nfo', '^f.*$', 'm');", "SELECT REGEXP_LIKE('fo\r\nfo', '^f.*$', 'm')"]
    }, {
      title: 'regexp_like with collate',
      sql: ["SELECT REGEXP_LIKE('CamelCase', 'CAMELCASE' COLLATE utf8mb4_0900_as_cs);", "SELECT REGEXP_LIKE('CamelCase', 'CAMELCASE' COLLATE UTF8MB4_0900_AS_CS)"]
    }, {
      title: 'regexp_like with binary',
      sql: ["SELECT REGEXP_LIKE('a', 'A'), REGEXP_LIKE('a', BINARY 'A');", "SELECT REGEXP_LIKE('a', 'A'), REGEXP_LIKE('a', BINARY 'A')"]
    }, {
      title: 'regexp_replace',
      sql: ["SELECT REGEXP_REPLACE('abc def ghi', '[a-z]+', 'X', 1, 3);", "SELECT REGEXP_REPLACE('abc def ghi', '[a-z]+', 'X', 1, 3)"]
    }, {
      title: 'regexp_substr',
      sql: ["SELECT REGEXP_SUBSTR('abc def ghi', '[a-z]+', 1, 3);", "SELECT REGEXP_SUBSTR('abc def ghi', '[a-z]+', 1, 3)"]
    }, {
      title: 'window function',
      sql: ["SELECT\n          store.NAME AS store,\n          p1.date,\n          sum( p1.show_num ) AS show_num,\n          sum( p1.click_num ) AS click_num,\n          round( sum( p1.click_num ) / sum( p1.show_num ), 4 ) AS click_rate,\n          round( sum( p1.cost ) / sum( p1.click_num ), 2 ) AS cpc,\n          round(\n            sum( p1.cost ) / sum( p1.click_num ) * (\n            sum( p1.click_num ) / sum( p1.show_num )) * 1000,\n            2\n          ) AS cpm,\n          round( sum( p1.cost ) / sum( p1.add_cart_num ), 2 ) AS add_cart_cost,\n          sum( p1.add_cart_num ) AS add_cart_num,\n          round( sum( p1.add_cart_num ) / sum( p1.click_num ), 4 ) AS add_cart_rate,\n          sum( p1.paid_order_num ) AS paid_order_num,\n          round( sum( p1.cost ), 2 ) AS cost,\n          round( sum( p1.paid_order_zmount ), 2 ) AS final_paid_order_amount,\n          round( sum( sum( p1.cost )) over w, 2 ) AS cumulative_cost,\n          round( sum( sum( p1.paid_order_zmount )) over w, 2 ) AS cumulative_final_paid_order_amount,\n          round(( sum( sum( p1.paid_order_zmount )) over w )/( sum( sum( p1.cost )) over w ), 2 ) AS cumulative_roi,\n          p3.second_day_paid_order_zmount AS second_day_paid_order_amount,\n          round( p3.second_day_paid_order_zmount / sum( p1.cost ), 2 ) AS second_day_roi,\n          round( sum( p1.paid_order_zmount )/ sum( p1.cost ), 2 ) AS final_roi\n        FROM\n          model_plangroup_15click AS p1\n          LEFT JOIN (\n          SELECT\n            store,\n            date,\n            plan_group_name,\n            max( upload_date ) AS max_upload_date\n          FROM\n            model_plangroup_15click\n          WHERE\n            model_plangroup_15click.upload_date IS NOT NULL\n          GROUP BY\n            store,\n            date,\n            plan_group_name\n          ) AS p2 ON p1.store = p2.store\n          AND p1.date = p2.date\n          AND p1.plan_group_name = p2.plan_group_name\n          AND p1.upload_date = p2.max_upload_date\n          LEFT JOIN model_store AS store ON store.id = p1.store\n          LEFT JOIN (\n          SELECT\n            p.store,\n            p.date,\n            round( sum( ifnull( paid_order_zmount, 0 )), 2 ) AS second_day_paid_order_zmount\n          FROM\n            model_plangroup_15click AS p\n          WHERE\n            DATEDIFF( p.upload_date, p.date ) = 1\n          GROUP BY\n            p.store,\n            p.date\n          ORDER BY\n            p.store,\n            p.date DESC\n          ) AS p3 ON p1.store = p3.store\n          AND p1.date = p3.date\n        WHERE\n          p2.max_upload_date IS NOT NULL\n        GROUP BY\n          p1.store,\n          p1.date window w AS ( PARTITION BY p1.store, date_format( p1.date, \"%Y%m\" ) ORDER BY p1.date ROWS UNBOUNDED PRECEDING)\n        ORDER BY\n          p1.store,\n          p1.date DESC", 'SELECT `store`.`NAME` AS `store`, `p1`.`date`, SUM(`p1`.`show_num`) AS `show_num`, SUM(`p1`.`click_num`) AS `click_num`, round(SUM(`p1`.`click_num`) / SUM(`p1`.`show_num`), 4) AS `click_rate`, round(SUM(`p1`.`cost`) / SUM(`p1`.`click_num`), 2) AS `cpc`, round(SUM(`p1`.`cost`) / SUM(`p1`.`click_num`) * (SUM(`p1`.`click_num`) / SUM(`p1`.`show_num`)) * 1000, 2) AS `cpm`, round(SUM(`p1`.`cost`) / SUM(`p1`.`add_cart_num`), 2) AS `add_cart_cost`, SUM(`p1`.`add_cart_num`) AS `add_cart_num`, round(SUM(`p1`.`add_cart_num`) / SUM(`p1`.`click_num`), 4) AS `add_cart_rate`, SUM(`p1`.`paid_order_num`) AS `paid_order_num`, round(SUM(`p1`.`cost`), 2) AS `cost`, round(SUM(`p1`.`paid_order_zmount`), 2) AS `final_paid_order_amount`, round(SUM(SUM(`p1`.`cost`)) OVER w, 2) AS `cumulative_cost`, round(SUM(SUM(`p1`.`paid_order_zmount`)) OVER w, 2) AS `cumulative_final_paid_order_amount`, round(SUM(SUM(`p1`.`paid_order_zmount`)) OVER w / SUM(SUM(`p1`.`cost`)) OVER w, 2) AS `cumulative_roi`, `p3`.`second_day_paid_order_zmount` AS `second_day_paid_order_amount`, round(`p3`.`second_day_paid_order_zmount` / SUM(`p1`.`cost`), 2) AS `second_day_roi`, round(SUM(`p1`.`paid_order_zmount`) / SUM(`p1`.`cost`), 2) AS `final_roi` FROM `model_plangroup_15click` AS `p1` LEFT JOIN (SELECT `store`, `date`, `plan_group_name`, MAX(`upload_date`) AS `max_upload_date` FROM `model_plangroup_15click` WHERE `model_plangroup_15click`.`upload_date` IS NOT NULL GROUP BY `store`, `date`, `plan_group_name`) AS `p2` ON `p1`.`store` = `p2`.`store` AND `p1`.`date` = `p2`.`date` AND `p1`.`plan_group_name` = `p2`.`plan_group_name` AND `p1`.`upload_date` = `p2`.`max_upload_date` LEFT JOIN `model_store` AS `store` ON `store`.`id` = `p1`.`store` LEFT JOIN (SELECT `p`.`store`, `p`.`date`, round(SUM(ifnull(`paid_order_zmount`, 0)), 2) AS `second_day_paid_order_zmount` FROM `model_plangroup_15click` AS `p` WHERE DATEDIFF(`p`.`upload_date`, `p`.`date`) = 1 GROUP BY `p`.`store`, `p`.`date` ORDER BY `p`.`store` ASC, `p`.`date` DESC) AS `p3` ON `p1`.`store` = `p3`.`store` AND `p1`.`date` = `p3`.`date` WHERE `p2`.`max_upload_date` IS NOT NULL GROUP BY `p1`.`store`, `p1`.`date` WINDOW w AS (PARTITION BY `p1`.`store`, date_format(`p1`.`date`, "%Y%m") ORDER BY `p1`.`date` ASC ROWS UNBOUNDED PRECEDING) ORDER BY `p1`.`store` ASC, `p1`.`date` DESC']
    }, {
      title: 'on clause with function and expr',
      sql: ["select * from pg_database a\n          join pg_database b\n          on upper(a.datctype) = upper(b.datctype) AND a.oid = b.oid", "SELECT * FROM `pg_database` AS `a` INNER JOIN `pg_database` AS `b` ON upper(`a`.`datctype`) = upper(`b`.`datctype`) AND `a`.`oid` = `b`.`oid`"]
    }, {
      title: 'trim function',
      sql: ["SELECT TRIM('.' from \"....test.....\") AS TrimmedString;", 'SELECT TRIM(\'.\' FROM "....test.....") AS `TrimmedString`']
    }, {
      title: 'trim function with position',
      sql: ["SELECT TRIM(BOTH '.' from \"....test.....\") AS TrimmedString;", 'SELECT TRIM(BOTH \'.\' FROM "....test.....") AS `TrimmedString`']
    }, {
      title: 'trim function with position',
      sql: ["SELECT TRIM(TRAILING  from \" test \") AS TrimmedString;", 'SELECT TRIM(TRAILING FROM " test ") AS `TrimmedString`']
    }, {
      title: 'trim function without config',
      sql: ["SELECT TRIM(\" test \") AS TrimmedString;", 'SELECT TRIM(" test ") AS `TrimmedString`']
    }, {
      title: 'column with start',
      sql: ["SELECT abc, * from tableName", "SELECT `abc`, * FROM `tableName`"]
    }, {
      title: 'timestamp diff',
      sql: ['SELECT TIMESTAMPDIFF(SECOND,"2003-05-01 12:05:55","2003-05-01 12:06:32")', 'SELECT TIMESTAMPDIFF(SECOND, "2003-05-01 12:05:55", "2003-05-01 12:06:32")']
    }, {
      title: 'timestamp add',
      sql: ['SELECT TIMESTAMPADD(MINUTE,1,"2003-01-02")', 'SELECT TIMESTAMPADD(MINUTE, 1, "2003-01-02")']
    }, {
      title: 'create on update current_timestamp',
      sql: ["CREATE TABLE `t1` (`id` int(11) unsigned NOT NULL AUTO_INCREMENT, `name` varchar(64) NOT NULL DEFAULT 'ttt', `zf` int(10) unsigned zerofill DEFAULT NULL, `created_at` timestamp NULL DEFAULT now() on update now(), `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP, `last_modified_time` timestamp(4) NOT NULL DEFAULT '1970-01-01 00:00:00' ON UPDATE current_timestamp(4), PRIMARY KEY (`id`)) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 DATA DIRECTORY='/path/to/my/custom/directory';", "CREATE TABLE `t1` (`id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT, `name` VARCHAR(64) NOT NULL DEFAULT 'ttt', `zf` INT(10) UNSIGNED ZEROFILL DEFAULT NULL, `created_at` TIMESTAMP NULL DEFAULT now() ON UPDATE NOW(), `updated_at` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP, `last_modified_time` TIMESTAMP(4) NOT NULL DEFAULT '1970-01-01 00:00:00' ON UPDATE CURRENT_TIMESTAMP(4), PRIMARY KEY (`id`)) ENGINE = INNODB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 DATA DIRECTORY = '/path/to/my/custom/directory'"]
    }, {
      title: 'insert ignore into',
      sql: ["INSERT IGNORE INTO t1 (c1, c2) VALUES (1,1)", "INSERT IGNORE INTO `t1` (c1, c2) VALUES (1,1)"]
    }, {
      title: 'insert ignore into without columns',
      sql: ["INSERT IGNORE INTO t1 VALUES (1, 'hi')", "INSERT IGNORE INTO `t1` VALUES (1,'hi')"]
    }, {
      title: 'select into',
      sql: ["select c1, c2 into t1 from t2", "SELECT `c1`, `c2` INTO `t1` FROM `t2`"]
    }, {
      title: 'in bracket',
      sql: ["SELECT * FROM `tableName` WHERE POSITION('\n' IN `largeText`) > 0;", "SELECT * FROM `tableName` WHERE POSITION('\n' IN `largeText`) > 0"]
    }, {
      title: 'in bracket in column',
      sql: ["SELECT POSITION('\n' IN `largeText`) AS `charPosition` FROM `tableName`;", "SELECT POSITION('\n' IN `largeText`) AS `charPosition` FROM `tableName`"]
    }, {
      title: 'triple single quote',
      sql: ["select '''1'''", "SELECT '''1'''"]
    }, {
      title: 'rlike column',
      sql: ["select c1 from t1 where 'abc' rlike c2", "SELECT `c1` FROM `t1` WHERE 'abc' RLIKE `c2`"]
    }, {
      title: 'column with bracket',
      sql: ['SELECT `T`.`ddd` FROM `TABLE` AS `T`', 'SELECT `T`.`ddd` FROM `TABLE` AS `T`']
    }, {
      title: 'limit clause support ? as placeholder',
      sql: ['SELECT t0.xid, t0.xname FROM ORG_DEFINTION t0 WHERE (t0.xname = ?) LIMIT ?', 'SELECT `t0`.`xid`, `t0`.`xname` FROM `ORG_DEFINTION` AS `t0` WHERE (`t0`.`xname` = ?) LIMIT ?']
    }, {
      title: 'count distinct without parentheses',
      sql: ['SELECT COUNT(DISTINCT IF(active = 1, dep_id, NULL)) AS active_deps FROM users', 'SELECT COUNT(DISTINCT IF(`active` = 1, `dep_id`, NULL)) AS `active_deps` FROM `users`']
    }, {
      title: 'drop table if exists',
      sql: ['DROP TABLE IF EXISTS event_log', 'DROP TABLE IF EXISTS `event_log`']
    }, {
      title: 'sql column name wrapped by bracket',
      sql: ['SELECT `sometable`.`id` FROM sometable', 'SELECT `sometable`.`id` FROM `sometable`']
    }, {
      title: 'assigning a value to a sql variable within a select query',
      sql: ["SELECT @id := cust_id FROM customers WHERE cust_id='customer name';", "SELECT @id := `cust_id` FROM `customers` WHERE `cust_id` = 'customer name'"]
    }, {
      title: 'support hexadecimal literals',
      sql: ["SELECT X'4D7953514C', 0x01AF, x'01afd' from t1 where id = 0x1ecc96ce15;", "SELECT X'4D7953514C', 0x01AF, X'01afd' FROM `t1` WHERE `id` = 0x1ecc96ce15"]
    }, {
      title: 'alter table set auto_increment',
      sql: ['ALTER TABLE myTable AUTO_INCREMENT = 1;', 'ALTER TABLE `myTable` AUTO_INCREMENT = 1']
    }, {
      title: 'show create view',
      sql: ['SHOW CREATE VIEW abc.test', 'SHOW CREATE VIEW `abc`.`test`']
    }, {
      title: 'show create event',
      sql: ['SHOW CREATE EVENT `monthly_gc`', 'SHOW CREATE EVENT `monthly_gc`']
    }, {
      title: 'show create procedure',
      sql: ['SHOW CREATE PROCEDURE get_jails', 'SHOW CREATE PROCEDURE `get_jails`']
    }, {
      title: 'with',
      sql: ['WITH cte AS (SELECT id, ROW_NUMBER() OVER (PARTITION BY id, uid ORDER BY time DESC) ranking FROM t) SELECT id FROM cte WHERE ranking = 1', 'WITH `cte` AS (SELECT `id`, ROW_NUMBER() OVER (PARTITION BY `id`, `uid` ORDER BY `time` DESC) AS `ranking` FROM `t`) SELECT `id` FROM `cte` WHERE `ranking` = 1']
    }, {
      title: 'parentheses in from clause',
      sql: ['SELECT * FROM (user), (`name`)', 'SELECT * FROM (`user`), (`name`)']
    }, {
      title: 'blob data type',
      sql: ['CREATE TABLE `undo_log` (`id` bigint(20) NOT NULL AUTO_INCREMENT, `branch_id` bigint(20) NOT NULL, `xid` varchar(100) NOT NULL, `context` varchar(128) NOT NULL, `rollback_info` longblob NOT NULL, `log_status` int(11) NOT NULL, `log_created` datetime NOT NULL, `log_modified` datetime NOT NULL, `ext` varchar(100) DEFAULT NULL,PRIMARY KEY (`id` ASC) USING BTREE, UNIQUE KEY `ux_undo_log` (`xid` ASC, `branch_id` DESC) USING BTREE) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;', 'CREATE TABLE `undo_log` (`id` BIGINT(20) NOT NULL AUTO_INCREMENT, `branch_id` BIGINT(20) NOT NULL, `xid` VARCHAR(100) NOT NULL, `context` VARCHAR(128) NOT NULL, `rollback_info` LONGBLOB NOT NULL, `log_status` INT(11) NOT NULL, `log_created` DATETIME NOT NULL, `log_modified` DATETIME NOT NULL, `ext` VARCHAR(100) DEFAULT NULL, PRIMARY KEY (`id` ASC) USING BTREE, UNIQUE KEY `ux_undo_log` (`xid` ASC, `branch_id` DESC) USING BTREE) ENGINE = INNODB DEFAULT CHARSET = utf8 ROW_FORMAT = DYNAMIC']
    }, {
      title: 'positive number by plus sign',
      sql: ['select +5; select -5', 'SELECT 5 ; SELECT -5']
    }, {
      title: 'support xor operator',
      sql: ['SELECT (true xor false)', 'SELECT (TRUE XOR FALSE)']
    }, {
      title: 'logical operator without parentheses',
      sql: ['SELECT true OR false AND true;', 'SELECT TRUE OR FALSE AND TRUE']
    }, {
      title: 'logical operator in expr',
      sql: ['SELECT x>3 || x<9 && x=3;', 'SELECT `x` > 3 || `x` < 9 && `x` = 3']
    }, {
      title: 'escape double quoted',
      sql: ['SELECT "foo""bar" AS col;', 'SELECT "foo""bar" AS `col`']
    }, {
      title: 'escape quote',
      sql: ['SELECT * FROM t WHERE column1 = "foo\'bar"', 'SELECT * FROM `t` WHERE `column1` = "foo\'bar"']
    }, {
      title: 'escape bracket quoted',
      sql: ['SELECT `foo``bar`', 'SELECT `foo``bar`']
    }, {
      title: 'insert set statement without into',
      sql: ['insert t1 set c1 = 1', 'INSERT `t1` SET `c1` = 1']
    }, {
      title: 'support $ in alias ident',
      sql: ['select 1 as stuff$id from dual', 'SELECT 1 AS `stuff$id` FROM DUAL']
    }, {
      title: 'group concat with separator',
      sql: ["select GROUP_CONCAT(DISTINCT abc order by abc separator ';') as abc from business_table", "SELECT GROUP_CONCAT(DISTINCT `abc` ORDER BY `abc` ASC SEPARATOR ';') AS `abc` FROM `business_table`"]
    }, {
      title: 'group concat',
      sql: ["select\n          (SELECT group_concat(v SEPARATOR ', ' )\n          FROM category_table WHERE category = 3)\n          AS category\n          FROM fssa_esg_issues\n          group by id", "SELECT (SELECT GROUP_CONCAT(`v` SEPARATOR ', ') FROM `category_table` WHERE `category` = 3) AS `category` FROM `fssa_esg_issues` GROUP BY `id`"]
    }, {
      title: 'natural charset strings',
      sql: ["SELECT N'hello'", "SELECT N'hello'"]
    }, {
      title: '_latin1 string',
      sql: ["SELECT _latin1 x'AAFF00';", "SELECT _LATIN1 X'AAFF00'"]
    }, {
      title: 'binary string without x',
      sql: ["SELECT _binary 'hello';", "SELECT _BINARY 'hello'"]
    }, {
      title: 'geometry type',
      sql: ["CREATE TABLE `GeoCoordinateTable` (\n            `geoCoordinate` point NOT NULL\n          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", 'CREATE TABLE `GeoCoordinateTable` (`geoCoordinate` POINT NOT NULL) ENGINE = INNODB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci']
    }, {
      title: 'have clause with parentheses',
      sql: ["SELECT col1, col2\n          FROM table1\n          HAVING (col1 LIKE '%foo%' OR\n                  col2 LIKE '%bar%')\n             AND col1 <> 'test'", "SELECT `col1`, `col2` FROM `table1` HAVING (`col1` LIKE '%foo%' OR `col2` LIKE '%bar%') AND `col1` <> 'test'"]
    }, {
      title: 'regexep right could be function call',
      sql: ["select\n          (SELECT group_concat(v)\n          FROM keyperson WHERE e.keyperson\n          REGEXP concat('\b', k, '\b'))\n          AS keyperson\n          FROM abc e", "SELECT (SELECT GROUP_CONCAT(`v`) FROM `keyperson` WHERE `e`.`keyperson` REGEXP concat('\b', `k`, '\b')) AS `keyperson` FROM `abc` AS `e`"]
    }, {
      title: 'set op UNION',
      sql: ["SELECT * FROM (SELECT 1) union SELECT * FROM (SELECT 2)", 'SELECT * FROM (SELECT 1) UNION SELECT * FROM (SELECT 2)']
    }, {
      title: 'set op UNION ALL',
      sql: ["SELECT * FROM (SELECT 1) union all SELECT * FROM (SELECT 2)", 'SELECT * FROM (SELECT 1) UNION ALL SELECT * FROM (SELECT 2)']
    }, {
      title: 'set op UNION DISTINCT',
      sql: ["SELECT * FROM (SELECT 1) union distinct SELECT * FROM (SELECT 2)", 'SELECT * FROM (SELECT 1) UNION DISTINCT SELECT * FROM (SELECT 2)']
    }, {
      title: 'set op INTERSECT',
      sql: ["SELECT * FROM (SELECT 1) intersect SELECT * FROM (SELECT 2)", 'SELECT * FROM (SELECT 1) INTERSECT SELECT * FROM (SELECT 2)']
    }, {
      title: 'set op minus',
      sql: ["SELECT * FROM (SELECT 1) minus SELECT * FROM (SELECT 2)", 'SELECT * FROM (SELECT 1) MINUS SELECT * FROM (SELECT 2)']
    }, {
      title: 'index column length',
      sql: ['CREATE TABLE `Translation` (`id` char(36) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,`en-GB` text,PRIMARY KEY (`id`),KEY `Translation_en-GB_btree_idx` (`en-GB`(768))) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci', 'CREATE TABLE `Translation` (`id` CHAR(36) NOT NULL CHARACTER SET ASCII COLLATE ASCII_BIN, `en-GB` TEXT, PRIMARY KEY (`id`), KEY Translation_en-GB_btree_idx (`en-GB` (768))) ENGINE = INNODB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci']
    }, {
      title: 'update after with clause',
      sql: ["with oops as (\n            SELECT from_name,to_ccn, to_name\n            from dolt_commit_diff_hospitals where from_commit = 'qtd6vb07pq7bfgt67m863anntm6fpu7n'\n            and to_commit = 'p730obnbmihnlq54uvenck13h12f7831'\n            and from_name <> to_name\n            )\n            update hospitals h\n            join oops o\n                on h.ccn = o.to_ccn\n                and h.name <> o.from_name\n            set h.name = o.from_name\n          ", "WITH `oops` AS (SELECT `from_name`, `to_ccn`, `to_name` FROM `dolt_commit_diff_hospitals` WHERE `from_commit` = 'qtd6vb07pq7bfgt67m863anntm6fpu7n' AND `to_commit` = 'p730obnbmihnlq54uvenck13h12f7831' AND `from_name` <> `to_name`) UPDATE `hospitals` AS `h` INNER JOIN `oops` AS `o` ON `h`.`ccn` = `o`.`to_ccn` AND `h`.`name` <> `o`.`from_name` SET `h`.`name` = `o`.`from_name`"]
    }, {
      title: 'cross join',
      sql: ['select A.id,B.name from A CROSS JOIN B', 'SELECT `A`.`id`, `B`.`name` FROM `A` CROSS JOIN `B`']
    }, {
      title: 'case when list',
      sql: ["select A.id,B.name\n          from A, B\n          where\n          CASE\n              when A.id = 0 then B.name in ('aaa', 'bbb')\n              when A.id = 1 then B.name in ('bbb', 'ccc')\n              when A.id = 2 then B.name in ('ccc', 'ddd')\n          end;", "SELECT `A`.`id`, `B`.`name` FROM `A`, `B` WHERE CASE WHEN `A`.`id` = 0 THEN `B`.`name` IN ('aaa', 'bbb') WHEN `A`.`id` = 1 THEN `B`.`name` IN ('bbb', 'ccc') WHEN `A`.`id` = 2 THEN `B`.`name` IN ('ccc', 'ddd') END"]
    }, {
      title: 'drop database or schema stmt',
      sql: ['DROP DATABASE IF EXISTS dbName; drop schema abc', 'DROP DATABASE IF EXISTS `dbName` ; DROP SCHEMA `abc`']
    }, {
      title: 'create table with multiple data types',
      sql: ["CREATE TABLE `table_name` (`type_TINYINT` tinyint DEFAULT NULL, `type_SMALLINT` smallint DEFAULT NULL, `type_MEDIUMINT` mediumint DEFAULT NULL, `type_INT` int DEFAULT NULL, `type_BIGINT` bigint DEFAULT NULL, `type_FLOAT` float DEFAULT NULL, `type_DOUBLE` double DEFAULT NULL, `type_BIT` bit(1) DEFAULT NULL, `type_DATE` date DEFAULT NULL, `type_TIME` time DEFAULT NULL, `type_DATETIME` datetime DEFAULT NULL, `type_TIMESTAMP` timestamp NULL DEFAULT NULL, `type_YEAR` year DEFAULT NULL, `type_CHAR` char(10) DEFAULT NULL, `type_VARCHAR` varchar(255) DEFAULT NULL, `type_DECIMAL` decimal(10,2) DEFAULT NULL, `type_NUMERIC` decimal(10,2) DEFAULT NULL, `type_TINYTEXT` tinytext, `type_TEXT` text, `type_MEDIUMTEXT` mediumtext, `type_LONGTEXT` longtext, `type_ENUM` enum('A','B','C') DEFAULT NULL, `type_SET` set('A','B','C') DEFAULT NULL, `type_BINARY` binary(10) DEFAULT NULL, `type_VARBINARY` varbinary(255) DEFAULT NULL, `type_TINYBLOB` tinyblob, `type_BLOB` blob, `type_MEDIUMBLOB` mediumblob, `type_LONGBLOB` longblob) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", "CREATE TABLE `table_name` (`type_TINYINT` TINYINT DEFAULT NULL, `type_SMALLINT` SMALLINT DEFAULT NULL, `type_MEDIUMINT` MEDIUMINT DEFAULT NULL, `type_INT` INT DEFAULT NULL, `type_BIGINT` BIGINT DEFAULT NULL, `type_FLOAT` FLOAT DEFAULT NULL, `type_DOUBLE` DOUBLE DEFAULT NULL, `type_BIT` BIT(1) DEFAULT NULL, `type_DATE` DATE DEFAULT NULL, `type_TIME` TIME DEFAULT NULL, `type_DATETIME` DATETIME DEFAULT NULL, `type_TIMESTAMP` TIMESTAMP NULL DEFAULT NULL, `type_YEAR` YEAR DEFAULT NULL, `type_CHAR` CHAR(10) DEFAULT NULL, `type_VARCHAR` VARCHAR(255) DEFAULT NULL, `type_DECIMAL` DECIMAL(10, 2) DEFAULT NULL, `type_NUMERIC` DECIMAL(10, 2) DEFAULT NULL, `type_TINYTEXT` TINYTEXT, `type_TEXT` TEXT, `type_MEDIUMTEXT` MEDIUMTEXT, `type_LONGTEXT` LONGTEXT, `type_ENUM` ENUM('A', 'B', 'C') DEFAULT NULL, `type_SET` SET('A', 'B', 'C') DEFAULT NULL, `type_BINARY` BINARY(10) DEFAULT NULL, `type_VARBINARY` VARBINARY(255) DEFAULT NULL, `type_TINYBLOB` TINYBLOB, `type_BLOB` BLOB, `type_MEDIUMBLOB` MEDIUMBLOB, `type_LONGBLOB` LONGBLOB) ENGINE = INNODB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci"]
    }, {
      title: 'remove type keyword',
      sql: ["ALTER TABLE test ADD\n          type varchar(255) NOT NULL DEFAULT ('default');", "ALTER TABLE `test` ADD `type` VARCHAR(255) NOT NULL DEFAULT ('default')"]
    }, {
      title: 'string concatenator in where clause',
      sql: ["SELECT * from tests where name = 'test' || 'abc';", "SELECT * FROM `tests` WHERE `name` = 'test' || 'abc'"]
    }, {
      title: 'show create table',
      sql: ['SHOW CREATE TABLE `debug`', 'SHOW CREATE TABLE `debug`']
    }, {
      title: 'drop view stmt',
      sql: ['drop view test_view cascade', 'DROP VIEW `test_view` CASCADE']
    }, {
      title: 'column name startswith "column"',
      sql: ['ALTER TABLE table_name ADD column4 varchar(255)', 'ALTER TABLE `table_name` ADD `column4` VARCHAR(255)']
    }, {
      title: 'convert number to data type',
      sql: ['select convert(150, char)', 'SELECT CONVERT(150, CHAR)']
    }, {
      title: 'convert func to data type',
      sql: ['SELECT CONVERT(SEC_TO_TIME(2378), TIME);', 'SELECT CONVERT(SEC_TO_TIME(2378), TIME)']
    }, {
      title: 'drop trigger',
      sql: ['drop trigger schema1.trigger1', 'DROP TRIGGER `schema1`.`trigger1`']
    }, {
      title: 'drop trigger if exists',
      sql: ['drop trigger if exists trigger1', 'DROP TRIGGER IF EXISTS `trigger1`']
    }, {
      title: 'create trigger',
      sql: ['create trigger trigger1 before update on merge for each row set NEW.updated_at = current_timestamp()', 'CREATE TRIGGER `trigger1` BEFORE UPDATE ON `merge` FOR EACH ROW SET `NEW`.`updated_at` = CURRENT_TIMESTAMP()']
    }, {
      title: 'create trigger with trigger order',
      sql: ['create trigger trigger1 before update on merge for each row  follows trigger2 set NEW.updated_at = current_timestamp()', 'CREATE TRIGGER `trigger1` BEFORE UPDATE ON `merge` FOR EACH ROW FOLLOWS `trigger2` SET `NEW`.`updated_at` = CURRENT_TIMESTAMP()']
    }, {
      title: 'show columns from table',
      sql: ['SHOW COLUMNS FROM table_name', 'SHOW COLUMNS FROM `table_name`']
    }, {
      title: 'show indexes from table',
      sql: ['SHOW INDEXES FROM table_name', 'SHOW INDEXES FROM `table_name`']
    }, {
      title: 'show triggers',
      sql: ['SHOW TRIGGERS', 'SHOW TRIGGERS']
    }, {
      title: 'show status',
      sql: ['SHOW PROCEDURE STATUS', 'SHOW PROCEDURE STATUS']
    }, {
      title: 'alter table modify column',
      sql: ["ALTER TABLE gifshow.reporter MODIFY Column update_at BIGINT UNSIGNED NOT NULL COMMENT 'update_at';", "ALTER TABLE `gifshow`.`reporter` MODIFY COLUMN `update_at` BIGINT UNSIGNED NOT NULL COMMENT 'update_at'"]
    }, {
      title: 'escape char patten matching',
      sql: ["select c1 from t1 where c2 like 'abc' escape '!'", "SELECT `c1` FROM `t1` WHERE `c2` LIKE 'abc' ESCAPE '!'"]
    }, {
      title: 'frac can be missing',
      sql: ['SELECT *, a*1., b FROM t', 'SELECT *, `a` * 1, `b` FROM `t`']
    }, {
      title: 'show tables',
      sql: ['show tables', 'SHOW TABLES']
    }, {
      title: 'create table with set dataType',
      sql: ["CREATE TABLE `users` (`id` int unsigned NOT NULL AUTO_INCREMENT, `name` varchar(20) DEFAULT NULL, `score` float DEFAULT '0', `coins` set('gold','silver','bronze','white','black') DEFAULT NULL, PRIMARY KEY (`id`), UNIQUE KEY `name` (`name`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_c", "CREATE TABLE `users` (`id` INT UNSIGNED NOT NULL AUTO_INCREMENT, `name` VARCHAR(20) DEFAULT NULL, `score` FLOAT DEFAULT '0', `coins` SET('gold', 'silver', 'bronze', 'white', 'black') DEFAULT NULL, PRIMARY KEY (`id`), UNIQUE KEY `name` (`name`)) ENGINE = INNODB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_c"]
    }, {
      title: 'nested subqueries',
      sql: ['select t.a,(select ( select POW(1 + 3, 2) from dual) from dual) from db.t', 'SELECT `t`.`a`, (SELECT (SELECT POW(1 + 3, 2) FROM DUAL) FROM DUAL) FROM `db`.`t`']
    }, {
      title: 'grant priv all',
      sql: ["GRANT ALL ON db1.* TO 'jeffrey'@'localhost';", "GRANT ALL ON `db1`.* TO 'jeffrey'@'localhost'"]
    }, {
      title: 'grant role',
      sql: ["GRANT 'role1', 'role2' TO 'user1'@'localhost', 'user2'@'localhost';", "GRANT 'role1', 'role2' TO 'user1'@'localhost', 'user2'@'localhost'"]
    }, {
      title: 'grant to role',
      sql: ["GRANT SELECT ON world.* TO 'role3';", "GRANT SELECT ON `world`.* TO 'role3'"]
    }, {
      title: 'grant priv type',
      sql: ["GRANT SELECT, INSERT ON mydb.* TO 'someuser'@'somehost';", "GRANT SELECT, INSERT ON `mydb`.* TO 'someuser'@'somehost'"]
    }, {
      title: 'grant priv type with columns',
      sql: ["GRANT SELECT (col1), INSERT (col1, col2) ON mydb.mytbl TO 'someuser'@'somehost';", "GRANT SELECT (`col1`), INSERT (`col1`, `col2`) ON `mydb`.`mytbl` TO 'someuser'@'somehost'"]
    }, {
      title: 'grant proxy',
      sql: ["GRANT PROXY ON 'localuser'@'localhost' TO 'externaluser'@'somehost';", "GRANT PROXY ON 'localuser'@'localhost' TO 'externaluser'@'somehost'"]
    }, {
      title: 'grant with option',
      sql: ["GRANT ALL ON *.* TO 'someuser'@'somehost' WITH GRANT OPTION", "GRANT ALL ON *.* TO 'someuser'@'somehost' WITH GRANT OPTION"]
    }, {
      title: 'convert using',
      sql: ["select convert(json_unquote(json_extract('{\"thing\": \"252\"}', \"$.thing\")) using utf8);", "SELECT CONVERT(json_unquote(json_extract('{\"thing\": \"252\"}', \"$.thing\")) USING UTF8)"]
    }, {
      title: 'table option checksum and delay_key_write',
      sql: ['create table `users` (id int(11) not null) ENGINE=InnoDB AUTO_INCREMENT=10833 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC', 'CREATE TABLE `users` (`id` INT(11) NOT NULL) ENGINE = INNODB AUTO_INCREMENT = 10833 DEFAULT CHARSET = utf8 CHECKSUM = 1 DELAY_KEY_WRITE = 1 ROW_FORMAT = DYNAMIC']
    }, {
      title: 'column with db prefix',
      sql: ['SELECT d.t.* FROM d.t', 'SELECT `d`.`t`.* FROM `d`.`t`']
    }, {
      title: 'extract year-month',
      sql: ["SELECT EXTRACT(YEAR_MONTH FROM '2023-10-10')", "SELECT EXTRACT(YEAR_MONTH FROM '2023-10-10')"]
    }, {
      title: 'table name starts with number',
      sql: ['SELECT * FROM 2023t', 'SELECT * FROM `2023t`']
    }, {
      title: 'table name starts with lodash ignore keywords',
      sql: ['SELECT * FROM _rows', 'SELECT * FROM `_rows`']
    }, {
      title: 'insert ignore into',
      sql: ['INSERT IGNORE INTO tableName SET id=1', 'INSERT IGNORE INTO `tableName` SET `id` = 1']
    }, {
      title: 'expr in column',
      sql: ['SELECT col_1 = 0 AS is_admin FROM sample_table;', 'SELECT `col_1` = 0 AS `is_admin` FROM `sample_table`']
    }, {
      title: 'set column name is keyword',
      sql: ["UPDATE go_draw_type SET go=0, drawType=0, changeTag=(go_draw_type.changeTag + 1), modifiedAt='2023-11-09 20:27:47.735 UTC' WHERE (go_draw_type.id IN (405) AND (go_draw_type.uuid='1EE7DD91-2893-4296-A3C6-F7F5A62A134F' AND 1=1))", "UPDATE `go_draw_type` SET `go` = 0, `drawType` = 0, `changeTag` = (`go_draw_type`.`changeTag` + 1), `modifiedAt` = '2023-11-09 20:27:47.735 UTC' WHERE (`go_draw_type`.`id` IN (405) AND (`go_draw_type`.`uuid` = '1EE7DD91-2893-4296-A3C6-F7F5A62A134F' AND 1 = 1))"]
    }, {
      title: 'unary operator',
      sql: ['SELECT -foo > 0; SELECT +foo > 0; SELECT ~foo > 0; SELECT !1 > 0', 'SELECT -`foo` > 0 ; SELECT +`foo` > 0 ; SELECT ~`foo` > 0 ; SELECT !1 > 0']
    }, {
      title: 'like pattern',
      sql: ["SELECT\n          *\n        FROM\n          test\n        WHERE\n          name LIKE :pattern COLLATE utf8mb4_general_ci", 'SELECT * FROM `test` WHERE `name` LIKE :pattern COLLATE UTF8MB4_GENERAL_CI']
    }, {
      title: 'alter drop index',
      sql: ['ALTER TABLE table_name DROP INDEX index_name', 'ALTER TABLE `table_name` DROP INDEX index_name']
    }, {
      title: 'alter drop key',
      sql: ['ALTER TABLE table_name DROP key `key_name`', 'ALTER TABLE `table_name` DROP KEY `key_name`']
    }, {
      title: 'count args',
      sql: ['SELECT COUNT((A.col_1 = "03" AND A.col_2 ="") OR NULL) FROM sample_table A;', 'SELECT COUNT((`A`.`col_1` = "03" AND `A`.`col_2` = "") OR NULL) FROM `sample_table` AS `A`']
    }, {
      title: 'create user',
      sql: ["CREATE USER 'john'@'localhost' IDENTIFIED BY 'johnDoe1@'", "CREATE USER 'john'@'localhost' IDENTIFIED BY 'johnDoe1@'"]
    }, {
      title: 'cc',
      sql: ["CREATE USER 'joe'@'10.0.0.1' DEFAULT ROLE administrator, developer;", "CREATE USER 'joe'@'10.0.0.1' DEFAULT ROLE 'administrator', 'developer'"]
    }, {
      title: 'create user with password option',
      sql: ["CREATE USER 'jeffrey'@'localhost'\n          IDENTIFIED WITH caching_sha2_password BY 'new_password'\n          default role administrator, developer\n          require ssl and x509\n          with max_queries_per_hour 100\n          PASSWORD EXPIRE INTERVAL 180 DAY\n          FAILED_LOGIN_ATTEMPTS 3 PASSWORD_LOCK_TIME 2 account lock comment 'test comment' attribute '{\"fname\": \"James\", \"lname\": \"Scott\", \"phone\": \"123-456-7890\"}';", "CREATE USER 'jeffrey'@'localhost' IDENTIFIED WITH caching_sha2_password BY 'new_password' DEFAULT ROLE 'administrator', 'developer' REQUIRE SSL AND X509 WITH MAX_QUERIES_PER_HOUR 100 PASSWORD EXPIRE INTERVAL 180 DAY FAILED_LOGIN_ATTEMPTS 3 PASSWORD_LOCK_TIME 2 ACCOUNT LOCK COMMENT 'test comment' ATTRIBUTE '{\"fname\": \"James\", \"lname\": \"Scott\", \"phone\": \"123-456-7890\"}'"]
    }, {
      title: 'check constraint',
      sql: ['CREATE TABLE `table` (\n' + '`name` VARCHAR(255) CHECK(`name` LIKE \'ABC%\' AND LENGTH(`name`) >= 5)\n' + ');', "CREATE TABLE `table` (`name` VARCHAR(255) CHECK (`name` LIKE 'ABC%' AND LENGTH(`name`) >= 5))"]
    }, {
      title: 'show index',
      sql: ['show index from user', 'SHOW INDEX FROM `user`']
    }];
    SQL_LIST.forEach(function (sqlInfo) {
      var title = sqlInfo.title,
        sql = sqlInfo.sql;
      it("should support ".concat(title), function () {
        expect(getParsedSql(sql[0])).to.equal(sql[1]);
      });
      it("should support ".concat(title, " in mariadb"), function () {
        expect(getParsedSql(sql[0], mariadb)).to.equal(sql[1]);
      });
    });
    it('should throw error when args is not right', function () {
      var sql = "select convert(json_unquote(json_extract('{\"thing\": \"252\"}', \"$.thing\")));";
      expect(parser.astify.bind(parser, sql)).to["throw"]('Expected "!=", "#", "%", "&", "&&", "*", "+", ",", "-", "--", "/", "/*", "<", "<<", "<=", "<>", "=", ">", ">=", ">>", "AND", "BETWEEN", "IN", "IS", "LIKE", "NOT", "ON", "OR", "OVER", "REGEXP", "RLIKE", "USING", "XOR", "^", "div", "|", "||", or [ \\t\\n\\r] but ")" found.');
      expect(parser.astify.bind(parser, 'select convert("");')).to["throw"]('Expected "!=", "#", "%", "&", "&&", "*", "+", ",", "-", "--", "/", "/*", "<", "<<", "<=", "<>", "=", ">", ">=", ">>", "AND", "BETWEEN", "COLLATE", "IN", "IS", "LIKE", "NOT", "OR", "REGEXP", "RLIKE", "USING", "XOR", "^", "div", "|", "||", or [ \\t\\n\\r] but ")" found.');
      sql = 'SELECT AVG(Quantity,age) FROM table1;';
      expect(parser.astify.bind(parser, sql)).to["throw"]('Expected "#", "%", "&", "&&", "(", ")", "*", "+", "-", "--", "->", "->>", ".", "/", "/*", "<<", ">>", "XOR", "^", "div", "|", "||", [ \\t\\n\\r], [A-Za-z0-9_$\\x80-￿], or [A-Za-z0-9_:] but "," found.');
    });
    it('should join multiple table with comma', function () {
      var sql = 'SELECT * FROM t1 INNER JOIN t2 ON t1.id = t2.id, t3 AS tbl';
      var ast = parser.astify(sql);
      var tbl = {
        db: null,
        table: 't3',
        as: 'tbl'
      };
      var backSQL = 'SELECT * FROM `t1` INNER JOIN `t2` ON `t1`.`id` = `t2`.`id`, `t3` AS `tbl`';
      expect(ast.from[2]).to.be.eql(tbl);
      expect(parser.sqlify(ast)).to.be.equal(backSQL);
      ast = parser.astify(sql, mariadb);
      expect(ast.from[2]).to.be.eql(tbl);
      expect(parser.sqlify(ast, mariadb)).to.be.equal(backSQL);
    });
    it('should have spaces between keywords', function () {
      var sql = 'CREATE TABLE `foo` (`id` int UNIQUEKEYONUPDATECASCADE)';
      expect(parser.astify.bind(parser, sql)).to["throw"]('Expected "#", ")", ",", "--", "/*", "AS", "AUTO_INCREMENT", "CHARACTER", "CHECK", "COLLATE", "COLUMN_FORMAT", "COMMENT", "CONSTRAINT", "DEFAULT", "GENERATED", "KEY", "NOT NULL", "NULL", "PRIMARY", "REFERENCES", "STORAGE", "UNIQUE", or [ \\t\\n\\r] but "O" found.');
      expect(parser.astify.bind(parser, sql, mariadb)).to["throw"]('Expected "#", ")", ",", "--", "/*", "AUTO_INCREMENT", "CHARACTER", "CHECK", "COLLATE", "COLUMN_FORMAT", "COMMENT", "CONSTRAINT", "DEFAULT", "KEY", "NOT NULL", "NULL", "PRIMARY", "REFERENCES", "STORAGE", "UNIQUE", or [ \\t\\n\\r] but "O" found.');
    });
    describe('column clause', function () {
      it('should support fulltext search', function () {
        var sqlList = ['SELECT MATCH (`label`) AGAINST (?) AS `score` FROM `TABLE` ORDER BY `score` DESC', 'SELECT MATCH (`label`) AGAINST (?) AS `score`, MATCH (`id`, `name`) AGAINST (?) FROM `TABLE` ORDER BY `score` DESC', 'SELECT `label` FROM `TABLE` WHERE MATCH (`label`) AGAINST (?) > 0 ORDER BY `label` DESC', 'SELECT `label`, MATCH (`label`) AGAINST (?) AS `score` FROM `TABLE` ORDER BY `score` DESC', 'SELECT MATCH (`label`) AGAINST (?) AS `score` FROM `TABLE` WHERE MATCH (`label`) AGAINST (?) > 0 ORDER BY `score` DESC', 'SELECT `label`, MATCH (`label`) AGAINST (?) AS `score` FROM `TABLE` WHERE MATCH (`label`) AGAINST (?) > 0 ORDER BY `score` DESC', 'SELECT `label` FROM `TABLE` ORDER BY MATCH (`label`) AGAINST (?) DESC', 'SELECT MATCH (`label`) AGAINST (? IN BOOLEAN MODE) AS `score` FROM `TABLE` ORDER BY `score` DESC', 'SELECT `label` FROM `TABLE` WHERE MATCH (`label`) AGAINST (? IN BOOLEAN MODE) > 0 ORDER BY `label` DESC', 'SELECT `label`, MATCH (`label`) AGAINST (? IN BOOLEAN MODE) AS `score` FROM `TABLE` ORDER BY `score` DESC', 'SELECT MATCH (`label`) AGAINST (? IN BOOLEAN MODE) AS `score` FROM `TABLE` WHERE MATCH (`label`) AGAINST (? IN BOOLEAN MODE) > 0 ORDER BY `score` DESC', 'SELECT `label`, MATCH (`label`) AGAINST (? IN BOOLEAN MODE) AS `score` FROM `TABLE` WHERE MATCH (`label`) AGAINST (? IN BOOLEAN MODE) > 0 ORDER BY `score` DESC', 'SELECT `label` FROM `TABLE` ORDER BY MATCH (`label`) AGAINST (? IN BOOLEAN MODE) DESC', 'SELECT MATCH (`label`) AGAINST (? IN NATURAL LANGUAGE MODE) AS `score` FROM `TABLE` ORDER BY `score` DESC', 'SELECT `label` FROM `TABLE` WHERE MATCH (`label`) AGAINST (? IN NATURAL LANGUAGE MODE) > 0 ORDER BY `label` DESC', 'SELECT `label`, MATCH (`label`) AGAINST (? IN NATURAL LANGUAGE MODE) AS `score` FROM `TABLE` ORDER BY `score` DESC', 'SELECT MATCH (`label`) AGAINST (? IN NATURAL LANGUAGE MODE) AS `score` FROM `TABLE` WHERE MATCH (`label`) AGAINST (? IN NATURAL LANGUAGE MODE) > 0 ORDER BY `score` DESC', 'SELECT `label`, MATCH (`label`) AGAINST (? IN NATURAL LANGUAGE MODE) AS `score` FROM `TABLE` WHERE MATCH (`label`) AGAINST (? IN NATURAL LANGUAGE MODE) > 0 ORDER BY `score` DESC', 'SELECT `label` FROM `TABLE` ORDER BY MATCH (`label`) AGAINST (? IN NATURAL LANGUAGE MODE) DESC', 'SELECT MATCH (`label`) AGAINST (? IN NATURAL LANGUAGE MODE WITH QUERY EXPANSION) AS `score` FROM `TABLE` ORDER BY `score` DESC', 'SELECT `label` FROM `TABLE` WHERE MATCH (`label`) AGAINST (? IN NATURAL LANGUAGE MODE WITH QUERY EXPANSION) > 0 ORDER BY `label` DESC', 'SELECT `label`, MATCH (`label`) AGAINST (? IN NATURAL LANGUAGE MODE WITH QUERY EXPANSION) AS `score` FROM `TABLE` ORDER BY `score` DESC', 'SELECT MATCH (`label`) AGAINST (? IN NATURAL LANGUAGE MODE WITH QUERY EXPANSION) AS `score` FROM `TABLE` WHERE MATCH (`label`) AGAINST (? IN NATURAL LANGUAGE MODE WITH QUERY EXPANSION) > 0 ORDER BY `score` DESC', 'SELECT `label`, MATCH (`label`) AGAINST (? IN NATURAL LANGUAGE MODE WITH QUERY EXPANSION) AS `score` FROM `TABLE` WHERE MATCH (`label`) AGAINST (? IN NATURAL LANGUAGE MODE WITH QUERY EXPANSION) > 0 ORDER BY `score` DESC', 'SELECT `label` FROM `TABLE` ORDER BY MATCH (`label`) AGAINST (? IN NATURAL LANGUAGE MODE WITH QUERY EXPANSION) DESC', 'SELECT MATCH (`label`) AGAINST (? WITH QUERY EXPANSION) AS `score` FROM `TABLE` ORDER BY `score` DESC', 'SELECT `label` FROM `TABLE` WHERE MATCH (`label`) AGAINST (? WITH QUERY EXPANSION) > 0 ORDER BY `label` DESC', 'SELECT `label`, MATCH (`label`) AGAINST (? WITH QUERY EXPANSION) AS `score` FROM `TABLE` ORDER BY `score` DESC', 'SELECT MATCH (`label`) AGAINST (? WITH QUERY EXPANSION) AS `score` FROM `TABLE` WHERE MATCH (`label`) AGAINST (? WITH QUERY EXPANSION) > 0 ORDER BY `score` DESC', 'SELECT `label`, MATCH (`label`) AGAINST (? WITH QUERY EXPANSION) AS `score` FROM `TABLE` WHERE MATCH (`label`) AGAINST (? WITH QUERY EXPANSION) > 0 ORDER BY `score` DESC', 'SELECT `label` FROM `TABLE` ORDER BY MATCH (`label`) AGAINST (? WITH QUERY EXPANSION) DESC'];
        sqlList.forEach(function (sql) {
          expect(getParsedSql(sql)).to.equal(sql);
          expect(getParsedSql(sql, mariadb)).to.equal(sql);
        });
      });
      it('should throw error when colum is select stmt', function () {
        var sql = 'select\nselect * from test_table';
        var fun = parser.astify.bind(parser, sql);
        expect(fun).to["throw"]('invalid column clause with select statement');
        sql = 'select\nselect * from test_table and \nselect * from test_table2';
        fun = parser.astify.bind(parser, sql);
        expect(fun).to["throw"]('invalid column clause with select statement');
      });
      it('should support bit function and operators', function () {
        var sqlList = ['SELECT 127 | 128, 128 << 2, BIT_COUNT(15)', "SELECT '127' | '128', '128' << 2, BIT_COUNT('15')", "SELECT X'7F' | X'80', X'80' << 2, BIT_COUNT(X'0F')", "SELECT HEX(UUID_TO_BIN('6ccd780c-baba-1026-9564-5b8c656024db'))", "SELECT HEX(INET6_ATON('fe80::219:d1ff:fe91:1a72'))", "SELECT X'40' | X'01', b'11110001' & b'01001111'", "SELECT _BINARY X'40' | X'01', b'11110001' & _BINARY b'01001111'", "SELECT _BINARY X'4040404040404040' | X'0102030405060708'", "SELECT 64 | 1, X'40' | X'01'"];
        sqlList.forEach(function (sql) {
          expect(getParsedSql(sql)).to.equal(sql);
          expect(getParsedSql(sql, mariadb)).to.equal(sql);
        });
      });
    });
    describe('into', function () {
      it('should support select into variables', function () {
        var sql = 'SELECT * INTO @myvar FROM t1;';
        var parsedSQL = 'SELECT * INTO @myvar FROM `t1`';
        expect(getParsedSql(sql)).to.equal(parsedSQL);
        expect(getParsedSql(sql, mariadb)).to.equal(parsedSQL);
        sql = 'SELECT * FROM t1 INTO @myvar FOR UPDATE;';
        parsedSQL = 'SELECT * FROM `t1` INTO @myvar FOR UPDATE';
        expect(getParsedSql(sql)).to.equal(parsedSQL);
        expect(getParsedSql(sql, mariadb)).to.equal(parsedSQL);
        sql = 'SELECT * FROM t1 FOR UPDATE INTO @myvar;';
        parsedSQL = 'SELECT * FROM `t1` FOR UPDATE INTO @myvar';
        expect(getParsedSql(sql)).to.equal(parsedSQL);
        expect(getParsedSql(sql, mariadb)).to.equal(parsedSQL);
        sql = 'SELECT id, data INTO @x, @y FROM test.t1 LIMIT 1;';
        parsedSQL = 'SELECT `id`, `data` INTO @x, @y FROM `test`.`t1` LIMIT 1';
        expect(getParsedSql(sql)).to.equal(parsedSQL);
        expect(getParsedSql(sql, mariadb)).to.equal(parsedSQL);
      });
      it('should support select into outfile', function () {
        var sql = "SELECT * FROM (VALUES ROW(1,2,3),ROW(4,5,6),ROW(7,8,9)) AS t\n        INTO OUTFILE '/tmp/select-values.txt';";
        var parsedSQL = "SELECT * FROM (VALUES ROW(1,2,3), ROW(4,5,6), ROW(7,8,9)) AS `t` INTO OUTFILE '/tmp/select-values.txt'";
        expect(getParsedSql(sql)).to.equal(parsedSQL);
        expect(getParsedSql(sql, mariadb)).to.equal(parsedSQL);
      });
      it('should support select into dumpfile', function () {
        var sql = "SELECT * FROM (VALUES ROW(1,2,3),ROW(4,5,6),ROW(7,8,9)) AS t\n        INTO DUMPFILE '/tmp/select-values.txt';";
        var parsedSQL = "SELECT * FROM (VALUES ROW(1,2,3), ROW(4,5,6), ROW(7,8,9)) AS `t` INTO DUMPFILE '/tmp/select-values.txt'";
        expect(getParsedSql(sql)).to.equal(parsedSQL);
        expect(getParsedSql(sql, mariadb)).to.equal(parsedSQL);
      });
      it('should return empty when into is null', function () {
        expect(selectIntoToSQL()).to.be.undefined;
        expect(selectIntoToSQL({})).to.be.undefined;
      });
    });
  });
});

/***/ }),

/***/ "./test/noql.spec.js":
/*!***************************!*\
  !*** ./test/noql.spec.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(/*! chai */ "chai"),
  expect = _require.expect;
var Parser = __webpack_require__(/*! ../src/parser */ "./src/parser.js")["default"];
describe('noql', function () {
  var parser = new Parser();
  var DEFAULT_OPT = {
    database: 'noql'
  };
  function getParsedSql(sql) {
    var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_OPT;
    var ast = parser.astify(sql, opt);
    return parser.sqlify(ast, opt);
  }
  it('should support basic nosql', function () {
    var sql = 'SELECT  id,"First Name","Last Name",(SELECT * FROM Rentals WHERE staffId<10) AS rentalsArr FROM customers';
    expect(getParsedSql(sql)).to.be.equal('SELECT "id", "First Name", "Last Name", (SELECT * FROM "Rentals" WHERE "staffId" < 10) AS "rentalsArr" FROM "customers"');
    sql = "SELECT  Order1.id, unset(_id) FROM orders Order1 INNER JOIN(SELECT * FROM orders) 'Order2|unwind' on Order2.id = Order1.id LIMIT 1";
    expect(getParsedSql(sql)).to.be.equal('SELECT "Order1"."id", unset("_id") FROM "orders" AS "Order1" INNER JOIN (SELECT * FROM "orders") AS "Order2|unwind" ON "Order2"."id" = "Order1"."id" LIMIT 1');
    sql = "SELECT c.*,cn.* FROM customers c INNER JOIN (SELECT * from `customer-notes` where id>2) `cn|first` ON cn.id=c.id";
    expect(getParsedSql(sql)).to.be.equal('SELECT "c".*, "cn".* FROM "customers" AS "c" INNER JOIN (SELECT * FROM "customer-notes" WHERE "id" > 2) AS "cn|first" ON "cn"."id" = "c"."id"');
    sql = "SELECT * FROM customers c LEFT OUTER JOIN `customer-notes` `cn|first` ON cn.id=convert(c.id,'int')";
    expect(getParsedSql(sql)).to.be.equal("SELECT * FROM \"customers\" AS \"c\" LEFT JOIN \"customer-notes\" AS \"cn|first\" ON \"cn\".\"id\" = convert(\"c\".\"id\", 'int')");
    sql = "SELECT id,`First Name`,`Last Name`,avg_ARRAY((select filmId as '$$ROOT' from 'Rentals')) as avgIdRentals FROM customers";
    expect(getParsedSql(sql)).to.be.equal('SELECT "id", "First Name", "Last Name", avg_ARRAY((SELECT "filmId" AS "$$ROOT" FROM "Rentals")) AS "avgIdRentals" FROM "customers"');
    sql = 'SELECT CAST(abs(`id`) as decimal) AS `id` FROM `customers`';
    expect(getParsedSql(sql)).to.be.equal('SELECT CAST(abs("id") AS DECIMAL) AS "id" FROM "customers"');
    sql = 'select convert(`Replacement Cost`) as s from `films`';
    expect(getParsedSql(sql)).to.be.equal('SELECT convert("Replacement Cost") AS "s" FROM "films"');
    sql = "SELECT *,convert(`Replacement Cost`,'int') AS s FROM `films`";
    expect(getParsedSql(sql)).to.be.equal("SELECT *, convert(\"Replacement Cost\", 'int') AS \"s\" FROM \"films\"");
  });
  it('should support intersect', function () {
    var sql = "SELECT  *\n    FROM \"most-popular-films\"\n\n    INTERSECT\n\n    SELECT  *\n    FROM \"top-rated-films\"";
    expect(getParsedSql(sql)).to.be.equal('SELECT * FROM "most-popular-films" INTERSECT SELECT * FROM "top-rated-films"');
  });
});

/***/ }),

/***/ "./test/postgres.spec.js":
/*!*******************************!*\
  !*** ./test/postgres.spec.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(/*! chai */ "chai"),
  expect = _require.expect;
var _require2 = __webpack_require__(/*! ../src/insert */ "./src/insert.js"),
  conflictToSQL = _require2.conflictToSQL;
var _require3 = __webpack_require__(/*! ../src/proc */ "./src/proc.js"),
  procToSQL = _require3.procToSQL;
var Parser = __webpack_require__(/*! ../src/parser */ "./src/parser.js")["default"];
describe('Postgres', function () {
  var parser = new Parser();
  var opt = {
    database: 'postgresql'
  };
  function getParsedSql(sql, opt) {
    var ast = parser.astify(sql, opt);
    return parser.sqlify(ast, opt);
  }
  var SQL_LIST = [{
    title: 'select with_query_name',
    sql: ["WITH\n        subQ1 AS (SELECT * FROM Roster WHERE SchoolID = 52),\n        subQ2 AS (SELECT SchoolID FROM subQ1)\n      SELECT DISTINCT * FROM subQ2;", "WITH \"subQ1\" AS (SELECT * FROM \"Roster\" WHERE SchoolID = 52), \"subQ2\" AS (SELECT SchoolID FROM \"subQ1\") SELECT DISTINCT * FROM \"subQ2\""]
  }, {
    title: 'select subquery',
    sql: ["SELECT AVG ( PointsScored )\n        FROM\n        ( SELECT PointsScored\n          FROM Stats\n          WHERE SchoolID = 77 )", 'SELECT AVG(PointsScored) FROM (SELECT PointsScored FROM "Stats" WHERE SchoolID = 77)']
  }, {
    title: 'select subquery have alias',
    sql: ["SELECT r.LastName\n        FROM\n        ( SELECT * FROM Roster) AS r", 'SELECT "r".LastName FROM (SELECT * FROM "Roster") AS "r"']
  }, {
    title: 'select implicit "comma cross join"',
    sql: ['SELECT * FROM Roster, TeamMascot', 'SELECT * FROM "Roster", "TeamMascot"']
  }, {
    title: 'select inner join using',
    sql: ["SELECT FirstName\n        FROM Roster INNER JOIN PlayerStats\n        USING (LastName);", 'SELECT FirstName FROM "Roster" INNER JOIN "PlayerStats" USING ("LastName")']
  }, {
    title: 'set op UNION',
    sql: ["(SELECT s FROM t1) UNION (SELECT s FROM t2)", '(SELECT s FROM "t1") UNION (SELECT s FROM "t2")']
  }, {
    title: 'set op UNION ALL',
    sql: ["(SELECT s FROM t1) UNION ALL (SELECT s FROM t2)", '(SELECT s FROM "t1") UNION ALL (SELECT s FROM "t2")']
  }, {
    title: 'set op UNION DISTINCT',
    sql: ["(SELECT s FROM t1) UNION DISTINCT (SELECT s FROM t2)", '(SELECT s FROM "t1") UNION DISTINCT (SELECT s FROM "t2")']
  }, {
    title: 'Window Fns with qualified frame clause',
    sql: ["SELECT\n            first_name,\n            SUM(user_age) OVER (PARTITION BY user_city ORDER BY created_at DESC) AS age_window\n          FROM roster", 'SELECT first_name, SUM(user_age) OVER (PARTITION BY user_city ORDER BY created_at DESC) AS "age_window" FROM "roster"']
  }, {
    title: 'Window Fns',
    sql: ["SELECT\n            first_name,\n            SUM(user_age) OVER (PARTITION BY user_city ORDER BY created_at) AS age_window\n          FROM roster", 'SELECT first_name, SUM(user_age) OVER (PARTITION BY user_city ORDER BY created_at ASC) AS "age_window" FROM "roster"']
  }, {
    title: 'Window Fns + ROWS following',
    sql: ["SELECT\n            first_name,\n            SUM(user_age) OVER (\n                PARTITION BY user_city\n                ORDER BY created_at ASC\n                ROWS 1 FOLLOWING\n            ) AS age_window\n          FROM roster", 'SELECT first_name, SUM(user_age) OVER (PARTITION BY user_city ORDER BY created_at ASC ROWS 1 FOLLOWING) AS "age_window" FROM "roster"']
  }, {
    title: 'Window Fns + ROWS unbounded following',
    sql: ["SELECT\n            first_name,\n            SUM(user_age) OVER (\n                PARTITION BY user_city\n                ROWS UNbounded FOLLOWING\n            ) AS age_window\n          FROM roster", 'SELECT first_name, SUM(user_age) OVER (PARTITION BY user_city ROWS UNBOUNDED FOLLOWING) AS "age_window" FROM "roster"']
  }, {
    title: 'Window Fns + ROWS unbounded preceding',
    sql: ["SELECT\n            first_name,\n            SUM(user_age) OVER (\n                PARTITION BY user_city\n                ORDER BY created_at ASC\n                ROWS UNbounded preceding\n            ) AS age_window\n          FROM roster", 'SELECT first_name, SUM(user_age) OVER (PARTITION BY user_city ORDER BY created_at ASC ROWS UNBOUNDED PRECEDING) AS "age_window" FROM "roster"']
  }, {
    title: 'Window Fns + ROWS between',
    sql: ["SELECT\n            \"first_name\",\n            SUM(user_age) OVER (\n                PARTITION BY user_city\n                ORDER BY created_at DESC\n                ROWS BETWEEN 1 preceding AND 5 FOLLOWING\n            ) AS age_window,\n            SUM(user_age) OVER (\n                PARTITION BY user_city\n                ORDER BY created_at DESC\n                ROWS BETWEEN unbounded preceding AND unbounded following\n            ) AS age_window2\n          FROM roster", 'SELECT "first_name", SUM(user_age) OVER (PARTITION BY user_city ORDER BY created_at DESC ROWS BETWEEN 1 PRECEDING AND 5 FOLLOWING) AS "age_window", SUM(user_age) OVER (PARTITION BY user_city ORDER BY created_at DESC ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS "age_window2" FROM "roster"']
  }, {
    title: 'Window Fns + ROWS unbounded preceding + current row',
    sql: ["SELECT\n            first_name,\n            SUM(user_age) OVER (\n                PARTITION BY user_city\n                ORDER BY created_at, user_id ASC\n                ROWS BETWEEN UNbounded preceding AND CURRENT ROW\n            ) AS age_window\n          FROM roster", 'SELECT first_name, SUM(user_age) OVER (PARTITION BY user_city ORDER BY created_at ASC, user_id ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS "age_window" FROM "roster"']
  }, {
    title: 'Window Fns + RANKING',
    sql: ["SELECT\n            ROW_NUMBER() OVER (\n                PARTITION BY user_city\n                ORDER BY created_at\n            ) AS age_window\n          FROM roster", 'SELECT ROW_NUMBER() OVER (PARTITION BY user_city ORDER BY created_at ASC) AS "age_window" FROM "roster"']
  }, {
    title: 'Window Fns + DENSE_RANK w/ empty OVER',
    sql: ["SELECT\n            DENSE_RANK() OVER () AS age_window\n          FROM roster", 'SELECT DENSE_RANK() OVER () AS "age_window" FROM "roster"']
  }, {
    title: 'Window Fns + LAG',
    sql: ["SELECT\n            LAG(user_name, 10) OVER (\n                PARTITION BY user_city\n                ORDER BY created_at\n            ) AS age_window\n          FROM roster", 'SELECT LAG(user_name, 10) OVER (PARTITION BY user_city ORDER BY created_at ASC) AS "age_window" FROM "roster"']
  }, {
    title: 'Window Fns + LEAD',
    sql: ["SELECT\n          LEAD(\"user_name\", 10) OVER (\n              PARTITION BY user_city\n              ORDER BY \"created_at\"\n          ) AS age_window\n        FROM roster", 'SELECT LEAD("user_name", 10) OVER (PARTITION BY user_city ORDER BY "created_at" ASC) AS "age_window" FROM "roster"']
  }, {
    title: 'Window Fns + NTH_VALUE',
    sql: ["SELECT\n        NTH_VALUE(user_name, 10) OVER (\n              PARTITION BY user_city\n              ORDER BY created_at\n          ) AS age_window\n        FROM roster", 'SELECT NTH_VALUE(user_name, 10) OVER (PARTITION BY user_city ORDER BY created_at ASC) AS "age_window" FROM "roster"']
  }, {
    title: 'Window Fns + LAG + explicit NULLS',
    sql: ["SELECT\n            LAG(user_name) ignore NULLS OVER (\n                PARTITION BY user_city\n                ORDER BY created_at\n            ) AS age_window\n          FROM roster", 'SELECT LAG(user_name) IGNORE NULLS OVER (PARTITION BY user_city ORDER BY created_at ASC) AS "age_window" FROM "roster"']
  }, {
    title: 'Window Fns + FIRST_VALUE',
    sql: ["SELECT\n            FIRST_VALUE(user_name ignore NULLS) OVER (\n                PARTITION BY user_city\n                ORDER BY created_at, ranking\n            ) AS age_window\n          FROM roster", 'SELECT FIRST_VALUE(user_name IGNORE NULLS) OVER (PARTITION BY user_city ORDER BY created_at ASC, ranking ASC) AS "age_window" FROM "roster"']
  }, {
    title: 'array column',
    sql: ["SELECT ARRAY[col1, col2, 1, 'str_literal'] from tableb", "SELECT ARRAY[col1,col2,1,'str_literal'] FROM \"tableb\""]
  }, {
    title: 'array column index',
    sql: ["select (array['a', 'b', 'c'])[2]", "SELECT (ARRAY['a','b','c'])[2]"]
  }, {
    title: 'array cast column index',
    sql: ["select ('{a, b, c}'::text[])[2]", "SELECT ('{a, b, c}'::TEXT[])[2]"]
  }, {
    title: 'column array index',
    sql: ["with t as (\n          select array['a', 'b', 'c'] as a\n        )\n        select a[2]\n        from t", "WITH \"t\" AS (SELECT ARRAY['a','b','c'] AS \"a\") SELECT a[2] FROM \"t\""]
  }, {
    title: 'row function column',
    sql: ["SELECT ROW(col1, col2, 'literal', 1) from tableb", "SELECT ROW(col1, col2, 'literal', 1) FROM \"tableb\""]
  }, {
    title: 'json column',
    sql: ["SELECT\n        d.metadata->>'communication_status' as communication_status\n      FROM\n        device d\n      WHERE d.metadata->>'communication_status' IS NOT NULL\n      LIMIT 10;", "SELECT \"d\".metadata ->> 'communication_status' AS \"communication_status\" FROM \"device\" AS \"d\" WHERE \"d\".metadata ->> 'communication_status' IS NOT NULL LIMIT 10"]
  }, {
    title: 'case when in pg',
    sql: ["SELECT SUM(CASE WHEN status = 'ACTIVE' THEN 1 ELSE 0 END) FROM tablename", "SELECT SUM(CASE WHEN status = 'ACTIVE' THEN 1 ELSE 0 END) FROM \"tablename\""]
  }, {
    title: 'case when multiple condition in pg',
    sql: ["select case\n        when\n          ee.start_time <= current_timestamp\n          and ee.end_time > current_timestamp\n        then\n          true\n        else\n          false\n        end\n          is_live,\n          is_upcoming from abc", "SELECT CASE WHEN \"ee\".start_time <= CURRENT_TIMESTAMP AND \"ee\".end_time > CURRENT_TIMESTAMP THEN TRUE ELSE FALSE END AS \"is_live\", is_upcoming FROM \"abc\""]
  }, {
    title: 'key keyword in pg',
    sql: ["SELECT * FROM partitions WHERE location IS NULL AND code like 'XX-%' AND key <> 1;", "SELECT * FROM \"partitions\" WHERE location IS NULL AND code LIKE 'XX-%' AND key <> 1"]
  }, {
    title: 'a multi-line single-quoted string',
    sql: ["SELECT 'Hello '\n            'world!' AS x;", "SELECT 'Hello world!' AS \"x\""]
  }, {
    title: 'left join',
    sql: ["select\n        person.first_name,\n        department.dept_name\n      from\n        person\n      left join department on person.dept_id = department.dept_id", 'SELECT "person".first_name, "department".dept_name FROM "person" LEFT JOIN "department" ON "person".dept_id = "department".dept_id']
  }, {
    title: 'create table with serial',
    sql: ["create table posts(id serial primary key, name varchar(128))", "CREATE TABLE \"posts\" (id SERIAL PRIMARY KEY, name VARCHAR(128))"]
  }, {
    title: 'cast to interval',
    sql: ["select '1 week'::interval", "SELECT '1 week'::INTERVAL"]
  }, {
    title: 'with clause support double quote',
    sql: ["with \"cte name\" as (\n          select 1\n        )\n        select * from \"cte name\"", "WITH \"cte name\" AS (SELECT 1) SELECT * FROM \"cte name\""]
  }, {
    title: 'select from values as',
    sql: ["select *\n        from (values (0, 0), (1, null), (null, 2), (3, 4)) as t(a,b)\n        where a is distinct from \"b\"", "SELECT * FROM (VALUES (0,0), (1,NULL), (NULL,2), (3,4)) AS \"t(a, b)\" WHERE a IS DISTINCT FROM \"b\""]
  }, {
    title: 'select from values as without parentheses',
    sql: ["select last(col) FROM VALUES(10),(5),(20) AS tab(col)", "SELECT last(col) FROM VALUES (10), (5), (20) AS \"tab(col)\""]
  }, {
    title: 'aggr_fun percentile_cont',
    sql: ["select percentile_cont(0.25) within group (order by a asc) as p25\n        from (values (0),(0),(1),(2),(3),(4)) as t(a)", "SELECT PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY a ASC) AS \"p25\" FROM (VALUES (0), (0), (1), (2), (3), (4)) AS \"t(a)\""]
  }, {
    title: 'aggr_fun percentile_cont with array args',
    sql: ["select percentile_cont(array[0.5, 1]) within group (order by a asc) as p25\n        from (values (0),(0),(1),(2),(3),(4)) as t(a)", "SELECT PERCENTILE_CONT(ARRAY[0.5,1]) WITHIN GROUP (ORDER BY a ASC) AS \"p25\" FROM (VALUES (0), (0), (1), (2), (3), (4)) AS \"t(a)\""]
  }, {
    title: 'aggr_fun mode',
    sql: ["select mode() within group (order by a asc) as p25\n        from (values (0),(0),(1),(2),(3),(4)) as t(a)", "SELECT MODE() WITHIN GROUP (ORDER BY a ASC) AS \"p25\" FROM (VALUES (0), (0), (1), (2), (3), (4)) AS \"t(a)\""]
  }, {
    title: 'similar to keyword in pg',
    sql: ["select name similar to 'John%' from (values ('John Doe'),('Jane Doe'),('Bob John')) as t(name)", "SELECT name SIMILAR TO 'John%' FROM (VALUES ('John Doe'), ('Jane Doe'), ('Bob John')) AS \"t(name)\""]
  }, {
    title: 'show tables',
    sql: ["show tables", "SHOW TABLES"]
  }, {
    title: 'String Constants',
    sql: ["select ''''", "SELECT ''''"]
  }, {
    title: 'String Constants',
    sql: ["SELECT '''To be, or not'', it starts.' AS x;", "SELECT '''To be, or not'', it starts.' AS \"x\""]
  }, {
    title: 'String Constants',
    sql: ["SELECT 'foo'\n        'bar';", "SELECT 'foobar'"]
  }, {
    title: 'String Constants with C-Style Escapes',
    sql: ["SELECT E'\\''", "SELECT E'\\''"]
  }, {
    title: 'schema prefix',
    sql: ["SELECT \"public\".\"Property\".\"id\",\n          \"public\".\"Property\".\"title\",\n          \"public\".\"Property\".\"description\",\n          \"public\".\"Property\".\"views\",\n          \"public\".\"Property\".\"saves\",\n          \"public\".\"Property\".\"postcode\",\n          \"public\".\"Property\".\"createdAt\"\n        FROM \"public\".\"Property\"\n        WHERE 1 = 1\n        ORDER BY \"public\".\"Property\".\"createdAt\"", "SELECT \"public\".\"Property\".\"id\", \"public\".\"Property\".\"title\", \"public\".\"Property\".\"description\", \"public\".\"Property\".\"views\", \"public\".\"Property\".\"saves\", \"public\".\"Property\".\"postcode\", \"public\".\"Property\".\"createdAt\" FROM \"public\".\"Property\" WHERE 1 = 1 ORDER BY \"public\".\"Property\".\"createdAt\" ASC"]
  }, {
    title: 'cast to datatype array',
    sql: ["select '{1,2,3}'::int[]", "SELECT '{1,2,3}'::INT[]"]
  }, {
    title: 'cast to datatype two dimension array',
    sql: ["select '{{1,2},{2,3},{3,4}}'::int[][]", "SELECT '{{1,2},{2,3},{3,4}}'::INT[][]"]
  }, {
    title: 'a newline before cast symbol',
    sql: ["select round(0.598736\n          ::numeric, 2)", "SELECT round(0.598736::NUMERIC, 2)"]
  }, {
    title: 'access array index in func parameter',
    sql: ['select round(arr[1])', 'SELECT round(arr[1])']
  }, {
    title: 'access array index in where clause',
    sql: ['SELECT * FROM a INNER JOIN b ON c = d[1]', 'SELECT * FROM "a" INNER JOIN "b" ON c = d[1]']
  }, {
    title: 'distinct on',
    sql: ['SELECT DISTINCT ON (a, b) a, b, c FROM tbl', 'SELECT DISTINCT ON (a, b) a, b, c FROM "tbl"']
  }, {
    title: 'select current_date only',
    sql: ['select current_date', 'SELECT CURRENT_DATE']
  }, {
    title: 'window function',
    sql: ["SELECT sum(salary) OVER w, avg(salary) OVER w\n        FROM empsalary\n        WINDOW w AS (PARTITION BY depname ORDER BY salary DESC);", 'SELECT SUM(salary) OVER w, AVG(salary) OVER w FROM "empsalary" WINDOW w AS (PARTITION BY depname ORDER BY salary DESC)']
  }, {
    title: '$ field id with parameters',
    sql: ['SELECT * FROM tablea WHERE comment_id = $<3>;', 'SELECT * FROM "tablea" WHERE comment_id = $<3>']
  }, {
    title: 'cast with binary expr',
    sql: ['select (3-2)::float / (2 * 123) + 111', 'SELECT (3 - 2)::FLOAT / (2 * 123) + 111']
  }, {
    title: 'cast with binary expr and cast',
    sql: ['select (2)::float/(3)::float', 'SELECT (2)::FLOAT / (3)::FLOAT']
  }, {
    title: 'on expr with and',
    sql: ["select *\n        from organization\n        JOIN payment ON organization.id = payment.organization_id and createdat = month", 'SELECT * FROM "organization" INNER JOIN "payment" ON "organization".id = "payment".organization_id AND createdat = month']
  }, {
    title: 'support tablesample',
    sql: ['select * from product.organization tablesample bernoulli(1)', 'SELECT * FROM "product"."organization" TABLESAMPLE bernoulli(1)']
  }, {
    title: 'support on clause with function and expr',
    sql: ["select * from pg_database a\n        join pg_database b\n        on a.oid = b.oid AND upper(a.datctype) = upper(b.datctype)", 'SELECT * FROM "pg_database" AS "a" INNER JOIN "pg_database" AS "b" ON "a".oid = "b".oid AND upper("a".datctype) = upper("b".datctype)']
  }, {
    title: 'support trim function',
    sql: ["SELECT TRIM('.' from '....test.....') AS TrimmedString;", "SELECT TRIM('.' FROM '....test.....') AS \"TrimmedString\""]
  }, {
    title: 'from values without as',
    sql: ["with statuses as (\n          select a\n          from (\n            values ('Closed'), ('Verified'), ('Done')\n          ) s(a)\n        ) select * from statuses", "WITH \"statuses\" AS (SELECT a FROM (VALUES ('Closed'), ('Verified'), ('Done')) AS \"s(a)\") SELECT * FROM \"statuses\""]
  }, {
    title: 'double dollar-quoted string',
    sql: ['SELECT $$foo bar$$;', 'SELECT $$foo bar$$']
  }, {
    title: 'single dollar-quoted string',
    sql: ["select $SomeTag$Dianne's horse$SomeTag$", "SELECT $SomeTag$Dianne's horse$SomeTag$"]
  }, {
    title: 'nested block comments',
    sql: ["select /* /* */ */ col from tbl", 'SELECT col FROM "tbl"']
  }, {
    title: 'select into',
    sql: ["select c1, c2 into t1 from t2", 'SELECT c1, c2 INTO "t1" FROM "t2"']
  }, {
    title: 'select;',
    sql: ["select;", 'SELECT']
  }, {
    title: 'with insert',
    sql: ["CREATE TABLE stuff(id SERIAL PRIMARY KEY, name VARCHAR);\n\n        WITH new_stuff AS (\n            INSERT INTO stuff (name) VALUES ('foo'), ('bar') RETURNING id\n        )\n        SELECT id\n        FROM new_stuff;", "CREATE TABLE \"stuff\" (id SERIAL PRIMARY KEY, name VARCHAR) ; WITH \"new_stuff\" AS (INSERT INTO \"stuff\" (name) VALUES ('foo'), ('bar') RETURNING id) SELECT id FROM \"new_stuff\""]
  }, {
    title: 'offset without limit',
    sql: ['select c1 from t1 offset 11', 'SELECT c1 FROM "t1" OFFSET 11']
  }, {
    title: 'support empty space after ::',
    sql: ['SELECT (COALESCE(wp.weight,  0))::double(10) as net_weight , wp.gross_weight:: double(10) FROM  wp ;', 'SELECT (COALESCE("wp".weight, 0))::DOUBLE(10) AS "net_weight", "wp".gross_weight::DOUBLE(10) FROM "wp"']
  }, {
    title: 'support nested json traversal',
    sql: ["SELECT meta.data->'foo'->'bar' as value FROM meta;", "SELECT \"meta\".data -> 'foo' -> 'bar' AS \"value\" FROM \"meta\""]
  }, {
    title: 'support nulls first or last after order by',
    sql: ['SELECT has_geometry FROM rooms WHERE rooms.index = 200 ORDER BY has_geometry DESC NULLS LAST;', 'SELECT has_geometry FROM "rooms" WHERE "rooms".index = 200 ORDER BY has_geometry DESC NULLS LAST']
  }, {
    title: 'support nulls after order by with default val',
    sql: ['SELECT has_geometry FROM rooms WHERE rooms.index = 200 ORDER BY has_geometry ASC NULLS;', 'SELECT has_geometry FROM "rooms" WHERE "rooms".index = 200 ORDER BY has_geometry ASC NULLS']
  }, {
    title: 'support lateral with subquery',
    sql: ['SELECT * FROM foo, LATERAL (SELECT * FROM bar WHERE bar.id = foo.bar_id) ss;', 'SELECT * FROM "foo", LATERAL (SELECT * FROM "bar" WHERE "bar".id = "foo".bar_id) AS "ss"']
  }, {
    title: 'support lateral with function',
    sql: ["SELECT p1.id, p2.id, v1, v2\n        FROM polygons p1, polygons p2,\n             LATERAL vertices(p1.poly) v1,\n             LATERAL vertices(p2.poly) v2\n        WHERE (v1 - v2) < 10 AND p1.id != p2.id;", 'SELECT "p1".id, "p2".id, v1, v2 FROM "polygons" AS "p1", "polygons" AS "p2", LATERAL vertices("p1".poly) AS "v1", LATERAL vertices("p2".poly) AS "v2" WHERE (v1 - v2) < 10 AND "p1".id != "p2".id']
  }, {
    title: 'support lateral with join',
    sql: ["SELECT m.name\n        FROM manufacturers m LEFT JOIN LATERAL get_product_names(m.id) pname ON true\n        WHERE pname IS NULL;", 'SELECT "m".name FROM "manufacturers" AS "m" LEFT JOIN LATERAL get_product_names("m".id) AS "pname" ON TRUE WHERE pname IS NULL']
  }, {
    title: 'support escape char patten matching',
    sql: ["select c1 from t1 where c2 like 'abc' escape '!'", "SELECT c1 FROM \"t1\" WHERE c2 LIKE 'abc' ESCAPE '!'"]
  }, {
    title: 'with or without timezone',
    sql: ['select cast(c as time with time zone)', 'SELECT CAST(c AS TIME WITH TIME ZONE)']
  }, {
    title: 'with or without timezone',
    sql: ['select cast(c as timestamp without time zone)', 'SELECT CAST(c AS TIMESTAMP WITHOUT TIME ZONE)']
  }, {
    title: 'bytea datatype',
    sql: ['SELECT \'abc \\153\\154\\155 \\052\\251\\124\'::bytea;', "SELECT 'abc \\153\\154\\155 \\052\\251\\124'::BYTEA"]
  }, {
    title: 'deallocate statement',
    sql: ['DEALLOCATE pdo_stmt_1', 'DEALLOCATE pdo_stmt_1']
  }, {
    title: 'deallocate statement with prepare',
    sql: ['DEALLOCATE PREPARE ALL', 'DEALLOCATE PREPARE ALL']
  }, {
    title: 'filter after aggregate expression',
    sql: ["SELECT date_trunc('month', buy_window) AS month_window, marketplace, SUM(currency_amount_a) FILTER (WHERE currency_symbol_a IN ('REN', 'EUR')) + SUM(currency_amount_b) FILTER (WHERE currency_symbol_b IN ('REN', 'EUR')) as volume FROM currency.forex WHERE buy_window >= to_timestamp(1522540800) GROUP BY project, month", "SELECT date_trunc('month', buy_window) AS \"month_window\", marketplace, SUM(currency_amount_a) FILTER (WHERE currency_symbol_a IN ('REN', 'EUR')) + SUM(currency_amount_b) FILTER (WHERE currency_symbol_b IN ('REN', 'EUR')) AS \"volume\" FROM \"currency\".\"forex\" WHERE buy_window >= to_timestamp(1522540800) GROUP BY project, month"]
  }, {
    title: 'decimal without prefix 0',
    sql: ["SELECT date_trunc('month', time_window) , SUM(ren) * .999 as ren_normalized FROM currencies.\"forex\" WHERE memory_address = '\x881d40237659c251811cec9c364ef91dc08d300c' GROUP BY 1", "SELECT date_trunc('month', time_window), SUM(ren) * 0.999 AS \"ren_normalized\" FROM \"currencies\".\"forex\" WHERE memory_address = '\x881d40237659c251811cec9c364ef91dc08d300c' GROUP BY 1"]
  }, {
    title: 'values as table name',
    sql: ["with values as (\n          select 1 as value\n        )\n        select * from values", 'WITH "values" AS (SELECT 1 AS "value") SELECT * FROM "values"']
  }, {
    title: 'bigserial datatype',
    sql: ['create table if not exists "users" ( "id" bigserial, "name" varchar(128) not null, "second_name" varchar(128) default null )', 'CREATE TABLE IF NOT EXISTS "users" ("id" BIGSERIAL, "name" VARCHAR(128) NOT NULL, "second_name" VARCHAR(128) DEFAULT NULL)']
  }, {
    title: 'delete statement',
    sql: ['DELETE FROM users WHERE id = 2;', 'DELETE FROM "users" WHERE id = 2']
  }, {
    title: 'column quoted data type',
    sql: ["select 'a'::\"char\" as b;", "SELECT 'a'::\"CHAR\" AS \"b\""]
  }, {
    title: 'set with quoted string',
    sql: ["set \"foo.bar\" = 'a';", "SET \"foo.bar\" = 'a'"]
  }, {
    title: 'show stmt',
    sql: ['show "foo.bar";', 'SHOW "foo.bar"']
  }, {
    title: 'create now at time zone',
    sql: ["CREATE TABLE IF NOT EXISTS \"users\" ( \"id\"           BIGSERIAL PRIMARY KEY, \"date_created\" TIMESTAMP WITHOUT TIME ZONE DEFAULT (now() at time zone 'utc'), \"first_name\"   VARCHAR(128) NOT NULL );", "CREATE TABLE IF NOT EXISTS \"users\" (\"id\" BIGSERIAL PRIMARY KEY, \"date_created\" TIMESTAMP WITHOUT TIME ZONE DEFAULT (now() AT TIME ZONE 'utc'), \"first_name\" VARCHAR(128) NOT NULL)"]
  }, {
    title: 'from clause in update',
    sql: ["UPDATE t1 SET c1 = 'x' FROM t2 WHERE c3 = t2.c2", "UPDATE \"t1\" SET c1 = 'x' FROM \"t2\" WHERE c3 = \"t2\".c2"]
  }, {
    title: 'from clause in update with select',
    sql: ["UPDATE t1 SET c1 = 'x' FROM (select c2 from t2) WHERE c3 = c2", "UPDATE \"t1\" SET c1 = 'x' FROM (SELECT c2 FROM \"t2\") WHERE c3 = c2"]
  }, {
    title: 'drop index',
    sql: ['drop index concurrently title_index cascade', 'DROP INDEX CONCURRENTLY title_index CASCADE']
  }, {
    title: 'with clause in update',
    sql: ["WITH olds AS (SELECT test_field_1, test_field_2 FROM test_tbl WHERE test_field_1=5)\n        UPDATE test_tbl SET test_field_2 ='tested!' WHERE test_field_1=5\n        RETURNING (SELECT test_field_1 FROM olds) AS test_field_1_old,\n        (SELECT test_field_2 FROM olds) AS test_field_2_old;", "WITH \"olds\" AS (SELECT test_field_1, test_field_2 FROM \"test_tbl\" WHERE test_field_1 = 5) UPDATE \"test_tbl\" SET test_field_2 = 'tested!' WHERE test_field_1 = 5 RETURNING (SELECT test_field_1 FROM \"olds\") AS \"test_field_1_old\", (SELECT test_field_2 FROM \"olds\") AS \"test_field_2_old\""]
  }, {
    title: 'string concatenator in where clause',
    sql: ["SELECT * from tests where name = 'test' || 'abc';", "SELECT * FROM \"tests\" WHERE name = 'test' || 'abc'"]
  }, {
    title: 'alter table add constraint',
    sql: ['ALTER TABLE address ADD CONSTRAINT user_id_address_fk FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE RESTRICT;', 'ALTER TABLE "address" ADD CONSTRAINT "user_id_address_fk" FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE ON UPDATE RESTRICT']
  }, {
    title: 'table constructor in join',
    sql: ["select last_name, salary, title\n        from employees e left join (\n            salaries s inner join titles t on s.emp_no = t.emp_no\n        ) on e.emp_no = s.emp_no", 'SELECT last_name, salary, title FROM "employees" AS "e" LEFT JOIN ("salaries" AS "s" INNER JOIN "titles" AS "t" ON "s".emp_no = "t".emp_no) ON "e".emp_no = "s".emp_no']
  }, {
    title: 'table constructor in from',
    sql: ["select last_name, salary\n        from (\n           employees inner join salaries on employees.emp_no = salaries.emp_no\n        );", 'SELECT last_name, salary FROM ("employees" INNER JOIN "salaries" ON "employees".emp_no = "salaries".emp_no)']
  }, {
    title: 'select from scheme.table.column',
    sql: ['select public.t1.* from public.t1;', 'SELECT public.t1.* FROM "public"."t1"']
  }, {
    title: 'ntile function',
    sql: ["SELECT  name,\n        amount,\n        NTILE(2) OVER (\n            ORDER BY amount\n        ) ntile,\n        unset(_id)\n        FROM function-test-data\n        WHERE testId='bugfix.ntile.case1'", "SELECT name, amount, NTILE(2) OVER (ORDER BY amount ASC) AS \"ntile\", unset(_id) FROM \"function-test-data\" WHERE testId = 'bugfix.ntile.case1'"]
  }, {
    title: 'support character data type',
    sql: ["SELECT 'x'::character varying;", "SELECT 'x'::CHARACTER VARYING"]
  }, {
    title: 'cast to jsonb and select key',
    sql: ["SELECT TextColumn::JSONB->>'name' FROM table1", "SELECT TextColumn::JSONB->> 'name' FROM \"table1\""]
  }, {
    title: 'cast to jsonb and select key in function',
    sql: ["SELECT CAST(properties AS JSONB)->>'name' FROM table1", "SELECT CAST(properties AS JSONB)->> 'name' FROM \"table1\""]
  }, {
    title: 'test !~ operator',
    sql: ["SELECT * FROM partitions WHERE code !~ xyz;", "SELECT * FROM \"partitions\" WHERE code !~ xyz"]
  }, {
    title: 'test ~ operator',
    sql: ["SELECT * FROM partitions WHERE code ~ xyz;", "SELECT * FROM \"partitions\" WHERE code ~ xyz"]
  }, {
    title: 'insert stmt',
    sql: ["insert into table1 (id, firstname, lastname, email)\n        values ($id, $firstname, $lastname, $email)\n        RETURNING *", 'INSERT INTO "table1" (id, firstname, lastname, email) VALUES ($id,$firstname,$lastname,$email) RETURNING *']
  }, {
    title: 'insert with on conflict do update',
    sql: ["insert into table1 (id, firstname, lastname, email)\n        values ($id, $firstname, $lastname, $email)\n        on conflict (id)\n        do\n        update set\n        firstname = $firstname,\n        lastname = $lastname,\n        email = $email,\n        updatedon = CURRENT_TIMESTAMP\n        RETURNING *", 'INSERT INTO "table1" (id, firstname, lastname, email) VALUES ($id,$firstname,$lastname,$email) ON CONFLICT (id) DO UPDATE SET firstname = $firstname, lastname = $lastname, email = $email, updatedon = CURRENT_TIMESTAMP RETURNING *']
  }, {
    title: 'insert with on conflict do nothing',
    sql: ["insert into table1 (id, \"firstname\", \"lastname\", email)\n        values ($id, $firstname, $lastname, $email)\n        on conflict\n        do nothing\n        RETURNING *", 'INSERT INTO "table1" (id, "firstname", "lastname", email) VALUES ($id,$firstname,$lastname,$email) ON CONFLICT DO NOTHING RETURNING *']
  }, {
    title: 'alter schema',
    sql: ['ALTER SCHEMA public OWNER TO postgres;', 'ALTER SCHEMA "public" OWNER TO "postgres"']
  }, {
    title: 'alter domain',
    sql: ['ALTER DOMAIN public."bıgınt" OWNER TO postgres;', 'ALTER DOMAIN "public"."bıgınt" OWNER TO "postgres"']
  }, {
    title: 'alter type',
    sql: ['ALTER TYPE public.mpaa_rating OWNER TO postgres;', 'ALTER TYPE "public"."mpaa_rating" OWNER TO "postgres"']
  }, {
    title: 'alter function',
    sql: ['ALTER FUNCTION public.film_in_stock(p_film_id integer, p_store_id integer, OUT p_film_count integer, p_effective_date timestamp with time zone, timestamp with time zone) OWNER TO postgres;', 'ALTER FUNCTION "public"."film_in_stock"(p_film_id INTEGER, p_store_id INTEGER, OUT p_film_count INTEGER, p_effective_date TIMESTAMP WITH TIME ZONE, TIMESTAMP WITH TIME ZONE) OWNER TO "postgres"']
  }, {
    title: 'alter function without args',
    sql: ['ALTER FUNCTION public.last_updated() OWNER TO postgres;', 'ALTER FUNCTION "public"."last_updated"() OWNER TO "postgres"']
  }, {
    title: 'alter aggregate',
    sql: ['ALTER AGGREGATE public.group_concat(text) OWNER TO postgres;', 'ALTER AGGREGATE "public"."group_concat"(TEXT) OWNER TO "postgres"']
  }, {
    title: 'alter aggregate with order by',
    sql: ['ALTER AGGREGATE mypercentile(float8 ORDER BY integer) SET SCHEMA mynewpercentile;', 'ALTER AGGREGATE "mypercentile"(FLOAT8 ORDER BY INTEGER) SET SCHEMA "mynewpercentile"']
  }, {
    title: 'create domain',
    sql: ['CREATE DOMAIN public."bıgınt" AS bigint;', 'CREATE DOMAIN "public"."bıgınt" AS BIGINT']
  }, {
    title: 'create domain with constraint',
    sql: ['CREATE DOMAIN public.year AS integer CONSTRAINT year_check CHECK (((VALUE >= 1901) AND (VALUE <= 2155)));', 'CREATE DOMAIN "public"."year" AS INTEGER CONSTRAINT "year_check" CHECK (((VALUE >= 1901) AND (VALUE <= 2155)))']
  }, {
    title: 'create domain with full definition',
    sql: ['CREATE DOMAIN public.year AS integer collate utf8mb4_bin default 0 CONSTRAINT year_check CHECK (((VALUE >= 1901) AND (VALUE <= 2155)));', 'CREATE DOMAIN "public"."year" AS INTEGER COLLATE UTF8MB4_BIN DEFAULT 0 CONSTRAINT "year_check" CHECK (((VALUE >= 1901) AND (VALUE <= 2155)))']
  }, {
    title: 'create type as enum',
    sql: ["CREATE TYPE public.mpaa_rating AS ENUM (\n          'G',\n          'PG',\n          'PG-13',\n          'R',\n          'NC-17'\n      );", "CREATE TYPE \"public\".\"mpaa_rating\" AS ENUM ('G', 'PG', 'PG-13', 'R', 'NC-17')"]
  }, {
    title: 'create type name',
    sql: ['create type public.test', 'CREATE TYPE "public"."test"']
  }, {
    title: 'create view',
    sql: ["CREATE OR REPLACE TEMPORARY RECURSIVE VIEW universal_comedies\n        with (check_option = local, security_barrier = false)\n        AS\n        SELECT *\n        FROM comedies\n        WHERE classification = 'U'\n        WITH LOCAL CHECK OPTION;", "CREATE OR REPLACE TEMPORARY RECURSIVE VIEW \"universal_comedies\" WITH (CHECK_OPTION = LOCAL, SECURITY_BARRIER = FALSE) AS SELECT * FROM \"comedies\" WHERE classification = 'U' WITH LOCAL CHECK OPTION"]
  }, {
    title: 'create trigger',
    sql: ["CREATE TRIGGER film_fulltext_trigger BEFORE INSERT OR UPDATE ON public.film FOR EACH ROW EXECUTE FUNCTION tsvector_update_trigger('fulltext', 'pg_catalog.english', 'title', 'description');", "CREATE TRIGGER \"film_fulltext_trigger\" BEFORE INSERT OR UPDATE ON \"public\".\"film\" FOR EACH ROW EXECUTE FUNCTION tsvector_update_trigger('fulltext', 'pg_catalog.english', 'title', 'description')"]
  }, {
    title: 'grant on schema',
    sql: ['GRANT ALL ON SCHEMA public TO PUBLIC;', 'GRANT ALL ON SCHEMA "public" TO PUBLIC']
  }, {
    title: 'grant table',
    sql: ['GRANT INSERT ON TABLE films TO PUBLIC;', 'GRANT INSERT ON TABLE "films" TO PUBLIC']
  }, {
    title: 'grant all tables',
    sql: ['GRANT SELECT ON ALL TABLES IN SCHEMA public, trusted TO PUBLIC;', 'GRANT SELECT ON ALL TABLES IN SCHEMA "public", "trusted" TO PUBLIC']
  }, {
    title: 'revoke on schema',
    sql: ['REVOKE ALL ON SCHEMA public FROM PUBLIC;', 'REVOKE ALL ON SCHEMA "public" FROM PUBLIC']
  }, {
    title: 'create function case when',
    sql: ["CREATE FUNCTION public._group_concat(text, text) RETURNS text\n        LANGUAGE sql IMMUTABLE\n        AS $_$\n          SELECT CASE\n            WHEN $2 IS NULL THEN $1\n            WHEN $1 IS NULL THEN $2\n            ELSE $1 || ', ' || $2\n          END\n        $_$;", "CREATE FUNCTION \"public\"._group_concat(TEXT, TEXT) RETURNS TEXT LANGUAGE sql IMMUTABLE AS $_$ SELECT CASE WHEN $2 IS NULL THEN $1 WHEN $1 IS NULL THEN $2 ELSE $1 || ', ' || $2 END $_$"]
  }, {
    title: 'create function select',
    sql: ["CREATE FUNCTION public.film_not_in_stock(p_film_id integer default 1, p_store_id integer = 1, OUT p_film_count integer) RETURNS SETOF integer\n        LANGUAGE sql\n        AS $_$\n          SELECT inventory_id\n          FROM inventory\n          WHERE film_id = $1\n          AND store_id = $2\n          AND NOT inventory_in_stock(inventory_id);\n        $_$;", "CREATE FUNCTION \"public\".film_not_in_stock(p_film_id INTEGER DEFAULT 1, p_store_id INTEGER = 1, OUT p_film_count INTEGER) RETURNS SETOF INTEGER LANGUAGE sql AS $_$ SELECT inventory_id FROM \"inventory\" WHERE film_id = $1 AND store_id = $2 AND NOT inventory_in_stock(inventory_id) $_$"]
  }, {
    title: 'create function with declare',
    sql: ["CREATE FUNCTION check_password(uname TEXT, pass TEXT)\n        RETURNS BOOLEAN AS $$\n        DECLARE passed BOOLEAN;\n        BEGIN\n                SELECT  (pwd = $2) INTO passed\n                FROM    pwds\n                WHERE   username = $1;\n\n                RETURN passed;\n        END;\n        $$  LANGUAGE plpgsql\n            SECURITY DEFINER\n            -- Set a secure search_path: trusted schema(s), then 'pg_temp'.\n            SET search_path = admin, pg_temp;\n        ", "CREATE FUNCTION check_password(uname TEXT, pass TEXT) RETURNS BOOLEAN AS $$ DECLARE passed BOOLEAN BEGIN SELECT (pwd = $2) INTO \"passed\" FROM \"pwds\" WHERE username = $1 ; RETURN passed END $$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = admin, pg_temp"]
  }, {
    title: 'create function returns table',
    sql: ["CREATE FUNCTION dup(int) RETURNS TABLE(f1 int, f2 text)\n        AS $$ SELECT $1, CAST($1 AS text) || ' is text' $$\n        LANGUAGE SQL;", "CREATE FUNCTION dup(INT) RETURNS TABLE (f1 INT, f2 TEXT) AS $$ SELECT $1, CAST($1 AS TEXT) || ' is text' $$ LANGUAGE SQL"]
  }, {
    title: 'create function with if else stmt',
    sql: ["CREATE FUNCTION public.inventory_in_stock(p_inventory_id integer) RETURNS boolean\n        LANGUAGE plpgsql\n        AS $$\n          DECLARE\n              v_rentals INTEGER;\n              v_out     INTEGER;\n          BEGIN\n              -- AN ITEM IS IN-STOCK IF THERE ARE EITHER NO ROWS IN THE rental TABLE\n              -- FOR THE ITEM OR ALL ROWS HAVE return_date POPULATED\n\n              SELECT count(*) INTO v_rentals\n              FROM rental\n              WHERE inventory_id = p_inventory_id;\n\n              IF v_rentals = 0 THEN\n                RETURN TRUE;\n              END IF;\n\n              SELECT COUNT(rental_id) INTO v_out\n              FROM inventory LEFT JOIN rental USING(inventory_id)\n              WHERE inventory.inventory_id = p_inventory_id\n              AND rental.return_date IS NULL;\n\n              IF v_out > 0 THEN\n                RETURN FALSE;\n              ELSEIF v_out = 0 THEN\n                RETURN FALSE;\n              ELSE\n                RETURN TRUE;\n              END IF;\n          END\n        $$;", 'CREATE FUNCTION "public".inventory_in_stock(p_inventory_id INTEGER) RETURNS BOOLEAN LANGUAGE plpgsql AS $$ DECLARE v_rentals INTEGER; v_out INTEGER BEGIN SELECT COUNT(*) INTO "v_rentals" FROM "rental" WHERE inventory_id = p_inventory_id ; IF v_rentals = 0 THEN RETURN TRUE; END IF ; SELECT COUNT(rental_id) INTO "v_out" FROM "inventory" LEFT JOIN "rental" USING ("inventory_id") WHERE "inventory".inventory_id = p_inventory_id AND "rental".return_date IS NULL ; IF v_out > 0 THEN RETURN FALSE; ELSEIF v_out = 0 THEN RETURN FALSE ; ELSE RETURN TRUE; END IF END $$']
  }, {
    title: 'create function without args',
    sql: ["CREATE FUNCTION public.last_updated() RETURNS trigger\n        LANGUAGE plpgsql\n        AS $$\n          BEGIN\n              NEW.last_update = CURRENT_TIMESTAMP;\n              RETURN NEW;\n          END $$;", 'CREATE FUNCTION "public".last_updated() RETURNS "trigger" LANGUAGE plpgsql AS $$ BEGIN NEW.last_update = CURRENT_TIMESTAMP ; RETURN NEW END $$']
  }, {
    title: 'create aggregate',
    sql: ["CREATE AGGREGATE public.group_concat(text order by integer, id integer) (\n          SFUNC = public._group_concat,\n          STYPE = text,\n          SSPACE = 2,\n          FINALFUNC_MODIFY = READ_ONLY\n        );", 'CREATE AGGREGATE "public".group_concat(TEXT ORDER BY INTEGER, id INTEGER) (SFUNC = "public"._group_concat, STYPE = TEXT, SSPACE = 2, FINALFUNC_MODIFY = READ_ONLY)']
  }, {
    title: 'create aggregate without orderby',
    sql: ["CREATE AGGREGATE public.group_concat(text, text) (\n          SFUNC = public._group_concat,\n          STYPE = text,\n          MFINALFUNC_MODIFY = SHAREABLE\n        );", 'CREATE AGGREGATE "public".group_concat(TEXT, TEXT) (SFUNC = "public"._group_concat, STYPE = TEXT, MFINALFUNC_MODIFY = SHAREABLE)']
  }, {
    title: 'raise only',
    sql: ['raise', 'RAISE']
  }, {
    title: 'raise notice',
    sql: ["RAISE NOTICE 'Calling cs_create_job(%)', v_job_id;", "RAISE NOTICE 'Calling cs_create_job(%)', v_job_id"]
  }, {
    title: 'raise expection',
    sql: ["RAISE EXCEPTION 'Nonexistent ID --> %', user_id\n        USING HINT = 'Please check your user ID';", "RAISE EXCEPTION 'Nonexistent ID --> %', user_id USING HINT = 'Please check your user ID'"]
  }, {
    title: 'raise condition',
    sql: ['RAISE division_by_zero;', 'RAISE division_by_zero']
  }, {
    title: 'raise sqlstate',
    sql: ["RAISE SQLSTATE '22012';", "RAISE SQLSTATE '22012'"]
  }, {
    title: 'execute stmt',
    sql: ['EXECUTE tmpSQL;', 'EXECUTE tmpSQL']
  }, {
    title: 'execute stmt with args',
    sql: ['EXECUTE test(a, b, c)', 'EXECUTE test(a, b, c)']
  }, {
    title: 'for loop',
    sql: ["CREATE FUNCTION refresh_mviews() RETURNS integer AS $$\n        DECLARE\n            mviews RECORD;\n        BEGIN\n            RAISE NOTICE 'Refreshing all materialized views...';\n\n            FOR mviews IN\n               SELECT n.nspname AS mv_schema,\n                      c.relname AS mv_name,\n                      pg_catalog.pg_get_userbyid(c.relowner) AS owner\n                 FROM pg_catalog.pg_class c\n            LEFT JOIN pg_catalog.pg_namespace n ON (n.oid = c.relnamespace)\n                WHERE c.relkind = 'm'\n             ORDER BY 1\n            LOOP\n\n                -- Now \"mviews\" has one record with information about the materialized view\n\n                RAISE NOTICE 'Refreshing materialized view %.% (owner: %)...',\n                             quote_ident(mviews.mv_schema),\n                             quote_ident(mviews.mv_name),\n                             quote_ident(mviews.owner);\n                EXECUTE format('REFRESH MATERIALIZED VIEW %I.%I', mviews.mv_schema, mviews.mv_name);\n            END LOOP;\n\n            RAISE NOTICE 'Done refreshing materialized views.';\n            RETURN 1;\n        END;\n        $$ LANGUAGE plpgsql;", "CREATE FUNCTION refresh_mviews() RETURNS INTEGER AS $$ DECLARE mviews RECORD BEGIN RAISE NOTICE 'Refreshing all materialized views...' ; FOR mviews IN SELECT \"n\".nspname AS \"mv_schema\", \"c\".relname AS \"mv_name\", pg_catalog.pg_get_userbyid(\"c\".relowner) AS \"owner\" FROM \"pg_catalog\".\"pg_class\" AS \"c\" LEFT JOIN \"pg_catalog\".\"pg_namespace\" AS \"n\" ON (\"n\".oid = \"c\".relnamespace) WHERE \"c\".relkind = 'm' ORDER BY 1 ASC LOOP RAISE NOTICE 'Refreshing materialized view %.% (owner: %)...', quote_ident(\"mviews\".\"mv_schema\"), quote_ident(\"mviews\".\"mv_name\"), quote_ident(\"mviews\".\"owner\") ; EXECUTE format('REFRESH MATERIALIZED VIEW %I.%I', \"mviews\".\"mv_schema\", \"mviews\".\"mv_name\") END LOOP ; RAISE NOTICE 'Done refreshing materialized views.' ; RETURN 1 END $$ LANGUAGE plpgsql"]
  }, {
    title: 'support accentuated characters',
    sql: ["SELECT 'Molière' AS théâtre", "SELECT 'Moli\xE8re' AS \"th\xE9\xE2tre\""]
  }, {
    title: 'support character varying',
    sql: ["CREATE TABLE \"public\".\"authors_table\" (\n          \"author_id\" integer NOT NULL,\n          \"first_name\" character varying NOT NULL,\n          \"last_name\" character varying NOT NULL,\n          \"birth_date\" date\n        );", 'CREATE TABLE "public"."authors_table" ("author_id" INTEGER NOT NULL, "first_name" CHARACTER VARYING NOT NULL, "last_name" CHARACTER VARYING NOT NULL, "birth_date" DATE)']
  }, {
    title: 'as double quoted',
    sql: ['select 1 as "one"', 'SELECT 1 AS "one"']
  }, {
    title: 'intersect op',
    sql: ["SELECT  item\n        FROM public.orders\n        WHERE ID = 1\n        INTERSECT\n        SELECT \"sku\"\n        FROM public.inventory\n        WHERE ID = 1", 'SELECT item FROM "public"."orders" WHERE ID = 1 INTERSECT SELECT "sku" FROM "public"."inventory" WHERE ID = 1']
  }, {
    title: 'set to in transactions',
    sql: ["BEGIN;\n        SET search_path TO ht_hyt;\n        COMMIT;", "BEGIN ; SET search_path TO ht_hyt ; COMMIT ;"]
  }, {
    title: 'transaction stmt',
    sql: ['begin;', 'BEGIN ;']
  }, {
    title: 'double quoted column cast',
    sql: ['SELECT "created_date"::date FROM src_hosts', 'SELECT "created_date"::DATE FROM "src_hosts"']
  }, {
    title: 'preserve column quoted symbol',
    sql: ['select "abc", def from tableName', 'SELECT "abc", def FROM "tableName"']
  }, {
    title: 'quoted function name',
    sql: ['SELECT * FROM "func"("start_time", "end_time")', 'SELECT * FROM "func"("start_time", "end_time")']
  }, {
    title: 'function name prefixed with quoted schema',
    sql: ['SELECT * FROM "schema"."func"("start_time", "end_time")', 'SELECT * FROM "schema"."func"("start_time", "end_time")']
  }, {
    title: 'truncate table',
    sql: ['TRUNCATE TABLE employee RESTART IDENTITY cascade', 'TRUNCATE TABLE "employee" RESTART IDENTITY CASCADE']
  }, {
    title: 'truncate all table',
    sql: ['TRUNCATE TABLE ONLY employee * CONTINUE IDENTITY RESTRICT', 'TRUNCATE TABLE ONLY "employee" * CONTINUE IDENTITY RESTRICT']
  }, {
    title: 'jsonb in select column',
    sql: ["SELECT data['author']['first_name'] as title FROM blogs", "SELECT data['author']['first_name'] AS \"title\" FROM \"blogs\""]
  }, {
    title: 'jsonb in update set',
    sql: ["UPDATE blogs SET data['author']['first_name'] = '\"Sarah\"'", "UPDATE \"blogs\" SET data['author']['first_name'] = '\"Sarah\"'"]
  }];
  function neatlyNestTestedSQL(sqlList) {
    sqlList.forEach(function (sqlInfo) {
      var title = sqlInfo.title,
        sql = sqlInfo.sql;
      it("should support ".concat(title), function () {
        expect(getParsedSql(sql[0], opt)).to.equal(sql[1]);
      });
    });
  }
  neatlyNestTestedSQL(SQL_LIST);
  describe('tables to sql', function () {
    it('should parse object tables', function () {
      var ast = parser.astify(SQL_LIST[100].sql[0], opt);
      ast[0].from[0].expr.parentheses = false;
      expect(parser.sqlify(ast, opt)).to.be.equal('SELECT last_name, salary FROM "employees" INNER JOIN "salaries" ON "employees".emp_no = "salaries".emp_no');
    });
  });
  describe('test pg parser speed', function () {
    it('should parse nested function call in ms', function () {
      var sql = "SELECT\n      f(f(f(\n                  SELECT\n                      f(\n                          f(\n                              f(c1,c2,c3,c4,c5,c6,c7,c8,c9)\n                          )\n                      )\n                  FROM t2\n\n        ))) as cf\n      FROM t1";
      var opt = {
        database: 'postgresql'
      };
      var start = Date.now();
      parser.astify(sql, opt);
      var end = Date.now();
      expect(end - start).to.be.lessThanOrEqual(1000);
      start = Date.now();
      parser.astify("SELECT coalesce(JSON_ARRAYAGG(JSON_OBJECT('id', id,'productId', productId,'colorId', colorId,'type', type)), JSON_ARRAY()) FROM abc");
      end = Date.now();
      expect(end - start).to.be.lessThan(100);
    });
  });
  describe('returning', function () {
    it('should parse returning clause', function () {
      var sql = "UPDATE buildings SET address = 'update test 2' WHERE id = 18 RETURNING id, address";
      expect(getParsedSql(sql, opt)).to.equal("UPDATE \"buildings\" SET address = 'update test 2' WHERE id = 18 RETURNING id, address");
      sql = "UPDATE buildings SET address = 'update test 2' WHERE id = 18 RETURNING *, address as newAddress";
      expect(getParsedSql(sql, opt)).to.equal("UPDATE \"buildings\" SET address = 'update test 2' WHERE id = 18 RETURNING *, address AS \"newAddress\"");
      sql = "UPDATE buildings SET address = 'update test 2' WHERE id = 18 RETURNING (SELECT address FROM buildings WHERE id = 18) as old_address;";
      expect(getParsedSql(sql, opt)).to.equal("UPDATE \"buildings\" SET address = 'update test 2' WHERE id = 18 RETURNING (SELECT address FROM \"buildings\" WHERE id = 18) AS \"old_address\"");
    });
  });
  describe('create sequence', function () {
    var SQL_LIST = [{
      title: 'create sequence',
      sql: ["CREATE SEQUENCE public.table_id_seq", 'CREATE SEQUENCE "public"."table_id_seq"']
    }, {
      title: 'create sequence increment by',
      sql: ["CREATE TEMPORARY SEQUENCE if not exists public.table_id_seq increment by 10", 'CREATE TEMPORARY SEQUENCE IF NOT EXISTS "public"."table_id_seq" INCREMENT BY 10']
    }, {
      title: 'create sequence increment by minvalue and maxvalue',
      sql: ["CREATE TEMPORARY SEQUENCE if not exists public.table_id_seq increment by 10 minvalue 20 maxvalue 30", 'CREATE TEMPORARY SEQUENCE IF NOT EXISTS "public"."table_id_seq" INCREMENT BY 10 MINVALUE 20 MAXVALUE 30']
    }, {
      title: 'create sequence increment by start with cache',
      sql: ["CREATE TEMPORARY SEQUENCE if not exists public.table_id_seq increment by 10 no minvalue no maxvalue start with 1 cache 3", 'CREATE TEMPORARY SEQUENCE IF NOT EXISTS "public"."table_id_seq" INCREMENT BY 10 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 3']
    }, {
      title: 'create sequence increment by start with cache, cycle and owned',
      sql: ["CREATE TEMPORARY SEQUENCE if not exists public.table_id_seq increment by 10 no minvalue no maxvalue start with 1 cache 3 no cycle owned by tn.cn", 'CREATE TEMPORARY SEQUENCE IF NOT EXISTS "public"."table_id_seq" INCREMENT BY 10 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 3 NO CYCLE OWNED BY "tn".cn']
    }, {
      title: 'create sequence increment by start with cache, cycle and owned',
      sql: ["CREATE TEMPORARY SEQUENCE if not exists public.table_id_seq increment 10 no minvalue no maxvalue start with 1 cache 3 cycle owned by none", 'CREATE TEMPORARY SEQUENCE IF NOT EXISTS "public"."table_id_seq" INCREMENT 10 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 3 CYCLE OWNED BY NONE']
    }, {
      title: 'cast oid type explicit',
      sql: ["SELECT CAST(c AS OID) FROM pg_attribute", 'SELECT CAST(c AS OID) FROM "pg_attribute"']
    }, {
      title: 'cast oid type implicit',
      sql: ["SELECT c::OID FROM pg_attribute", 'SELECT c::OID FROM "pg_attribute"']
    }, {
      title: 'cast regclass oid type',
      sql: ["SELECT c::REGCLASS FROM pg_attribute", 'SELECT c::REGCLASS FROM "pg_attribute"']
    }, {
      title: 'cast regregcollation oid type',
      sql: ["SELECT c::REGCOLLATION FROM pg_attribute", 'SELECT c::REGCOLLATION FROM "pg_attribute"']
    }, {
      title: 'cast regconfig oid type',
      sql: ["SELECT c::REGCONFIG FROM pg_attribute", 'SELECT c::REGCONFIG FROM "pg_attribute"']
    }, {
      title: 'cast regdictionary oid type',
      sql: ["SELECT c::REGDICTIONARY FROM pg_attribute", 'SELECT c::REGDICTIONARY FROM "pg_attribute"']
    }, {
      title: 'cast regnamespace oid type',
      sql: ["SELECT c::REGNAMESPACE FROM pg_attribute", 'SELECT c::REGNAMESPACE FROM "pg_attribute"']
    }, {
      title: 'cast regoper oid type',
      sql: ["SELECT c::REGOPER FROM pg_attribute", 'SELECT c::REGOPER FROM "pg_attribute"']
    }, {
      title: 'cast regoperator oid type',
      sql: ["SELECT c::REGOPERATOR FROM pg_attribute", 'SELECT c::REGOPERATOR FROM "pg_attribute"']
    }, {
      title: 'cast regproc oid type',
      sql: ["SELECT c::REGPROC FROM pg_attribute", 'SELECT c::REGPROC FROM "pg_attribute"']
    }, {
      title: 'cast regprocedure oid type',
      sql: ["SELECT c::REGPROCEDURE FROM pg_attribute", 'SELECT c::REGPROCEDURE FROM "pg_attribute"']
    }, {
      title: 'cast regrole oid type',
      sql: ["SELECT c::REGROLE FROM pg_attribute", 'SELECT c::REGROLE FROM "pg_attribute"']
    }, {
      title: 'cast regtype oid type',
      sql: ["SELECT c::REGTYPE FROM pg_attribute", 'SELECT c::REGTYPE FROM "pg_attribute"']
    }, {
      title: 'cast varchar with length',
      sql: ['SELECT name::VARCHAR(200) FROM raw_hosts', 'SELECT name::VARCHAR(200) FROM "raw_hosts"']
    }, {
      title: 'chinese oridinary identifier',
      sql: ['select 中文 from t1;', 'SELECT 中文 FROM "t1"']
    }, {
      title: 'chinese delimited identifier',
      sql: ['select "中文" from t1;', 'SELECT "中文" FROM "t1"']
    }, {
      title: 'double precision type',
      sql: ["CREATE TABLE test (\n            amount double precision\n          );", 'CREATE TABLE "test" (amount DOUBLE PRECISION)']
    }, {
      title: 'crosstab tablefunc',
      sql: ["SELECT * FROM crosstab( 'select student, subject, evaluation_result from evaluations order by 1,2', $$VALUES ('t'::text), ('f'::text)$$) AS final_result(Student TEXT, Geography NUMERIC,History NUMERIC,Language NUMERIC,Maths NUMERIC,Music NUMERIC);", "SELECT * FROM crosstab('select student, subject, evaluation_result from evaluations order by 1,2', $$VALUES ('t'::text), ('f'::text)$$) AS final_result(Student TEXT, Geography NUMERIC, History NUMERIC, Language NUMERIC, Maths NUMERIC, Music NUMERIC)"]
    }, {
      title: 'accentuated characters in column',
      sql: ["SELECT * FROM test WHERE théâtre = 'Molière'", "SELECT * FROM \"test\" WHERE th\xE9\xE2tre = 'Moli\xE8re'"]
    }, {
      title: 'cast when expr is additive expr',
      sql: ["SELECT\n            CASE\n                WHEN updated IS NOT NULL THEN (updated - created)::TIME\n            END AS some_time\n          FROM some_table", 'SELECT CASE WHEN updated IS NOT NULL THEN (updated - created)::TIME END AS "some_time" FROM "some_table"']
    }, {
      title: 'custom data type',
      sql: ["CREATE TYPE access_key_permission_kind AS ENUM ('FULL_ACCESS', 'FUNCTION_CALL');\n\n          CREATE TABLE\n          access_keys (\n          public_key text NOT NULL,\n          account_id text NOT NULL,\n          permission_kind access_key_permission_kind NOT NULL,\n          CONSTRAINT access_keys_pk PRIMARY KEY (public_key, account_id)\n          ) PARTITION BY HASH (public_key);", "CREATE TYPE \"access_key_permission_kind\" AS ENUM ('FULL_ACCESS', 'FUNCTION_CALL') ; CREATE TABLE \"access_keys\" (public_key TEXT NOT NULL, account_id TEXT NOT NULL, permission_kind access_key_permission_kind NOT NULL, CONSTRAINT \"access_keys_pk\" PRIMARY KEY (public_key, account_id)) PARTITION BY HASH(public_key)"]
    }];
    neatlyNestTestedSQL(SQL_LIST);
  });
  describe('pg ast', function () {
    it('should get correct columns and tables', function () {
      var sql = 'SELECT "Id" FROM "Test";';
      var ast = parser.parse(sql, opt);
      expect(ast.tableList).to.be.eql(['select::null::Test']);
      expect(ast.columnList).to.be.eql(['select::null::Id']);
      expect(ast.ast[0].columns).to.be.eql([{
        type: 'expr',
        expr: {
          type: 'column_ref',
          table: null,
          column: {
            expr: {
              type: 'double_quote_string',
              value: 'Id'
            }
          }
        },
        as: null
      }]);
      expect(parser.sqlify(ast.ast, opt)).to.be.equals(sql.slice(0, -1));
      sql = 'SELECT col1 + "col2" FROM "t1"';
      ast = parser.parse(sql, opt);
      expect(ast.tableList).to.be.eql(['select::null::t1']);
      expect(ast.columnList).to.be.eql(['select::null::col1', 'select::null::col2']);
      expect(ast.ast.columns[0].expr.right).to.be.eql({
        type: 'column_ref',
        table: null,
        column: {
          expr: {
            type: 'double_quote_string',
            value: 'col2'
          }
        }
      });
      expect(parser.sqlify(ast.ast, opt)).to.be.equals('SELECT col1 + "col2" FROM "t1"');
      sql = 'SELECT "col1" + "col2" FROM "t1"';
      ast = parser.parse(sql, opt);
      expect(ast.ast.columns[0].expr.left).to.be.eql({
        type: 'column_ref',
        table: null,
        column: {
          expr: {
            type: 'double_quote_string',
            value: 'col1'
          }
        }
      });
      expect(parser.sqlify(ast.ast, opt)).to.be.equals('SELECT "col1" + "col2" FROM "t1"');
    });
    it('should support conflict be empty', function () {
      expect(conflictToSQL(null)).to.be.equal('');
    });
    it('should proc assign', function () {
      expect(procToSQL({
        stmt: {
          type: 'assign',
          left: {
            type: 'default',
            value: 'abc'
          },
          keyword: '',
          right: {
            type: 'number',
            value: 123
          },
          symbol: '='
        }
      })).to.be.equal('abc = 123');
    });
    it('should throw error', function () {
      var sql = "select 1 as 'one'";
      var fun = parser.astify.bind(parser, sql, opt);
      expect(fun).to["throw"]("Expected \"--\", \"/*\", \"\\\"\", [ \\t\\n\\r], or [A-Za-z_\u4E00-\u9FA5] but \"'\" found.");
    });
  });
});

/***/ }),

/***/ "./test/redshift.spec.js":
/*!*******************************!*\
  !*** ./test/redshift.spec.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(/*! chai */ "chai"),
  expect = _require.expect;
var Parser = __webpack_require__(/*! ../src/parser */ "./src/parser.js")["default"];
describe('redshift', function () {
  var parser = new Parser();
  var DEFAULT_OPT = {
    database: 'redshift'
  };
  function getParsedSql(sql) {
    var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_OPT;
    var ast = parser.astify(sql, opt);
    return parser.sqlify(ast, opt);
  }
  it('should support qualify condition', function () {
    var sql = "SELECT sf_account_id, date_trunc('week', date_) as week_id, date_trunc('month', date_) as month_id, Last_VALUE(hermes_health_score IGNORE NULLS) OVER ( partition by sf_account_id, week_id ) as hermes_health_score,\n    Last_VALUE(hermes_health_score IGNORE NULLS) OVER ( partition by sf_account_id, month_id ) as hermes_health_score_monthly,  row_number() OVER ( PARTITION BY sf_account_id, date_trunc('week', date_)\n    ORDER BY date_ desc ) AS o_key_week  FROM dwh.dwh_health_score_hermes  WHERE date_trunc('month', date_) >= '2023-01-01'  Qualify o_key_week = 1";
    expect(getParsedSql(sql)).to.be.equal("SELECT sf_account_id, date_trunc('week', date_) AS \"week_id\", date_trunc('month', date_) AS \"month_id\", Last_VALUE(hermes_health_score IGNORE NULLS) OVER (PARTITION BY sf_account_id, week_id) AS \"hermes_health_score\", Last_VALUE(hermes_health_score IGNORE NULLS) OVER (PARTITION BY sf_account_id, month_id) AS \"hermes_health_score_monthly\", row_number() OVER (PARTITION BY sf_account_id, date_trunc('week', date_) ORDER BY date_ DESC) AS \"o_key_week\" FROM \"dwh\".\"dwh_health_score_hermes\" WHERE date_trunc('month', date_) >= '2023-01-01' QUALIFY o_key_week = 1");
    sql = "with pv as (\n      select\n        action_date,\n        visitor_id_v,\n        visit_country_name,\n        referer_channel_group,\n        email,\n        sgid,\n        mp.\"brand/non-brand\" as is_brand\n      from\n        dwh_fact_pageviews pv\n        left join ppc_keywords_mapping mp using (campaign_keyword)\n      )\n      select is_brand as \"b/nb\" from pv where mp.\"brand/non-brand\" = 'brand'";
    expect(getParsedSql(sql)).to.be.equal("WITH \"pv\" AS (SELECT action_date, visitor_id_v, visit_country_name, referer_channel_group, email, sgid, \"mp\".\"brand/non-brand\" AS \"is_brand\" FROM \"dwh_fact_pageviews\" AS \"pv\" LEFT JOIN \"ppc_keywords_mapping\" AS \"mp\" USING (\"campaign_keyword\")) SELECT is_brand AS \"b/nb\" FROM \"pv\" WHERE \"mp\".\"brand/non-brand\" = 'brand'");
  });
});

/***/ }),

/***/ "./test/select.spec.js":
/*!*****************************!*\
  !*** ./test/select.spec.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var _require = __webpack_require__(/*! chai */ "chai"),
  expect = _require.expect;
var Parser = __webpack_require__(/*! ../src/parser */ "./src/parser.js")["default"];
describe('select', function () {
  var parser = new Parser();
  function getParsedSql(sql, opt) {
    var ast = parser.astify(sql, opt);
    return parser.sqlify(ast, opt);
  }
  it('should be null if empty', function () {
    var ast = parser.astify('SELECT a');
    expect(ast.options).to.be["null"];
    expect(ast.distinct).to.be["null"];
    expect(ast.from).to.be["null"];
    expect(ast.where).to.be["null"];
    expect(ast.groupby).to.be["null"];
    expect(ast.orderby).to.be["null"];
    expect(ast.limit).to.be["null"];
  });
  it('should support * with optional table prefix and other columns alias', function () {
    [{
      sql: 'SELECT *, \'a\' as col2 FROM table1',
      expected: 'SELECT *, \'a\' AS `col2` FROM `table1`'
    }, {
      sql: 'SELECT table1.*, \'a\' as col2 FROM table1',
      expected: 'SELECT `table1`.*, \'a\' AS `col2` FROM `table1`'
    }].forEach(function (_ref, index) {
      var sql = _ref.sql,
        expected = _ref.expected;
      var ast = parser.astify(sql);
      expect(ast.options).to.be["null"];
      expect(ast.distinct).to.be["null"];
      expect(ast.columns).to.be.eql([{
        "expr": {
          "type": "column_ref",
          "table": index === 0 ? null : "table1",
          "column": "*"
        },
        "as": null
      }, {
        "expr": {
          "type": "single_quote_string",
          "value": "a"
        },
        "as": "col2"
      }]);
      expect(ast.from).to.be.eql([{
        "db": null,
        "table": "table1",
        "as": null
      }]);
      expect(ast.where).to.be["null"];
      expect(ast.groupby).to.be["null"];
      expect(ast.orderby).to.be["null"];
      expect(ast.limit).to.be["null"];
      expect(parser.sqlify(ast)).to.be.eql(expected);
    });
  });
  it('should support for update', function () {
    var ast = parser.astify('select SOME_COLUMN from TABLE_NAME where ID_COLUMN = 0 for update');
    expect(parser.sqlify(ast)).to.eql('SELECT `SOME_COLUMN` FROM `TABLE_NAME` WHERE `ID_COLUMN` = 0 FOR UPDATE');
  });
  it('should support for update with wait', function () {
    var ast = parser.astify('select SOME_COLUMN from TABLE_NAME where ID_COLUMN = 0 for update wait 1234');
    expect(parser.sqlify(ast)).to.eql('SELECT `SOME_COLUMN` FROM `TABLE_NAME` WHERE `ID_COLUMN` = 0 FOR UPDATE WAIT 1234');
  });
  it('should support for update with nowait', function () {
    var ast = parser.astify('select SOME_COLUMN from TABLE_NAME where ID_COLUMN = 0 for update nowait');
    expect(parser.sqlify(ast)).to.eql('SELECT `SOME_COLUMN` FROM `TABLE_NAME` WHERE `ID_COLUMN` = 0 FOR UPDATE NOWAIT');
  });
  it('should support for update with skip locked', function () {
    var ast = parser.astify('select SOME_COLUMN from TABLE_NAME where ID_COLUMN = 0 for update skip locked');
    expect(parser.sqlify(ast)).to.eql('SELECT `SOME_COLUMN` FROM `TABLE_NAME` WHERE `ID_COLUMN` = 0 FOR UPDATE SKIP LOCKED');
  });
  it('should support lock in share mode', function () {
    var ast = parser.astify('select SOME_COLUMN from TABLE_NAME where ID_COLUMN = 0 lock in share mode');
    expect(parser.sqlify(ast)).to.eql('SELECT `SOME_COLUMN` FROM `TABLE_NAME` WHERE `ID_COLUMN` = 0 LOCK IN SHARE MODE');
  });
  it('should support lock in share mode with wait', function () {
    var ast = parser.astify('select SOME_COLUMN from TABLE_NAME where ID_COLUMN = 0 lock in share mode wait 1234');
    expect(parser.sqlify(ast)).to.eql('SELECT `SOME_COLUMN` FROM `TABLE_NAME` WHERE `ID_COLUMN` = 0 LOCK IN SHARE MODE WAIT 1234');
  });
  it('should support lock in share mode witn nowait', function () {
    var ast = parser.astify('select SOME_COLUMN from TABLE_NAME where ID_COLUMN = 0 lock in share mode nowait');
    expect(parser.sqlify(ast)).to.eql('SELECT `SOME_COLUMN` FROM `TABLE_NAME` WHERE `ID_COLUMN` = 0 LOCK IN SHARE MODE NOWAIT');
  });
  it('should support lock in share mode with skip locked', function () {
    var ast = parser.astify('select SOME_COLUMN from TABLE_NAME where ID_COLUMN = 0 lock in share mode skip locked');
    expect(parser.sqlify(ast)).to.eql('SELECT `SOME_COLUMN` FROM `TABLE_NAME` WHERE `ID_COLUMN` = 0 LOCK IN SHARE MODE SKIP LOCKED');
  });
  it('should support div as divsion', function () {
    expect(getParsedSql('SELECT * FROM businesses WHERE  SUBSTRING(street_physical, 1, LENGTH(street_physical) div 2) = SUBSTRING(street_physical, LENGTH(street_physical) DIV 2 + 1, LENGTH(street_physical) / 2);')).to.be.equal('SELECT * FROM `businesses` WHERE SUBSTRING(`street_physical`, 1, LENGTH(`street_physical`) DIV 2) = SUBSTRING(`street_physical`, LENGTH(`street_physical`) DIV 2 + 1, LENGTH(`street_physical`) / 2)');
  });
  it('should support select * from', function () {
    var ast = parser.astify('SELECT *from abc');
    expect(ast.options).to.be["null"];
    expect(ast.distinct).to.be["null"];
    expect(ast.columns).to.be.eql([{
      expr: {
        type: 'column_ref',
        table: null,
        column: '*'
      },
      as: null
    }]);
    expect(ast.from).to.be.eql([{
      "db": null,
      "table": "abc",
      "as": null
    }]);
    expect(ast.where).to.be["null"];
    expect(ast.groupby).to.be["null"];
    expect(ast.orderby).to.be["null"];
    expect(ast.limit).to.be["null"];
  });
  it('should support parse any column name', function () {
    var sql = 'select book_view.code from book_view where book_view.type= "A"';
    var ast = parser.astify(sql);
    var backSQL = parser.sqlify(ast);
    expect(backSQL).to.be.equal('SELECT `book_view`.`code` FROM `book_view` WHERE `book_view`.`type` = "A"');
  });
  it('should have appropriate types', function () {
    var ast = parser.astify('SELECT SQL_NO_CACHE DISTINCT a FROM b WHERE c = 0 GROUP BY d ORDER BY e limit 3');
    expect(ast.options).to.be.an('array');
    expect(ast.distinct).to.equal('DISTINCT');
    expect(ast.from).to.be.an('array');
    expect(ast.where).to.be.an('object');
    expect(ast.groupby).to.be.an('array');
    expect(ast.orderby).to.be.an('array');
    expect(ast.limit).to.be.an('object');
  });
  describe('column clause', function () {
    it('should parse "*" shorthand', function () {
      var ast = parser.astify('SELECT * FROM t');
      expect(ast.columns).to.be.eql([{
        expr: {
          type: 'column_ref',
          table: null,
          column: '*'
        },
        as: null
      }]);
    });
    it('should parse "table.*" column expressions', function () {
      var ast = parser.astify('SELECT t.* FROM t');
      expect(ast.columns).to.eql([{
        expr: {
          type: 'column_ref',
          table: 't',
          column: '*'
        },
        as: null
      }]);
    });
    it('should parse json column query expressions', function () {
      var ast = parser.astify("SELECT item.jsonCol->>'$.test.path' from 'items'");
      expect(parser.sqlify(ast)).to.be.equal("SELECT `item`.`jsonCol` ->> '$.test.path' FROM `items`");
    });
    it('should parse json column query expressions with collate', function () {
      var ast = parser.astify("SELECT item.jsonCol->>'$.test.path' collate utf8mb4_unicode_ci from 'items'");
      expect(parser.sqlify(ast)).to.be.equal("SELECT `item`.`jsonCol` ->> '$.test.path' COLLATE UTF8MB4_UNICODE_CI FROM `items`");
    });
    it('should parse aliases w/o "AS" keyword', function () {
      var ast = parser.astify('SELECT a aa FROM  t');
      expect(ast.columns).to.eql([{
        expr: {
          type: 'column_ref',
          table: null,
          column: 'a'
        },
        as: 'aa'
      }]);
    });
    it('should parse aliases w/ "AS" keyword', function () {
      var ast = parser.astify('SELECT b.c as bc FROM t');
      expect(ast.columns).to.eql([{
        expr: {
          type: 'column_ref',
          table: 'b',
          column: 'c'
        },
        as: 'bc'
      }]);
    });
    describe('logic operator', function () {
      it('should support column concatenation operator', function () {
        var _parser$parse = parser.parse('SELECT "a" || "," || b as ab, t.cd && "ef" FROM t'),
          tableList = _parser$parse.tableList,
          columnList = _parser$parse.columnList,
          ast = _parser$parse.ast;
        expect(tableList).to.eql(['select::null::t']);
        expect(columnList).to.eql(['select::null::b', 'select::t::cd']);
        expect(ast.columns).to.eql([{
          expr: {
            type: 'binary_expr',
            operator: '||',
            left: {
              type: 'binary_expr',
              operator: '||',
              left: {
                type: 'double_quote_string',
                value: 'a'
              },
              right: {
                type: 'double_quote_string',
                value: ','
              }
            },
            right: {
              type: 'column_ref',
              table: null,
              column: 'b'
            }
          },
          as: 'ab'
        }, {
          expr: {
            type: 'binary_expr',
            operator: '&&',
            left: {
              type: 'column_ref',
              table: 't',
              column: 'cd'
            },
            right: {
              type: 'double_quote_string',
              value: 'ef'
            }
          },
          "as": null
        }]);
        expect(ast.options).to.be["null"];
        expect(ast.distinct).to.be["null"];
        expect(ast.from).to.be.eql([{
          db: null,
          table: 't',
          as: null
        }]);
        expect(ast.where).to.be["null"];
        expect(ast.groupby).to.be["null"];
        expect(ast.orderby).to.be["null"];
        expect(ast.limit).to.be["null"];
      });
    });
    describe('functions', function () {
      it("should parse function dot name", function () {
        var ast = parser.astify("SELECT a.func() FROM t");
        expect(parser.sqlify(ast)).to.eql('SELECT a.func() FROM `t`');
      });
      it('should parse extract function in pg', function () {
        var opt = {
          database: 'postgresql'
        };
        var ast = parser.astify("SELECT EXTRACT(MICROSECONDS FROM TIME '17:12:28.5')", opt);
        expect(parser.sqlify(ast, opt)).to.eql("SELECT EXTRACT(MICROSECONDS FROM TIME '17:12:28.5')");
        expect(parser.sqlify(parser.astify("SELECT EXTRACT(MILLISECONDS FROM TIMESTAMP '2016-12-31 13:30:15')", opt), opt)).to.eql("SELECT EXTRACT(MILLISECONDS FROM TIMESTAMP '2016-12-31 13:30:15')");
        expect(parser.sqlify(parser.astify("SELECT EXTRACT(MILLISECONDS FROM '2016-12-31 13:30:15')", opt), opt)).to.eql("SELECT EXTRACT(MILLISECONDS FROM '2016-12-31 13:30:15')");
        expect(parser.sqlify(parser.astify("WITH tss AS\n        (SELECT CURRENT_TIMESTAMP AS ts)\n      SELECT\n        EXTRACT(EPOCH FROM ts)\n      FROM\n        tss", opt), opt)).to.eql('WITH "tss" AS (SELECT CURRENT_TIMESTAMP AS "ts") SELECT EXTRACT(EPOCH FROM ts) FROM "tss"');
      });
      it('should parse function expression', function () {
        var ast = parser.astify('SELECT fun(d) FROM t');
        expect(ast.columns).to.eql([{
          expr: {
            type: 'function',
            name: {
              name: [{
                type: 'default',
                value: 'fun'
              }]
            },
            over: null,
            args: {
              type: 'expr_list',
              value: [{
                type: 'column_ref',
                table: null,
                column: 'd'
              }]
            }
          },
          as: null
        }]);
      });
      it('should support select group_concat', function () {
        var sql = "select group_concat(distinct asd) as 'abc';";
        expect(getParsedSql(sql)).to.equal('SELECT GROUP_CONCAT(DISTINCT `asd`) AS `abc`');
        sql = "select group_concat(distinct(asd)) as 'abc';";
        expect(getParsedSql(sql)).to.equal('SELECT GROUP_CONCAT(DISTINCT (`asd`)) AS `abc`');
        sql = "select Quantity, group_concat(distinct(IF(Quantity>10, \"MORE\", \"LESS\"))) as 'abc';";
        expect(getParsedSql(sql)).to.equal('SELECT `Quantity`, GROUP_CONCAT(DISTINCT (IF(`Quantity` > 10, "MORE", "LESS"))) AS `abc`');
        sql = "select group_concat(distinct(organization.name) order by organization.name) as colum1";
        expect(getParsedSql(sql)).to.equal('SELECT GROUP_CONCAT(DISTINCT (`organization`.`name`) ORDER BY `organization`.`name` ASC) AS `colum1`');
      });
      it('should parse position function', function () {
        var ast = parser.astify("SELECT position(', ' in 'a, b')");
        expect(ast.columns).to.eql([{
          expr: {
            type: 'function',
            name: {
              name: [{
                type: 'default',
                value: 'position'
              }]
            },
            over: null,
            args: {
              type: 'expr_list',
              value: [{
                type: 'binary_expr',
                operator: 'IN',
                left: {
                  type: 'single_quote_string',
                  value: ', '
                },
                right: {
                  type: 'single_quote_string',
                  value: 'a, b'
                }
              }]
            }
          },
          as: null
        }]);
        expect(parser.sqlify(ast)).to.be.equal("SELECT position(', ' IN 'a, b')");
      });
      ['CURRENT_DATE', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'CURRENT_USER', 'SESSION_USER', 'USER', 'SYSTEM_USER'].forEach(function (func) {
        var columnAst = [{
          expr: {
            type: 'function',
            name: {
              name: [{
                type: 'default',
                value: func
              }]
            },
            over: null,
            args: {
              type: 'expr_list',
              value: []
            }
          },
          as: null
        }];
        it("should parse scalar function ".concat(func, "() with parentheses"), function () {
          var ast = parser.astify("SELECT ".concat(func, "() FROM t"));
          expect(ast.columns).to.eql(columnAst);
        });
      });
      it('should support function argument with and expr', function () {
        expect(getParsedSql('SELECT IF((`open_time` <= UNIX_TIMESTAMP()) AND (`close_time` > UNIX_TIMESTAMP()), 1, 0) FROM sometable')).to.be.equal('SELECT IF((`open_time` <= UNIX_TIMESTAMP()) AND (`close_time` > UNIX_TIMESTAMP()), 1, 0) FROM `sometable`');
      });
    });
    it('should parse multiple columns', function () {
      var ast = parser.astify('SELECT b.c as bc, 1+3 FROM t');
      expect(ast.columns).to.eql([{
        expr: {
          type: 'column_ref',
          table: 'b',
          column: 'c'
        },
        as: 'bc'
      }, {
        expr: {
          type: 'binary_expr',
          operator: '+',
          left: {
            type: 'number',
            value: 1
          },
          right: {
            type: 'number',
            value: 3
          }
        },
        as: null
      }]);
    });
  });
  describe('from clause', function () {
    it('should parse single table', function () {
      var ast = parser.astify('SELECT * FROM t');
      expect(ast.from).to.eql([{
        db: null,
        table: 't',
        as: null
      }]);
    });
    it('should parse tables from other databases', function () {
      var ast = parser.astify('SELECT * FROM u.t');
      expect(ast.from).to.eql([{
        db: 'u',
        table: 't',
        as: null
      }]);
    });
    it('should parse tables from other databases (ANSI identifier)', function () {
      var ast = parser.astify('SELECT * FROM "u"."t"');
      expect(ast.from).to.eql([{
        db: 'u',
        table: 't',
        as: null
      }]);
    });
    it('should support keyword as tablename', function () {
      var sql = 'select user0__.user_id as userId from user user0__';
      var ast = parser.astify(sql);
      var backSQL = parser.sqlify(ast);
      expect(backSQL).to.equal('SELECT `user0__`.`user_id` AS `userId` FROM `user` AS `user0__`');
    });
    it('should support select from db.xxx.table', function () {
      var sql = 'select id from db-name.public.table-name';
      var opt = {
        database: 'postgresql'
      };
      var ast = parser.astify(sql, opt);
      var backSQL = parser.sqlify(ast, opt);
      expect(backSQL).to.equal('SELECT id FROM "db-name"."public"."table-name"');
    });
    it('should parse subselect', function () {
      var ast = parser.astify('SELECT * FROM (SELECT id FROM t1) someAlias');
      expect(ast.from).to.eql([{
        expr: {
          tableList: ['select::null::t1'],
          columnList: ['select::null::(.*)', 'select::null::id'],
          ast: {
            "with": null,
            type: 'select',
            options: null,
            distinct: null,
            locking_read: null,
            from: [{
              db: null,
              table: 't1',
              as: null
            }],
            columns: [{
              expr: {
                type: 'column_ref',
                table: null,
                column: 'id'
              },
              as: null
            }],
            into: {
              position: null
            },
            where: null,
            groupby: null,
            having: null,
            orderby: null,
            limit: null,
            window: null
          },
          parentheses: true
        },
        as: 'someAlias'
      }]);
    });
    describe('joins', function () {
      it('should parse implicit joins', function () {
        var ast = parser.astify('SELECT * FROM t, a.b b, c.d as cd');
        expect(ast.from).to.eql([{
          db: null,
          table: 't',
          as: null
        }, {
          db: 'a',
          table: 'b',
          as: 'b'
        }, {
          db: 'c',
          table: 'd',
          as: 'cd'
        }]);
      });
      ['left', 'right', 'full'].forEach(function (join) {
        [' ', ' outer '].forEach(function (outer) {
          it("should parse ".concat(join).concat(outer, "joins"), function () {
            var ast = parser.astify("SELECT * FROM t ".concat(join, " ").concat(outer, " join d on d.d = d.a"));
            expect(ast.from).to.eql([{
              db: null,
              table: 't',
              as: null
            }, {
              db: null,
              table: 'd',
              as: null,
              join: "".concat(join.toUpperCase(), " JOIN"),
              on: {
                type: 'binary_expr',
                operator: '=',
                left: {
                  type: 'column_ref',
                  table: 'd',
                  column: 'd'
                },
                right: {
                  type: 'column_ref',
                  table: 'd',
                  column: 'a'
                }
              }
            }]);
          });
        });
      });
      it('should parse joined subselect', function () {
        var ast = parser.astify('SELECT * FROM t1 JOIN (SELECT id, col1 FROM t2) someAlias ON t1.id = someAlias.id');
        expect(ast.from).to.eql([{
          db: null,
          table: 't1',
          as: null
        }, {
          expr: {
            tableList: ["select::null::t2"],
            columnList: ["select::null::(.*)", "select::null::id", "select::null::col1"],
            ast: {
              "with": null,
              type: 'select',
              options: null,
              distinct: null,
              locking_read: null,
              from: [{
                db: null,
                table: 't2',
                as: null
              }],
              columns: [{
                expr: {
                  type: 'column_ref',
                  table: null,
                  'column': 'id'
                },
                as: null
              }, {
                expr: {
                  type: 'column_ref',
                  table: null,
                  'column': 'col1'
                },
                as: null
              }],
              into: {
                position: null
              },
              where: null,
              groupby: null,
              having: null,
              orderby: null,
              limit: null,
              window: null
            },
            parentheses: true
          },
          as: 'someAlias',
          join: 'INNER JOIN',
          on: {
            type: 'binary_expr',
            operator: '=',
            left: {
              type: 'column_ref',
              table: 't1',
              column: 'id'
            },
            right: {
              type: 'column_ref',
              table: 'someAlias',
              column: 'id'
            }
          }
        }]);
      });
      it('should parse joins with USING (single column)', function () {
        var ast = parser.astify('SELECT * FROM t1 JOIN t2 USING (id)');
        expect(ast.from).to.eql([{
          db: null,
          table: 't1',
          as: null
        }, {
          db: null,
          table: 't2',
          as: null,
          join: 'INNER JOIN',
          using: ['id']
        }]);
      });
      it('should parse joins with USING (multiple columns)', function () {
        var ast = parser.astify('SELECT * FROM t1 JOIN t2 USING (id1, id2)');
        expect(ast.from).to.eql([{
          db: null,
          table: 't1',
          as: null
        }, {
          db: null,
          table: 't2',
          as: null,
          join: 'INNER JOIN',
          using: ['id1', 'id2']
        }]);
      });
    });
    it('should parse DUAL table', function () {
      var ast = parser.astify('SELECT * FROM DUAL');
      expect(ast.from).to.eql([{
        type: 'dual'
      }]);
    });
    it('should parse function as table in pg', function () {
      var opt = {
        database: 'postgresql'
      };
      var sql = "select * from generate_series('2021-01-01'::date, '2021-12-31'::date, '1 day')";
      expect(getParsedSql(sql, opt)).to.be.equal("SELECT * FROM generate_series('2021-01-01'::DATE, '2021-12-31'::DATE, '1 day')");
    });
  });
  describe('where clause', function () {
    it('should parse single condition', function () {
      var ast = parser.astify('SELECT * FROM t where t.a > 0');
      expect(ast.where).to.eql({
        type: 'binary_expr',
        operator: '>',
        left: {
          type: 'column_ref',
          table: 't',
          column: 'a'
        },
        right: {
          type: 'number',
          value: 0
        }
      });
    });
    it('should parse like and or statement', function () {
      expect(getParsedSql("SELECT a, b, c FROM tb WHERE a like 'test1' OR b = 'test2';")).to.equal("SELECT `a`, `b`, `c` FROM `tb` WHERE `a` LIKE 'test1' OR `b` = 'test2'");
    });
    it('should parse or statement with parentheses', function () {
      expect(getParsedSql("select * from tableName where (a = 1 or b = 2) and c=3;")).to.equal("SELECT * FROM `tableName` WHERE (`a` = 1 OR `b` = 2) AND `c` = 3");
      expect(getParsedSql("select * from tableName where (a = 1) or b = 2 and c=3;")).to.equal("SELECT * FROM `tableName` WHERE (`a` = 1) OR `b` = 2 AND `c` = 3");
      expect(getParsedSql("select * from tableName where (name LIKE \"dummy\" and sku = \"dummy\") or b = 2 and c=3;")).to.equal('SELECT * FROM `tableName` WHERE (`name` LIKE "dummy" AND `sku` = "dummy") OR `b` = 2 AND `c` = 3');
      expect(getParsedSql("select * from tableName where (a = 1 and b = 2) or c=3;")).to.equal("SELECT * FROM `tableName` WHERE (`a` = 1 AND `b` = 2) OR `c` = 3");
      expect(getParsedSql("select * from tableName where a = 1 or (b = 2) and c=3;")).to.equal("SELECT * FROM `tableName` WHERE `a` = 1 OR (`b` = 2) AND `c` = 3");
      expect(getParsedSql("select * from tableName where a = 1 or (b = 2 and d=4) and c=3;")).to.equal("SELECT * FROM `tableName` WHERE `a` = 1 OR (`b` = 2 AND `d` = 4) AND `c` = 3");
      expect(getParsedSql("SELECT * FROM messages WHERE (year = 2012 AND month >= 9) OR (year = 2021 AND month <= 4) OR (year > 2012 AND year < 2021);")).to.equal("SELECT * FROM `messages` WHERE (`year` = 2012 AND `month` >= 9) OR (`year` = 2021 AND `month` <= 4) OR (`year` > 2012 AND `year` < 2021)");
      expect(getParsedSql("SELECT max('Y')\n      FROM \"TABLE_1\" as ST INNER JOIN\n      (SELECT * FROM \"TABLE_2\" AS JT_1\n        WHERE JT_1.dcc_user_y_n='N' and JT_1.wax_user_y_n='N'\n      )\n      ON ST.senderId=JT_1.customerId\n      WHERE (ST.is_pmt_official_y_n='Y' and ST.rcvr_id IN ('1903441177248177755','1253078913466070789','2028875792797419044','1363196721610324064') and ST.pmt_usd_amt>0 and (ST.pmt_txn_status_code='S' or (ST.pmt_txn_status_code='V' and ST.cum_pmt_cnt=1)) and ST.sndr_type_key=1) AND (ST.pmt_cre_dt>=JT_2.cust_signup_dt) GROUP BY JT_1.cust_id")).to.equal("SELECT MAX('Y') FROM `TABLE_1` AS `ST` INNER JOIN (SELECT * FROM `TABLE_2` AS `JT_1` WHERE `JT_1`.`dcc_user_y_n` = 'N' AND `JT_1`.`wax_user_y_n` = 'N') ON `ST`.`senderId` = `JT_1`.`customerId` WHERE (`ST`.`is_pmt_official_y_n` = 'Y' AND `ST`.`rcvr_id` IN ('1903441177248177755', '1253078913466070789', '2028875792797419044', '1363196721610324064') AND `ST`.`pmt_usd_amt` > 0 AND (`ST`.`pmt_txn_status_code` = 'S' OR (`ST`.`pmt_txn_status_code` = 'V' AND `ST`.`cum_pmt_cnt` = 1)) AND `ST`.`sndr_type_key` = 1) AND (`ST`.`pmt_cre_dt` >= `JT_2`.`cust_signup_dt`) GROUP BY `JT_1`.`cust_id`");
    });
    it('should parse parameters', function () {
      var ast = parser.astify('SELECT * FROM t where t.a > :my_param');
      expect(ast.where).to.eql({
        type: 'binary_expr',
        operator: '>',
        left: {
          type: 'column_ref',
          table: 't',
          column: 'a'
        },
        right: {
          type: 'param',
          value: 'my_param'
        }
      });
    });
    it('should parse multiple conditions', function () {
      var ast = parser.astify("SELECT * FROM t where t.c between 1 and 't' AND Not true");
      expect(ast.where).to.eql({
        type: 'binary_expr',
        operator: 'AND',
        left: {
          type: 'binary_expr',
          operator: 'BETWEEN',
          left: {
            type: 'column_ref',
            table: 't',
            column: 'c'
          },
          right: {
            type: 'expr_list',
            value: [{
              type: 'number',
              value: 1
            }, {
              type: 'single_quote_string',
              value: 't'
            }]
          }
        },
        right: {
          type: 'unary_expr',
          operator: 'NOT',
          expr: {
            type: 'bool',
            value: true
          }
        }
      });
    });
    it('should parse single condition with boolean', function () {
      var ast = parser.astify('SELECT * FROM t where t.a = TRUE');
      expect(ast.where).to.eql({
        type: 'binary_expr',
        operator: '=',
        left: {
          type: 'column_ref',
          table: 't',
          column: 'a'
        },
        right: {
          type: 'bool',
          value: true
        }
      });
    });
    it('should parse multiple condition with boolean', function () {
      expect(getParsedSql('SELECT id FROM t where deleted and not suspended')).to.be.equal('SELECT `id` FROM `t` WHERE `deleted` AND NOT `suspended`');
      expect(getParsedSql('SELECT id FROM t where not deleted and not suspended')).to.be.equal('SELECT `id` FROM `t` WHERE NOT `deleted` AND NOT `suspended`');
      expect(getParsedSql('SELECT id FROM t where deleted and suspended')).to.be.equal('SELECT `id` FROM `t` WHERE `deleted` AND `suspended`');
      expect(getParsedSql('SELECT id FROM t where true and id > 10')).to.be.equal('SELECT `id` FROM `t` WHERE TRUE AND `id` > 10');
    });
    ['is', 'is not'].forEach(function (operator) {
      it("should parse ".concat(operator, " condition"), function () {
        var ast = parser.astify("SELECT * FROM t WHERE col ".concat(operator, " NULL"));
        expect(ast.where).to.eql({
          type: 'binary_expr',
          operator: operator.toUpperCase(),
          left: {
            type: 'column_ref',
            table: null,
            column: 'col'
          },
          right: {
            type: 'null',
            value: null
          }
        });
      });
    });
    ['not exists'].forEach(function (operator) {
      it('should parse ' + operator.toUpperCase() + ' condition', function () {
        var ast = parser.astify("SELECT * FROM t WHERE ".concat(operator, " (SELECT 1)"));
        expect(ast.where).to.eql({
          type: 'unary_expr',
          operator: operator.toUpperCase(),
          expr: {
            tableList: [],
            columnList: ["select::null::(.*)"],
            ast: {
              "with": null,
              type: 'select',
              options: null,
              distinct: null,
              locking_read: null,
              columns: [{
                expr: {
                  type: 'number',
                  value: 1
                },
                as: null
              }],
              into: {
                position: null
              },
              from: null,
              where: null,
              groupby: null,
              having: null,
              orderby: null,
              limit: null,
              window: null
            },
            parentheses: true
          }
        });
      });
    });
    it('should parse exists condition', function () {
      var operator = 'EXISTS';
      var sql = "SELECT * FROM t WHERE ".concat(operator, " (SELECT 1)");
      expect(getParsedSql(sql)).to.be.equal('SELECT * FROM `t` WHERE EXISTS(SELECT 1)');
    });
    it("should parse + and - unary", function () {
      var _parser$parse2 = parser.parse('select -1, -a, +b, +abc.e from abc'),
        tableList = _parser$parse2.tableList,
        columnList = _parser$parse2.columnList,
        ast = _parser$parse2.ast;
      expect(tableList).to.eql(['select::null::abc']);
      expect(columnList).to.eql(['select::null::a', 'select::null::b', 'select::abc::e']);
      expect(ast.columns).to.eql([{
        expr: {
          type: 'number',
          value: -1
        },
        as: null
      }, {
        expr: {
          type: 'unary_expr',
          operator: '-',
          expr: {
            type: 'column_ref',
            table: null,
            column: 'a'
          }
        },
        as: null
      }, {
        expr: {
          type: 'unary_expr',
          operator: '+',
          expr: {
            type: 'column_ref',
            table: null,
            column: 'b'
          }
        },
        as: null
      }, {
        expr: {
          type: 'unary_expr',
          operator: '+',
          expr: {
            type: 'column_ref',
            table: 'abc',
            column: 'e'
          }
        },
        as: null
      }]);
      expect(ast.options).to.be["null"];
      expect(ast.distinct).to.be["null"];
      expect(ast.from).to.eql([{
        db: null,
        table: 'abc',
        as: null
      }]);
      expect(ast.where).to.be["null"];
      expect(ast.groupby).to.be["null"];
      expect(ast.orderby).to.be["null"];
      expect(ast.limit).to.be["null"];
    });
    it('should support left and convert fun', function () {
      expect(getParsedSql("select * from test where LEFT(column,2)=\"ts\";")).to.equal('SELECT * FROM `test` WHERE LEFT(`column`, 2) = "ts"');
      expect(getParsedSql("select * from test where CONVERT(column, DATE)=\"test\";")).to.equal('SELECT * FROM `test` WHERE CONVERT(`column`, DATE) = "test"');
      expect(getParsedSql("select * from test where CONVERT(column using utf8)=\"test\";")).to.equal('SELECT * FROM `test` WHERE CONVERT(`column` USING UTF8) = "test"');
      expect(getParsedSql("SELECT CONVERT('test', CHAR CHARACTER SET utf8mb4);")).to.equal("SELECT CONVERT('test', CHAR CHARACTER SET UTF8MB4)");
      expect(getParsedSql("SELECT CONVERT('test', CHAR(10) CHARACTER SET utf8mb4);")).to.equal("SELECT CONVERT('test', CHAR(10) CHARACTER SET UTF8MB4)");
      expect(getParsedSql("SELECT CONVERT('test' USING utf8mb4) COLLATE utf8mb4_bin;")).to.equal("SELECT CONVERT('test' USING UTF8MB4) COLLATE UTF8MB4_BIN");
      expect(getParsedSql("select TYPE,taxpayer_Type,CONVERT(tax_Amount, DECIMAL(12,2)) AS tax_amount,CAST(tax_currency AS DECIMAL(12,2))  tax_currency from rs_order_tax where billno=\"{{billno}}\" and Business_Type=\"order\";")).to.equal('SELECT `TYPE`, `taxpayer_Type`, CONVERT(`tax_Amount`, DECIMAL(12, 2)) AS `tax_amount`, CAST(`tax_currency` AS DECIMAL(12, 2)) AS `tax_currency` FROM `rs_order_tax` WHERE `billno` = "{{billno}}" AND `Business_Type` = "order"');
      expect(getParsedSql("SELECT CONVERT('test', INT(11) unsigned);")).to.equal("SELECT CONVERT('test', INT(11) UNSIGNED)");
    });
    it('should support if', function () {
      expect(getParsedSql("select a from test where b like IF(-1 = -1, 'a', 'b');")).to.equal("SELECT `a` FROM `test` WHERE `b` LIKE IF(-1 = -1, 'a', 'b')");
    });
  });
  describe('limit clause', function () {
    it('should be parsed w/o', function () {
      var ast = parser.astify('SELECT DISTINCT a FROM b WHERE c = 0 GROUP BY d ORDER BY e ASC limit 10');
      expect(ast.limit).eql({
        seperator: '',
        value: [{
          type: 'number',
          value: 10
        }]
      });
      expect(parser.sqlify(ast)).to.be.equal('SELECT DISTINCT `a` FROM `b` WHERE `c` = 0 GROUP BY `d` ORDER BY `e` ASC LIMIT 10');
    });
    it('should be parsed w/o', function () {
      var ast = parser.astify('SELECT DISTINCT a FROM b WHERE c = 0 GROUP BY d ORDER BY e limit 10,3');
      expect(ast.limit).eql({
        seperator: ',',
        value: [{
          type: 'number',
          value: 10
        }, {
          type: 'number',
          value: 3
        }]
      });
      expect(parser.sqlify(ast)).to.be.equal('SELECT DISTINCT `a` FROM `b` WHERE `c` = 0 GROUP BY `d` ORDER BY `e` ASC LIMIT 10, 3');
    });
    it('should be parsed w/ offset', function () {
      var ast = parser.astify('SELECT DISTINCT a FROM b WHERE c = 0 GROUP BY d ORDER BY e limit 10 offset 23');
      expect(ast.limit).eql({
        seperator: 'offset',
        value: [{
          type: 'number',
          value: 10
        }, {
          type: 'number',
          value: 23
        }]
      });
      expect(parser.sqlify(ast)).to.be.equal('SELECT DISTINCT `a` FROM `b` WHERE `c` = 0 GROUP BY `d` ORDER BY `e` ASC LIMIT 10 OFFSET 23');
    });
    it('should be parsed pg offset', function () {
      var opt = {
        database: 'postgresql'
      };
      var ast = parser.astify('SELECT DISTINCT a FROM b WHERE c = 0 GROUP BY d ORDER BY e limit all', opt);
      expect(ast.limit).to.be.eql({
        seperator: '',
        value: [{
          type: 'origin',
          value: 'all'
        }]
      });
      expect(parser.sqlify(ast)).to.be.equal('SELECT DISTINCT a FROM `b` WHERE c = 0 GROUP BY d ORDER BY e ASC LIMIT ALL');
      var offsetAst = parser.astify('SELECT DISTINCT a FROM b WHERE c = 0 GROUP BY d ORDER BY e limit all offset 100', opt);
      expect(offsetAst.limit).eql({
        seperator: 'offset',
        value: [{
          type: 'origin',
          value: 'all'
        }, {
          type: 'number',
          value: 100
        }]
      });
      expect(parser.sqlify(offsetAst)).to.be.equal('SELECT DISTINCT a FROM `b` WHERE c = 0 GROUP BY d ORDER BY e ASC LIMIT ALL OFFSET 100');
    });
  });
  describe('group by clause', function () {
    it('should parse single columns', function () {
      var ast = parser.astify('SELECT a FROM b WHERE c = 0 GROUP BY d');
      expect(ast.groupby).to.eql([{
        type: 'column_ref',
        table: null,
        column: 'd'
      }]);
    });
    it('should parse multiple columns', function () {
      var ast = parser.astify('SELECT a FROM b WHERE c = 0 GROUP BY d, t.b, t.c');
      expect(ast.groupby).to.eql([{
        type: 'column_ref',
        table: null,
        column: 'd'
      }, {
        type: 'column_ref',
        table: 't',
        column: 'b'
      }, {
        type: 'column_ref',
        table: 't',
        column: 'c'
      }]);
    });
    it('should parse column index', function () {
      var sql = 'SELECT name, gender FROM Test.student GROUP BY 1, 2';
      var ast = parser.astify(sql);
      var backSQL = parser.sqlify(ast);
      expect(backSQL).to.equal('SELECT `name`, `gender` FROM `Test`.`student` GROUP BY 1, 2');
    });
    it('should parser column expression', function () {
      var sql = 'SELECT name, gender, date_format(gmt_created,"yyyyMM"), count(*) FROM Test.student GROUP BY date_format(gmt_created,"yyyyMM")';
      var ast = parser.astify(sql);
      var backSQL = parser.sqlify(ast);
      expect(backSQL).to.equal('SELECT `name`, `gender`, date_format(`gmt_created`, "yyyyMM"), COUNT(*) FROM `Test`.`student` GROUP BY date_format(`gmt_created`, "yyyyMM")');
    });
  });
  describe('having clause', function () {
    it('should parse single conditions', function () {
      var ast = parser.astify('SELECT col1 FROM t GROUP BY col2 HAVING COUNT(*) > 1');
      expect(ast.having).to.eql({
        type: 'binary_expr',
        operator: '>',
        left: {
          type: 'aggr_func',
          name: 'COUNT',
          over: null,
          args: {
            expr: {
              type: 'star',
              value: '*'
            }
          }
        },
        right: {
          type: 'number',
          value: 1
        }
      });
    });
    it('should parse multiple conditions', function () {
      var ast = parser.astify('SELECT col1 FROM t GROUP BY col2 HAVING SUM(col2) > 10 OR 1 = 1');
      expect(ast.having).to.eql({
        type: 'binary_expr',
        operator: 'OR',
        left: {
          type: 'binary_expr',
          operator: '>',
          left: {
            type: 'aggr_func',
            name: 'SUM',
            over: null,
            args: {
              expr: {
                type: 'column_ref',
                table: null,
                column: 'col2'
              }
            }
          },
          right: {
            type: 'number',
            value: 10
          }
        },
        right: {
          type: 'binary_expr',
          operator: '=',
          left: {
            type: 'number',
            value: 1
          },
          right: {
            type: 'number',
            value: 1
          }
        }
      });
    });
    it('should parse subselects', function () {
      var sql = 'SELECT col1 FROM t GROUP BY col2 HAVING SUM(col2) > (SELECT 10)';
      expect(getParsedSql(sql)).to.be.equal('SELECT `col1` FROM `t` GROUP BY `col2` HAVING SUM(`col2`) > (SELECT 10)');
    });
  });
  describe('order by clause', function () {
    it('should parse single column', function () {
      var ast = parser.astify('SELECT a FROM b WHERE c = 0 order BY d');
      expect(ast.orderby).to.eql([{
        expr: {
          type: 'column_ref',
          table: null,
          column: 'd'
        },
        type: null
      }]);
    });
    it('should parse multiple columns', function () {
      var ast = parser.astify('SELECT a FROM b WHERE c = 0 order BY d, t.b desc, t.c asc');
      expect(ast.orderby).to.eql([{
        expr: {
          type: 'column_ref',
          table: null,
          column: 'd'
        },
        type: null
      }, {
        expr: {
          type: 'column_ref',
          table: 't',
          column: 'b'
        },
        type: 'DESC'
      }, {
        expr: {
          type: 'column_ref',
          table: 't',
          column: 'c'
        },
        type: 'ASC'
      }]);
    });
    it('should parse expressions', function () {
      var ast = parser.astify("SELECT a FROM b WHERE c = 0 order BY d, SuM(e)");
      expect(ast.orderby).to.eql([{
        expr: {
          type: 'column_ref',
          table: null,
          column: 'd'
        },
        type: null
      }, {
        expr: {
          type: 'aggr_func',
          name: 'SUM',
          over: null,
          args: {
            expr: {
              type: 'column_ref',
              table: null,
              column: 'e'
            }
          }
        },
        type: null
      }]);
    });
  });
  describe('MySQL SQL extensions', function () {
    it('should parse SQL_CALC_FOUND_ROWS', function () {
      var ast = parser.astify('SELECT SQL_CALC_FOUND_ROWS col FROM t');
      expect(ast.options).to.eql(['SQL_CALC_FOUND_ROWS']);
    });
    it('should parse SQL_CACHE/SQL_NO_CACHE', function () {
      var ast = parser.astify('SELECT SQL_CACHE col FROM t');
      expect(ast.options).to.eql(['SQL_CACHE']);
      var otherAst = parser.astify('SELECT SQL_NO_CACHE col FROM t');
      expect(otherAst.options).to.eql(['SQL_NO_CACHE']);
    });
    it('should parse SQL_SMALL_RESULT/SQL_BIG_RESULT', function () {
      var ast = parser.astify('SELECT SQL_SMALL_RESULT col FROM t');
      expect(ast.options).to.eql(['SQL_SMALL_RESULT']);
      var otherAst = parser.astify('SELECT SQL_BIG_RESULT col FROM t');
      expect(otherAst.options).to.eql(['SQL_BIG_RESULT']);
    });
    it('should parse SQL_BUFFER_RESULT', function () {
      var ast = parser.astify('SELECT SQL_BUFFER_RESULT col FROM t');
      expect(ast.options).to.contain('SQL_BUFFER_RESULT');
    });
    it('should parse multiple options per query', function () {
      var ast = parser.astify('SELECT SQL_CALC_FOUND_ROWS SQL_BIG_RESULT SQL_BUFFER_RESULT col FROM t');
      expect(ast.options).to.eql(['SQL_CALC_FOUND_ROWS', 'SQL_BIG_RESULT', 'SQL_BUFFER_RESULT']);
    });
  });
  describe('literals', function () {
    describe('strings', function () {
      it('should parse single quoted strings', function () {
        var ast = parser.astify("SELECT 'string'");
        expect(ast.columns).to.eql([{
          expr: {
            type: 'single_quote_string',
            value: 'string'
          },
          as: null
        }]);
      });
      it('should parse keywords in single quotes as string', function () {
        var ast = parser.astify("SELECT 'select'");
        expect(ast.columns).to.eql([{
          expr: {
            type: 'single_quote_string',
            value: 'select'
          },
          as: null
        }]);
      });
    });
    describe('datetime', function () {
      var literals = {
        time: '08:23:16',
        date: '1999-12-25',
        timestamp: '1999-12-25 08:23:16'
      };
      Object.keys(literals).forEach(function (type) {
        var value = literals[type];
        [type, type.toUpperCase()].forEach(function (t) {
          it(t, function () {
            var ast = parser.astify("SELECT ".concat(t, " '").concat(value, "'"));
            expect(ast.columns).to.eql([{
              expr: {
                type: type,
                value: value
              },
              as: null
            }]);
          });
        });
      });
    });
  });
  describe('row value constructor', function () {
    it('should parse simple values', function () {
      var ast = parser.astify("SELECT * FROM \"user\" WHERE (firstname, lastname) = ('John', 'Doe')");
      expect(ast.where).to.eql({
        type: 'binary_expr',
        operator: '=',
        left: {
          type: 'expr_list',
          value: [{
            column: 'firstname',
            table: null,
            type: 'column_ref'
          }, {
            column: 'lastname',
            table: null,
            type: 'column_ref'
          }],
          parentheses: true
        },
        right: {
          type: 'expr_list',
          value: [{
            type: 'single_quote_string',
            value: 'John'
          }, {
            type: 'single_quote_string',
            value: 'Doe'
          }],
          parentheses: true
        }
      });
    });
  });
  describe('common table expressions', function () {
    it('should parse single CTE', function () {
      var ast = parser.astify("WITH cte AS (SELECT 1)\n                SELECT * FROM cte");
      expect(ast).to.have.property('with').and.to.be.an('array').and.to.have.lengthOf(1);
      var cte = ast["with"][0];
      expect(cte.name).to.be.eql({
        type: 'default',
        value: 'cte'
      });
      expect(cte).to.have.property('stmt').and.to.be.an('object');
    });
    it('should support union in in_op', function () {
      var sql = "select 1 from pg_database a where a.oid in\n        (\n      select 1 from pg_database b where b.oid = 1\n      union\n      select 1 from pg_database c where c.oid=2\n      )";
      expect(getParsedSql(sql)).to.be.equal("SELECT 1 FROM `pg_database` AS `a` WHERE `a`.`oid` IN (SELECT 1 FROM `pg_database` AS `b` WHERE `b`.`oid` = 1 UNION SELECT 1 FROM `pg_database` AS `c` WHERE `c`.`oid` = 2)");
    });
    it('should parse multiple CTEs', function () {
      var ast = parser.astify("WITH cte1 AS (SELECT 1), cte2 AS (SELECT 2)\n                SELECT * FROM cte1 UNION SELECT * FROM cte2");
      expect(ast).to.have.property('with').and.to.have.lengthOf(2);
      var _ast$with = _slicedToArray(ast["with"], 2),
        cte1 = _ast$with[0],
        cte2 = _ast$with[1];
      expect(cte1.name).to.be.eql({
        type: 'default',
        value: 'cte1'
      });
      expect(cte2.name).to.be.eql({
        type: 'default',
        value: 'cte2'
      });
    });
    it('should parse CTE with column', function () {
      var ast = parser.astify("WITH cte (col1) AS (SELECT 1)\n                SELECT * FROM cte");
      var cte = ast["with"][0];
      expect(cte).to.have.property('columns').and.to.be.eql([{
        "column": "col1",
        "table": null,
        "type": "column_ref"
      }]);
    });
    it('should parse CTE with multiple columns', function () {
      var ast = parser.astify("WITH cte (col1, col2) AS (SELECT 1, 2)\n                SELECT * FROM cte");
      var cte = ast["with"][0];
      expect(cte.columns).to.be.eql([{
        "column": "col1",
        "table": null,
        "type": "column_ref"
      }, {
        "column": "col2",
        "table": null,
        "type": "column_ref"
      }]);
    });
    it('should parse recursive CTE', function () {
      var sql = "WITH RECURSIVE cte(n) AS\n            (\n              SELECT 1\n              UNION\n              SELECT n + 1 FROM cte WHERE n < 5\n            )\n            SELECT * FROM cte";
      var ast = parser.astify(sql);
      var cte = ast["with"][0];
      expect(cte).to.have.property('recursive', true);
    });
  });
  describe('multiple statements', function () {
    it('should parser multiple statements', function () {
      var sql = 'SELECT * FROM a;SELECT id from b';
      var ast = parser.astify(sql);
      var _sql$split = sql.split(';'),
        _sql$split2 = _slicedToArray(_sql$split, 2),
        sqla = _sql$split2[0],
        sqlb = _sql$split2[1];
      var astFirstSQL = parser.astify(sqla.trim());
      var astSecondSQL = parser.astify(sqlb.trim());
      expect(ast).to.have.lengthOf(2);
      expect(ast[0]).to.eql(astFirstSQL);
      expect(ast[1]).to.eql(astSecondSQL);
    });
  });
  describe('white list check', function () {
    describe('table mode', function () {
      it('should failed without whitelist', function () {
        var sql = 'SELECT * FROM a';
        var result = parser.whiteListCheck(sql);
        expect(result).to.be.eql(undefined);
        expect(parser.whiteListCheck(sql, [])).to.be.eql(undefined);
      });
      it('should pass the same check', function () {
        var sql = 'SELECT * FROM a';
        var whiteList = ['select::null::a'];
        var result = parser.whiteListCheck(sql, whiteList);
        expect(result).to.be.eql(undefined);
      });
      it('should pass the regex check', function () {
        var sql = 'SELECT * FROM a';
        var whiteList = ['select::(.*)::a'];
        var result = parser.whiteListCheck(sql, whiteList);
        expect(result).to.be.eql(undefined);
        expect(parser.whiteListCheck(sql, whiteList, {})).to.be.eql(undefined);
      });
      it('should pass the complex sql check', function () {
        var sql = 'SELECT * FROM a;SELECT * FROM x.b';
        var whiteList = ['select::(.*)::(a|b)'];
        var result = parser.whiteListCheck(sql, whiteList);
        expect(result).to.be.eql(undefined);
      });
      it('should pass the complex sql and regex check', function () {
        var sql = 'UPDATE a SET id = 1 WHERE name IN (SELECT name FROM b)';
        var whiteList = ['(select|update)::(.*)::(a|b)'];
        var result = parser.whiteListCheck(sql, whiteList);
        expect(result).to.be.eql(undefined);
      });
      it('should fail for simple check', function () {
        var sql = 'SELECT * FROM b';
        var whiteList = ['select::(.*)::a'];
        var fun = parser.whiteListCheck.bind(parser, sql, whiteList);
        expect(fun).to["throw"]("authority = 'select::null::b' is required in table whiteList to execute SQL = '".concat(sql, "'"));
      });
      it('should fail for as column reserved word check', function () {
        var sql = 'SELECT id as delete FROM b';
        var fun = parser.astify.bind(parser, sql);
        expect(fun).to["throw"]('Error: "delete" is a reserved word, can not as alias clause');
      });
      it('should fail for as table reserved word check', function () {
        var sql = 'SELECT id as bc FROM b as table';
        var fun = parser.astify.bind(parser, sql);
        expect(fun).to["throw"]('Error: "table" is a reserved word, can not as alias clause');
      });
      it('should fail the complex sql and regex check', function () {
        var sql = 'UPDATE a SET id = 1 WHERE name IN (SELECT name FROM b)';
        var whiteList = ['select::(.*)::(a|b)'];
        var fun = parser.whiteListCheck.bind(parser, sql, whiteList);
        expect(fun).to["throw"]("authority = 'update::null::a' is required in table whiteList to execute SQL = '".concat(sql, "'"));
      });
    });
    describe('column mode', function () {
      var mode = {
        type: 'column'
      };
      it('should pass the same check', function () {
        var sql = 'SELECT * FROM a';
        var whiteList = ['select::null::(.*)'];
        var result = parser.whiteListCheck(sql, whiteList, mode);
        expect(result).to.be.eql(undefined);
      });
      it('should pass the regex check', function () {
        var sql = 'SELECT * FROM a';
        var whiteList = ['select::(.*)::(.*)'];
        var result = parser.whiteListCheck(sql, whiteList, mode);
        expect(result).to.be.eql(undefined);
      });
      it('should pass the regex check with table prefix', function () {
        var sql = 'SELECT a.id, a.name FROM a';
        var whiteList = ['select::a::(id|name)'];
        var result = parser.whiteListCheck(sql, whiteList, mode);
        expect(result).to.be.eql(undefined);
      });
      it('should pass the complex sql check', function () {
        var sql = 'SELECT id FROM a;SELECT name FROM x.b';
        var whiteList = ['select::(.*)::(id|name)'];
        var result = parser.whiteListCheck(sql, whiteList, mode);
        expect(result).to.be.eql(undefined);
      });
      it('should pass the complex sql and regex check', function () {
        var sql = 'UPDATE a SET id = 1 WHERE name IN (SELECT name FROM b)';
        var whiteList = ['(select|update)::(.*)::(id|name)'];
        var result = parser.whiteListCheck(sql, whiteList, mode);
        expect(result).to.be.eql(undefined);
      });
      it('should fail for simple check', function () {
        var sql = 'SELECT b.id, b.name FROM b';
        var whiteList = ['select::b::id'];
        var fun = parser.whiteListCheck.bind(parser, sql, whiteList, mode);
        expect(fun).to["throw"]("authority = 'select::b::name' is required in ".concat(mode.type, " whiteList to execute SQL = '").concat(sql, "'"));
      });
      it('should fail the complex sql and regex check', function () {
        var sql = 'UPDATE a SET id = 1 WHERE name IN (SELECT name FROM b)';
        var whiteList = ['select::(.*)::(id|name)'];
        var fun = parser.whiteListCheck.bind(parser, sql, whiteList, mode);
        expect(fun).to["throw"]("authority = 'update::null::id' is required in ".concat(mode.type, " whiteList to execute SQL = '").concat(sql, "'"));
      });
      it('should support multiple table alias', function () {
        var sql = "SELECT\n        A.A_NAME,\n        B.B_NAME,\n        C.C_NAME\n        FROM\n        (SELECT M.A_ID,M.A_NAME,M.A_DESC FROM TABLE_A M) A\n        LEFT JOIN\n        (SELECT M.B_ID,M.B_NAME,M.B_DESC FROM TABLE_B M) B ON(A.A_ID=B.B_ID)\n        LEFT JOIN\n        (SELECT M.C_ID,M.C_NAME,M.C_DESC FROM TABLE_C M) C ON(A.A_ID=C.C_ID)";
        var _parser$parse3 = parser.parse(sql),
          tableList = _parser$parse3.tableList,
          columnList = _parser$parse3.columnList,
          ast = _parser$parse3.ast;
        expect(tableList).to.eql(["select::null::TABLE_A", "select::null::TABLE_B", "select::null::TABLE_C"]);
        expect(columnList).to.eql(["select::A::A_NAME", "select::B::B_NAME", "select::C::C_NAME", "select::TABLE_A::A_ID", "select::TABLE_A::A_NAME", "select::TABLE_A::A_DESC", "select::TABLE_B::B_ID", "select::TABLE_B::B_NAME", "select::TABLE_B::B_DESC", "select::A::A_ID", "select::B::B_ID", "select::TABLE_C::C_ID", "select::TABLE_C::C_NAME", "select::TABLE_C::C_DESC", "select::C::C_ID"]);
        expect(parser.sqlify(ast)).to.be.equal('SELECT `A`.`A_NAME`, `B`.`B_NAME`, `C`.`C_NAME` FROM (SELECT `M`.`A_ID`, `M`.`A_NAME`, `M`.`A_DESC` FROM `TABLE_A` AS `M`) AS `A` LEFT JOIN (SELECT `M`.`B_ID`, `M`.`B_NAME`, `M`.`B_DESC` FROM `TABLE_B` AS `M`) AS `B` ON (`A`.`A_ID` = `B`.`B_ID`) LEFT JOIN (SELECT `M`.`C_ID`, `M`.`C_NAME`, `M`.`C_DESC` FROM `TABLE_C` AS `M`) AS `C` ON (`A`.`A_ID` = `C`.`C_ID`)');
      });
    });
  });
  describe('select over', function () {
    it('should support select over', function () {
      var sql = 'SELECT id, name,gender, COUNT(gender) OVER (PARTITION BY gender) AS Total_students FROM student';
      var ast = parser.astify(sql);
      var backSQL = parser.sqlify(ast);
      expect(backSQL).to.equal("SELECT `id`, `name`, `gender`, COUNT(`gender`) OVER (PARTITION BY `gender`) AS `Total_students` FROM `student`");
    });
    it('should support select over function', function () {
      var sql = 'SELECT ROW_NUMBER() OVER (PARTITION BY gender) AS Total_students FROM student';
      var ast = parser.astify(sql);
      var backSQL = parser.sqlify(ast);
      expect(backSQL).to.equal("SELECT ROW_NUMBER() OVER (PARTITION BY `gender`) AS `Total_students` FROM `student`");
    });
    it('should support select over function with order by', function () {
      var sql = 'SELECT ROW_NUMBER() OVER (PARTITION BY gender order by gender asc) AS Total_students FROM student';
      var ast = parser.astify(sql);
      var backSQL = parser.sqlify(ast);
      expect(backSQL).to.equal("SELECT ROW_NUMBER() OVER (PARTITION BY `gender` ORDER BY `gender` ASC) AS `Total_students` FROM `student`");
    });
    it('should support select over function with order by multiple columns', function () {
      var sql = 'SELECT ROW_NUMBER() OVER (PARTITION BY gender, id order by gender asc, id desc) AS Total_students FROM student';
      var ast = parser.astify(sql);
      var backSQL = parser.sqlify(ast);
      expect(backSQL).to.equal("SELECT ROW_NUMBER() OVER (PARTITION BY `gender`, `id` ORDER BY `gender` ASC, `id` DESC) AS `Total_students` FROM `student`");
    });
  });
  describe('pg json column', function () {
    it('should support pg json column query', function () {
      var sql = "SELECT id,\n      config,\n      busy,\n      'templateId',\n      active,\n      domain,\n      config ->> 'email'\n      FROM instances WHERE config ->> 'email' = 'email@provider.com'\n      ";
      var ast = parser.astify(sql, {
        database: 'postgresql'
      });
      var backSQL = parser.sqlify(ast);
      expect(backSQL).to.equal("SELECT id, config, busy, 'templateId', active, domain, config ->> 'email' FROM `instances` WHERE config ->> 'email' = 'email@provider.com'");
    });
    it('should support pg json column query #>', function () {
      var sql = "SELECT id,\n      config,\n      busy,\n      'templateId',\n      active #> '{a,b}',\n      domain ->> 2,\n      config ->> 'email'\n      FROM instances WHERE config ->> 'email' = 'email@provider.com'\n      ";
      var ast = parser.astify(sql, {
        database: 'postgresql'
      });
      var backSQL = parser.sqlify(ast);
      expect(backSQL).to.equal("SELECT id, config, busy, 'templateId', active #> '{a,b}', domain ->> 2, config ->> 'email' FROM `instances` WHERE config ->> 'email' = 'email@provider.com'");
    });
    it('should support pg json column query #>>', function () {
      var sql = "SELECT id,\n      config,\n      busy,\n      'templateId',\n      active #>> '{a,b}',\n      domain ->> 2,\n      config ->> 'email'\n      FROM instances WHERE config ->> 'email' = 'email@provider.com'\n      ";
      var ast = parser.astify(sql, {
        database: 'postgresql'
      });
      var backSQL = parser.sqlify(ast);
      expect(backSQL).to.equal("SELECT id, config, busy, 'templateId', active #>> '{a,b}', domain ->> 2, config ->> 'email' FROM `instances` WHERE config ->> 'email' = 'email@provider.com'");
    });
    it('should support pg jsonb column query', function () {
      var sql = "SELECT id,\n      config,\n      busy,\n      'templateId',\n      active::jsonb @> '{\"b\":2}'::jsonb,\n      domain::jsonb <@ '{\"a\":1, \"b\":2}'::jsonb,\n      config::jsonb - 'a'\n      FROM instances WHERE config ->> 'email' = 'email@provider.com'\n      ";
      var ast = parser.astify(sql, {
        database: 'postgresql'
      });
      var backSQL = parser.sqlify(ast);
      expect(backSQL).to.equal("SELECT id, config, busy, 'templateId', active::JSONB @> '{\"b\":2}'::JSONB, domain::JSONB <@ '{\"a\":1, \"b\":2}'::JSONB, config::JSONB - 'a' FROM `instances` WHERE config ->> 'email' = 'email@provider.com'");
    });
    it('should support pg jsonb column query', function () {
      var sql = 'SELECT "t1"."uid", "t1"."username" FROM "t1"';
      expect(getParsedSql(sql, {
        database: 'postgresql'
      })).to.be.equal(sql);
    });
  });
  describe('postgresql', function () {
    var opt = {
      database: 'postgresql'
    };
    it('should properly escape column aliases that contain special characters', function () {
      var sql = "select column_name as \"Column Name\" from table_name";
      expect(getParsedSql(sql, opt)).to.equal('SELECT column_name AS "Column Name" FROM "table_name"');
    });
    it('should support union in in_op', function () {
      var sql = "select 1 from pg_database a where a.oid in\n        (\n      select 1 from pg_database b where b.oid = 1\n      union\n      select 1 from pg_database c where c.oid=2\n      )";
      expect(getParsedSql(sql, opt)).to.be.equal('SELECT 1 FROM "pg_database" AS "a" WHERE "a".oid IN (SELECT 1 FROM "pg_database" AS "b" WHERE "b".oid = 1 UNION SELECT 1 FROM "pg_database" AS "c" WHERE "c".oid = 2)');
    });
    it('should support union distinct in in_op', function () {
      var sql = "select 1 from pg_database a where a.oid in\n        (\n      select 1 from pg_database b where b.oid = 1\n      union distinct\n      select 1 from pg_database c where c.oid=2\n      )";
      expect(getParsedSql(sql, opt)).to.be.equal('SELECT 1 FROM "pg_database" AS "a" WHERE "a".oid IN (SELECT 1 FROM "pg_database" AS "b" WHERE "b".oid = 1 UNION DISTINCT SELECT 1 FROM "pg_database" AS "c" WHERE "c".oid = 2)');
    });
    it('should support array_agg', function () {
      var sql = "SELECT shipmentId, ARRAY_AGG(distinct abc order by name) AS shipmentStopIDs, ARRAY_AGG (first_name || ' ' || last_name) actors FROM table_name GROUP BY shipmentId";
      expect(getParsedSql(sql, opt)).to.equal('SELECT shipmentId, ARRAY_AGG(DISTINCT abc ORDER BY name ASC) AS "shipmentStopIDs", ARRAY_AGG(first_name || \' \' || last_name) AS "actors" FROM "table_name" GROUP BY shipmentId');
      sql = 'select pg_catalog.array_agg(c1 order by c2) from t1';
      expect(getParsedSql(sql, opt)).to.equal('SELECT pg_catalog.ARRAY_AGG(c1 ORDER BY c2 ASC) FROM "t1"');
    });
    it('should support array_agg in coalesce', function () {
      var sql = "SELECT COALESCE(array_agg(DISTINCT(a.xx)), Array[]::text[]) AS \"distinctName\" FROM public.\"Users\" a1";
      expect(getParsedSql(sql, opt)).to.equal('SELECT COALESCE(ARRAY_AGG(DISTINCT ("a".xx)), ARRAY[]::TEXT[]) AS "distinctName" FROM "public"."Users" AS "a1"');
    });
    it('should support ilike', function () {
      var sql = "select column_name as \"Column Name\" from table_name where a ilike 'f%' and 'b' not ilike 'B'";
      expect(getParsedSql(sql, opt)).to.equal('SELECT column_name AS "Column Name" FROM "table_name" WHERE a ILIKE \'f%\' AND \'b\' NOT ILIKE \'B\'');
    });
    it('should support like and', function () {
      var sql = "SELECT \"contact\".\"_id\" FROM \"contact\" WHERE LOWER(\"contact\".\"name.givenName\") LIKE 'yan%' AND LOWER(\"contact\".\"name.familyName\") LIKE 'ei%';";
      expect(getParsedSql(sql, opt)).to.equal("SELECT \"contact\".\"_id\" FROM \"contact\" WHERE LOWER(\"contact\".\"name.givenName\") LIKE 'yan%' AND LOWER(\"contact\".\"name.familyName\") LIKE 'ei%'");
    });
    it('should support left', function () {
      var sql = 'SELECT * FROM partitions WHERE "location"  IS null AND "code" <> left("name", length("code"))';
      expect(getParsedSql(sql, opt)).to.equal('SELECT * FROM "partitions" WHERE "location" IS NULL AND "code" <> left("name", length("code"))');
    });
  });
  describe('unknown type check', function () {
    it('should throw error', function () {
      var sql = 'SELECT * FROM a';
      var whiteList = ['select::null::(.*)'];
      expect(parser.whiteListCheck.bind(parser, sql, whiteList, {
        type: 'unknown'
      })).to["throw"]('unknown is not valid check mode');
    });
  });
  describe('prepared statements', function () {
    it('should parse mysql prepared statements', function () {
      expect(getParsedSql('SELECT bar, baz, foo FROM tablename WHERE bar = ?')).to.be.equal('SELECT `bar`, `baz`, `foo` FROM `tablename` WHERE `bar` = ?');
      expect(getParsedSql('SELECT bar, baz, foo FROM tablename WHERE bar = ? and baz = ?')).to.be.equal('SELECT `bar`, `baz`, `foo` FROM `tablename` WHERE `bar` = ? AND `baz` = ?');
      expect(getParsedSql("SELECT * FROM tabla WHERE id = ? AND name LIKE '%jos%' AND city_id = ?")).to.be.equal("SELECT * FROM `tabla` WHERE `id` = ? AND `name` LIKE '%jos%' AND `city_id` = ?");
    });
    it('should parse pg prepared statements', function () {
      var opt = {
        database: 'postgresql'
      };
      expect(getParsedSql('SELECT bar, baz, foo FROM tablename WHERE bar = $1', opt)).to.be.equal('SELECT bar, baz, foo FROM "tablename" WHERE bar = $1', opt);
      expect(getParsedSql('SELECT bar, baz, foo FROM tablename WHERE bar = $1 and baz = $2', opt)).to.be.equal('SELECT bar, baz, foo FROM "tablename" WHERE bar = $1 AND baz = $2', opt);
      expect(getParsedSql('SELECT bar, baz, foo FROM tablename WHERE bar = $1 and baz = $2 LIMIT $3', opt)).to.be.equal('SELECT bar, baz, foo FROM "tablename" WHERE bar = $1 AND baz = $2 LIMIT $3', opt);
      expect(getParsedSql('SELECT bar, baz, foo FROM tablename WHERE bar = $1 and baz = $2 LIMIT $3 OFFSET $4', opt)).to.be.equal('SELECT bar, baz, foo FROM "tablename" WHERE bar = $1 AND baz = $2 LIMIT $3 OFFSET $4', opt);
    });
  });
  it.skip('should throw error when no space before keyword', function () {
    expect(function () {
      return getParsedSql('SELECT * FROM a where id = 1and name="test"');
    }).to["throw"]('Expected "!=", "#", "%", "*", "+", "-", "--", ".", "/", "/*", ";", "<", "<=", "<>", "=", ">", ">=", "FOR", "GROUP", "HAVING", "LIMIT", "ORDER", "UNION", [ \\t\\n\\r], [0-9], [eE], or end of input but "a" found.');
    expect(function () {
      return getParsedSql('SELECT * FROM a where class = "ac"or name="test"');
    }).to["throw"]('Expected "!=", "#", "%", "*", "+", "-", "--", "/", "/*", ";", "<", "<=", "<>", "=", ">", ">=", "FOR", "GROUP", "HAVING", "LIMIT", "ORDER", "UNION", [ \\t\\n\\r], or end of input but "o" found.');
  });
  describe('FlinkSQL', function () {
    var opt = {
      database: 'flinksql'
    };
    it('should parse COLLECT aggr_func expression', function () {
      var sql = 'SELECT bar, COLLECT(DISTINCT foo) FROM tablename GROUP BY bar';
      expect(getParsedSql(sql, opt)).to.be.equal('SELECT `bar`, COLLECT(DISTINCT `foo`) FROM `tablename` GROUP BY `bar`', opt);
    });
    it('should parse LISTAGG aggr_func', function () {
      var sql = "SELECT bar, LISTAGG(foo, ',') AS fooNames FROM tablename GROUP BY bar";
      expect(getParsedSql(sql, opt)).to.be.equal('SELECT `bar`, LISTAGG(`foo`) AS `fooNames` FROM `tablename` GROUP BY `bar`', opt);
    });
    it('should parse CAST to STRING function', function () {
      var sql = 'SELECT userID, COLLECT(DISTINCT CAST(pickupLat AS STRING)) from tablename GROUP BY userID';
      expect(getParsedSql(sql, opt)).to.be.equal('SELECT `userID`, COLLECT(DISTINCT CAST(`pickupLat` AS STRING)) FROM `tablename` GROUP BY `userID`');
    });
    it('should parse string concatenation in functions', function () {
      var sql = "SELECT userID, COLLECT(DISTINCT CONCAT(CAST(pickupLat AS STRING), ',', CAST(pickupLon AS STRING))) AS pickupLocations FROM tablename GROUP BY userID";
      expect(getParsedSql(sql, opt)).to.be.equal('SELECT `userID`, COLLECT(DISTINCT CONCAT(CAST(`pickupLat` AS STRING), \',\', CAST(`pickupLon` AS STRING))) AS `pickupLocations` FROM `tablename` GROUP BY `userID`');
    });
    it('should parse window group functions', function () {
      var sql = "SELECT userID, HOP_START(eventtime, INTERVAL '1' HOUR, INTERVAL '1' DAY) AS hopStart FROM tablename GROUP BY HOP(eventtime, INTERVAL '1' HOUR, INTERVAL '1' DAY)";
      expect(getParsedSql(sql, opt)).to.be.equal('SELECT `userID`, HOP_START(`eventtime`, INTERVAL \'1\' HOUR, INTERVAL \'1\' DAY) AS `hopStart` FROM `tablename` GROUP BY HOP(`eventtime`, INTERVAL \'1\' HOUR, INTERVAL \'1\' DAY)');
    });
  });
});

/***/ }),

/***/ "./test/show.spec.js":
/*!***************************!*\
  !*** ./test/show.spec.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(/*! chai */ "chai"),
  expect = _require.expect;
var Parser = __webpack_require__(/*! ../src/parser */ "./src/parser.js")["default"];
describe('SHOW COMMAND', function () {
  var parser = new Parser();
  function getParsedSql(sql, opt) {
    var ast = parser.astify(sql, opt);
    return parser.sqlify(ast, opt);
  }
  it('should parse show logs', function () {
    ['BINARY', 'MASTER'].forEach(function (type) {
      var sql = "SHOW ".concat(type, " LOGS");
      expect(getParsedSql(sql)).to.be.equal(sql);
    });
  });
  it('should parse binlog events', function () {
    var prefix = 'SHOW BINLOG EVENTS';
    expect(getParsedSql(prefix)).to.be.equal(prefix);
    var sql = "".concat(prefix, " in 'abc'");
    expect(getParsedSql(sql)).to.be.equal("".concat(prefix, " IN 'abc'"));
    sql = "".concat(prefix, " in 'abc' from def");
    expect(getParsedSql(sql)).to.be.equal("".concat(prefix, " IN 'abc' FROM `def`"));
    sql = "".concat(prefix, " in 'abc' from def limit 0,10");
    expect(getParsedSql(sql)).to.be.equal("".concat(prefix, " IN 'abc' FROM `def` LIMIT 0, 10"));
    sql = "".concat(prefix, " from def limit 0,10");
    expect(getParsedSql(sql)).to.be.equal("".concat(prefix, " FROM `def` LIMIT 0, 10"));
  });
  ['CHARACTER SET', 'COLLATION'].forEach(function (type) {
    it("should parse show ".concat(type.toLowerCase()), function () {
      var prefix = "SHOW ".concat(type);
      expect(getParsedSql(prefix)).to.be.equal(prefix);
      var sql = "".concat(prefix, " like 'latin%'");
      expect(getParsedSql(sql)).to.be.equal("".concat(prefix, " LIKE 'latin%'"));
      sql = "".concat(prefix, " where Charset = 'latin1' ");
      expect(getParsedSql(sql)).to.be.equal("".concat(prefix, " WHERE `Charset` = 'latin1'"));
    });
  });
  it('show grants for user', function () {
    var prefix = 'SHOW GRANTS';
    expect(getParsedSql(prefix)).to.be.equal(prefix);
    var sql = "".concat(prefix, " for 'u1'@'localhost'");
    expect(getParsedSql(sql)).to.be.equal("".concat(prefix, " FOR 'u1'@'localhost'"));
    sql = "".concat(prefix, " for 'u1'@'localhost' using 'r1', 'r2'");
    expect(getParsedSql(sql)).to.be.equal("".concat(prefix, " FOR 'u1'@'localhost' USING 'r1', 'r2'"));
    sql = "".concat(prefix, " for u1 using 'r1'");
    expect(getParsedSql(sql)).to.be.equal("".concat(prefix, " FOR 'u1' USING 'r1'"));
  });
});

/***/ }),

/***/ "./test/snowflake.spec.js":
/*!********************************!*\
  !*** ./test/snowflake.spec.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(/*! chai */ "chai"),
  expect = _require.expect;
var Parser = __webpack_require__(/*! ../src/parser */ "./src/parser.js")["default"];
describe('snowflake', function () {
  var parser = new Parser();
  var opt = {
    database: 'snowflake'
  };
  function getParsedSql(sql, opt) {
    var ast = parser.astify(sql, opt);
    return parser.sqlify(ast, opt);
  }
  var SQL_LIST = [{
    title: 'select from lateral flatten',
    sql: ["SELECT d.value as data_by_row\n        FROM source,\n        LATERAL FLATTEN(INPUT => PARSE_JSON(jsontext), outer => true) d", 'SELECT "d"."value" AS "data_by_row" FROM "source", LATERAL FLATTEN(INPUT => PARSE_JSON("jsontext"), OUTER => TRUE) AS "d"']
  }, {
    title: 'select from lateral flatten with path',
    sql: ["SELECT * FROM TABLE(FLATTEN(input => parse_json('{\"a\":1, \"b\":[77,88]}'), path => 'b')) f;", "SELECT * FROM TABLE(FLATTEN(INPUT => parse_json('{\"a\":1, \"b\":[77,88]}'), PATH => 'b')) AS \"f\""]
  }, {
    title: 'select from lateral flatten with mode',
    sql: ["SELECT * FROM TABLE(FLATTEN(input => parse_json('{\"a\":1, \"b\":[77,88], \"c\": {\"d\":\"X\"}}'),\n        recursive => true, mode => 'object' )) f;", "SELECT * FROM TABLE(FLATTEN(INPUT => parse_json('{\"a\":1, \"b\":[77,88], \"c\": {\"d\":\"X\"}}'), RECURSIVE => TRUE, MODE => 'OBJECT')) AS \"f\""]
  }, {
    title: 'complex select stmt',
    sql: ["WITH source AS (\n\n          SELECT *\n          FROM foo\n          ORDER BY uploaded_at DESC\n          LIMIT 1\n\n      ), flattened AS (\n\n          SELECT d.value as data_by_row\n          FROM source,\n          LATERAL FLATTEN(INPUT => PARSE_JSON(jsontext), outer => true) d\n\n      ), renamed AS (\n\n          SELECT\n            data_by_row['country']::VARCHAR                       AS country,\n            data_by_row['gitlab']::VARCHAR                        AS gitlab_handle,\n            data_by_row['gitlabId']::VARCHAR                      AS gitlab_id,\n            data_by_row['isBackendMaintainer']::BOOLEAN           AS is_backend_maintainer,\n            data_by_row['isBackendTraineeMaintainer']::BOOLEAN    AS is_backend_trainee_maintainer,\n            data_by_row['isDatabaseMaintainer']::BOOLEAN          AS is_database_maintainer,\n            data_by_row['isDatabaseTraineeMaintainer']::BOOLEAN   AS is_database_trainee_maintainer,\n            data_by_row['isFrontendMaintainer']::BOOLEAN          AS is_frontend_maintainer,\n            data_by_row['isFrontendTraineeMaintainer']::BOOLEAN   AS is_frontend_trainee_maintainer,\n            data_by_row['isManager']::BOOLEAN                     AS is_manager,\n            data_by_row['level']::VARCHAR                         AS team_member_level,\n            data_by_row['locality']::VARCHAR                      AS locality,\n            data_by_row['location_factor']::DOUBLE PRECISION      AS location_factor,\n            data_by_row['matchName']::VARCHAR                     AS match_name,\n            data_by_row['name']::VARCHAR                          AS name,\n            data_by_row['section']::VARCHAR                       AS development_section,\n            data_by_row['start_date']::DATE                       AS start_date,\n            data_by_row['team']::VARCHAR                          AS team,\n            data_by_row['technology']::VARCHAR                    AS technology_group\n          FROM flattened\n\n        )\n        SELECT *\n        FROM renamed", "WITH \"source\" AS (SELECT * FROM \"foo\" ORDER BY \"uploaded_at\" DESC LIMIT 1), \"flattened\" AS (SELECT \"d\".\"value\" AS \"data_by_row\" FROM \"source\", LATERAL FLATTEN(INPUT => PARSE_JSON(\"jsontext\"), OUTER => TRUE) AS \"d\"), \"renamed\" AS (SELECT \"data_by_row\"['country']::VARCHAR AS \"country\", \"data_by_row\"['gitlab']::VARCHAR AS \"gitlab_handle\", \"data_by_row\"['gitlabId']::VARCHAR AS \"gitlab_id\", \"data_by_row\"['isBackendMaintainer']::BOOLEAN AS \"is_backend_maintainer\", \"data_by_row\"['isBackendTraineeMaintainer']::BOOLEAN AS \"is_backend_trainee_maintainer\", \"data_by_row\"['isDatabaseMaintainer']::BOOLEAN AS \"is_database_maintainer\", \"data_by_row\"['isDatabaseTraineeMaintainer']::BOOLEAN AS \"is_database_trainee_maintainer\", \"data_by_row\"['isFrontendMaintainer']::BOOLEAN AS \"is_frontend_maintainer\", \"data_by_row\"['isFrontendTraineeMaintainer']::BOOLEAN AS \"is_frontend_trainee_maintainer\", \"data_by_row\"['isManager']::BOOLEAN AS \"is_manager\", \"data_by_row\"['level']::VARCHAR AS \"team_member_level\", \"data_by_row\"['locality']::VARCHAR AS \"locality\", \"data_by_row\"['location_factor']::DOUBLE AS \"PRECISION\" AS \"location_factor\", \"data_by_row\"['matchName']::VARCHAR AS \"match_name\", \"data_by_row\"['name']::VARCHAR AS \"name\", \"data_by_row\"['section']::VARCHAR AS \"development_section\", \"data_by_row\"['start_date']::DATE AS \"start_date\", \"data_by_row\"['team']::VARCHAR AS \"team\", \"data_by_row\"['technology']::VARCHAR AS \"technology_group\" FROM \"flattened\") SELECT * FROM \"renamed\""]
  }, {
    title: 'alias to be identified',
    sql: ['select Age, "name" as "a\b" from schmeaName.tableName', 'SELECT "Age", "name" AS "a\b" FROM "schmeaName"."tableName"']
  }, {
    title: 'select from db.scheme.table',
    sql: ['SELECT * FROM my_db.my_schema.my_table', 'SELECT * FROM "my_db"."my_schema"."my_table"']
  }, {
    title: 'double slash comment',
    sql: ["// some comment\n        SELECT * FROM TABLEName", 'SELECT * FROM "TABLEName"']
  }, {
    title: 'cast to number data type',
    sql: ["SELECT listing_id,\n        listing_name,\n        room_type,\n        host_id,\n        REPLACE(price_str, '$') :: NUMBER(10, 2) AS price,\n        created_at,\n        updated_at\n        FROM src_listings", "SELECT \"listing_id\", \"listing_name\", \"room_type\", \"host_id\", REPLACE(\"price_str\", '$')::NUMBER(10, 2) AS \"price\", \"created_at\", \"updated_at\" FROM \"src_listings\""]
  }, {
    title: 'regexp operator',
    sql: ["SELECT v\n    FROM strings\n    WHERE v REGEXP 'San* [fF].*'\n\n    UNION ALL\n\n    SELECT v\n    FROM strings\n    WHERE v NOT REGEXP 'San\\w+?o'", 'SELECT "v" FROM "strings" WHERE "v" REGEXP \'San* [fF].*\' UNION ALL SELECT "v" FROM "strings" WHERE "v" NOT REGEXP \'San\\w+?o\'']
  }, {
    title: 'create table as',
    sql: ['CREATE TABLE EMP_SEL_COL as SELECT FNAME,DEPARTMENT,SALARY FROM EMPLOYEE.PUBLIC.EMP', 'CREATE TABLE "EMP_SEL_COL" AS SELECT "FNAME", "DEPARTMENT", "SALARY" FROM "EMPLOYEE"."PUBLIC"."EMP"']
  }, {
    title: 'query statement uses a colon in the column name',
    sql: ['SELECT src:salesperson:name FROM car_sales ORDER BY 1;', 'SELECT "src":"salesperson"."name" FROM "car_sales" ORDER BY 1 ASC']
  }, {
    title: 'colon and array indexgd',
    sql: ['SELECT src:customer[0].name, src:vehicle[0] FROM car_sales ORDER BY 1;', 'SELECT "src"."customer"[0].name, "src"."vehicle"[0] FROM "car_sales" ORDER BY 1 ASC']
  }];
  SQL_LIST.forEach(function (sqlInfo) {
    var title = sqlInfo.title,
      sql = sqlInfo.sql;
    it("should support ".concat(title), function () {
      expect(getParsedSql(sql[0], opt)).to.equal(sql[1]);
    });
  });
});

/***/ }),

/***/ "./test/sqlite.spec.js":
/*!*****************************!*\
  !*** ./test/sqlite.spec.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(/*! chai */ "chai"),
  expect = _require.expect;
var Parser = __webpack_require__(/*! ../src/parser */ "./src/parser.js")["default"];
describe('sqlite', function () {
  var parser = new Parser();
  var DEFAULT_OPT = {
    database: 'sqlite'
  };
  function getParsedSql(sql) {
    var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_OPT;
    var ast = parser.astify(sql, opt);
    return parser.sqlify(ast, opt);
  }
  it('should support analyze', function () {
    var sql = 'analyze schemaName.tableName';
    expect(getParsedSql(sql)).to.be.equal('ANALYZE `schemaName`.`tableName`');
  });
  it('should support attach', function () {
    var sql = "attach database 'c:\sqlite\db\contacts.db' as contacts;";
    expect(getParsedSql(sql)).to.be.equal("ATTACH DATABASE 'c:\sqlite\db\contacts.db' AS `contacts`");
  });
  it('should support json function in from clause', function () {
    var sql = "SELECT json_extract(value, '$.id') AS author_id\n    FROM\n        post,\n        json_each(post.author, '$')\n    GROUP BY\n        author_id;";
    expect(getParsedSql(sql)).to.be.equal("SELECT json_extract(`value`, '$.id') AS `author_id` FROM `post`, json_each(`post`.`author`, '$') GROUP BY `author_id`");
  });
  it('should support || in where clause', function () {
    var sql = "SELECT *\n    FROM\n        pets\n        LEFT JOIN(\n            SELECT * FROM user\n            WHERE user.name = \"pepe\" || \"rone\"\n        ) u ON pets.owner = u.id\n    GROUP BY pets.id;";
    expect(getParsedSql(sql)).to.be.equal('SELECT * FROM `pets` LEFT JOIN (SELECT * FROM `user` WHERE `user`.`name` = "pepe" || "rone") AS `u` ON `pets`.`owner` = `u`.`id` GROUP BY `pets`.`id`');
  });
  it('should support or combine with )', function () {
    var sql = "SELECT *\n    FROM\n        pets\n        LEFT JOIN(\n            SELECT * FROM user\n            WHERE user.code = UPPER(\"test\")\n            OR user.name = \"pepe\") u ON pets.owner = u.id\n    GROUP BY pets.id;";
    expect(getParsedSql(sql)).to.be.equal('SELECT * FROM `pets` LEFT JOIN (SELECT * FROM `user` WHERE `user`.`code` = UPPER("test") OR `user`.`name` = "pepe") AS `u` ON `pets`.`owner` = `u`.`id` GROUP BY `pets`.`id`');
    sql = "SELECT *\n    FROM\n        pets\n        LEFT JOIN(\n            SELECT * FROM user\n            WHERE user.name = \"pepe\" || \"rone\"\n            OR user.code = UPPER(\"test\")\n            OR user.code = UPPER(\"more_test\")\n        ) u ON pets.owner = u.id\n    GROUP BY pets.id;";
    expect(getParsedSql(sql)).to.be.equal('SELECT * FROM `pets` LEFT JOIN (SELECT * FROM `user` WHERE `user`.`name` = "pepe" || "rone" OR `user`.`code` = UPPER("test") OR `user`.`code` = UPPER("more_test")) AS `u` ON `pets`.`owner` = `u`.`id` GROUP BY `pets`.`id`');
  });
  it('should support json as function name', function () {
    var sql = "SELECT\n      id,\n      json_object(\n          'hasGeometry',\n          CASE\n              WHEN json_extract(floor.rect, '$') IS '{\"boundariesList\":[]}' THEN json('false')\n              ELSE json('true')\n          END\n      ) as \"metadata\"\n  FROM\n      floor\n  WHERE\n    floor.id = 1;";
    expect(getParsedSql(sql)).to.be.equal("SELECT `id`, json_object('hasGeometry', CASE WHEN json_extract(`floor`.`rect`, '$') IS '{\"boundariesList\":[]}' THEN json('false') ELSE json('true') END) AS `metadata` FROM `floor` WHERE `floor`.`id` = 1");
  });
  it('should support glob operator', function () {
    var sql = "SELECT device.id FROM device WHERE device.model GLOB '*XYZ';";
    expect(getParsedSql(sql)).to.be.equal("SELECT `device`.`id` FROM `device` WHERE `device`.`model` GLOB '*XYZ'");
  });
  it('should support create table...as', function () {
    var sql = "CREATE TABLE IF NOT EXISTS stg_devices AS SELECT * FROM devices WHERE 1 = 0;";
    expect(getParsedSql(sql)).to.be.equal('CREATE TABLE IF NOT EXISTS `stg_devices` AS SELECT * FROM `devices` WHERE 1 = 0');
  });
  it('should support escape single quote', function () {
    var sql = "SELECT name, 'doesn''t smoke' FROM people WHERE name = 'John';";
    expect(getParsedSql(sql)).to.be.equal("SELECT `name`, 'doesn''t smoke' FROM `people` WHERE `name` = 'John'");
  });
  it('should support create with autoincrement, boolean type and definition could be empty', function () {
    var sql = 'CREATE TABLE `foobar1` (`id` integer not null primary key autoincrement, `name` varchar(255), `batch` boolean, `migration_time` datetime)';
    expect(getParsedSql(sql)).to.be.equal('CREATE TABLE `foobar1` (`id` INTEGER NOT NULL AUTOINCREMENT PRIMARY KEY, `name` VARCHAR(255), `batch` BOOLEAN, `migration_time` DATETIME)');
    sql = 'CREATE TABLE sqlite_stat4(tbl,idx,neq,nlt,ndlt,sample)';
    expect(getParsedSql(sql)).to.be.equal('CREATE TABLE `sqlite_stat4` (`tbl`, `idx`, `neq`, `nlt`, `ndlt`, `sample`)');
  });
  it('should support with clause table name', function () {
    var sql = 'with `e` as (select * from employees) SELECT name,`e`.`hired_on` FROM `e`';
    expect(getParsedSql(sql)).to.be.equal('WITH `e` AS (SELECT * FROM `employees`) SELECT `name`, `e`.`hired_on` FROM `e`');
  });
  it('should support blob type', function () {
    var sql = "CREATE TABLE \"session_caches\" (\n      \"service_name\"\tTEXT NOT NULL,\n      \"session_data\"\tBLOB NOT NULL,\n      \"expires_at\"\tINTEGER,\n      PRIMARY KEY(\"service_name\",\"expires_at\")\n    )";
    expect(getParsedSql(sql)).to.be.equal('CREATE TABLE `session_caches` (`service_name` TEXT NOT NULL, `session_data` BLOB NOT NULL, `expires_at` INTEGER, PRIMARY KEY (`service_name`, `expires_at`))');
  });
  it('should support missing number after dot in number', function () {
    var sql = 'select count(*)*1. from abc';
    expect(getParsedSql(sql)).to.be.equal('SELECT COUNT(*) * 1 FROM `abc`');
  });
  it('should support create trigger', function () {
    var sql = "CREATE TRIGGER update_customer_address UPDATE OF address ON customers\n    BEGIN\n      UPDATE orders SET address = new.address WHERE customer_name = old.name;\n    END;";
    expect(getParsedSql(sql)).to.be.equal('CREATE TRIGGER `update_customer_address` UPDATE OF `address` ON `customers` BEGIN UPDATE `orders` SET `address` = `new`.`address` WHERE `customer_name` = `old`.`name` END');
  });
  it('should support union', function () {
    var sql = "SELECT * FROM a UNION SELECT * FROM b";
    expect(getParsedSql(sql)).to.be.equal('SELECT * FROM `a` UNION SELECT * FROM `b`');
    sql = "SELECT * FROM a UNION ALL SELECT * FROM b";
    expect(getParsedSql(sql)).to.be.equal('SELECT * FROM `a` UNION ALL SELECT * FROM `b`');
    sql = "SELECT * FROM a UNION DISTINCT SELECT * FROM b";
    expect(getParsedSql(sql)).to.be.equal('SELECT * FROM `a` UNION DISTINCT SELECT * FROM `b`');
  });
  it('should support keyword as column name in create table sql', function () {
    var sql = 'CREATE TABLE IF NOT EXISTS "Test" (Id INTEGER NOT NULL PRIMARY KEY UNIQUE, like TEXT NOT NULL, Difficulty TEXT, percent real, PRIMARY KEY(Id));';
    expect(getParsedSql(sql)).to.be.equal('CREATE TABLE IF NOT EXISTS `Test` (`Id` INTEGER NOT NULL PRIMARY KEY UNIQUE, `like` TEXT NOT NULL, `Difficulty` TEXT, `percent` REAL, PRIMARY KEY (`Id`))');
  });
  it('should support sqlify autoincrement to other db', function () {
    var sql = 'CREATE TABLE IF NOT EXISTS "SampleTable" ( "ID" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT UNIQUE, "Name" TEXT NOT NULL);';
    var ast = parser.astify(sql, DEFAULT_OPT);
    expect(parser.sqlify(ast, {
      database: 'mariadb'
    })).to.be.equal('CREATE TABLE IF NOT EXISTS `SampleTable` (`ID` INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY UNIQUE, `Name` TEXT NOT NULL)');
    sql = ' CREATE TABLE `Test` (  `id` int(11) NOT NULL,  `name` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL,  PRIMARY KEY (`id`),  UNIQUE KEY `name` (`name`));';
    ast = parser.astify(sql, {
      database: 'mariadb'
    });
    expect(parser.sqlify(ast, DEFAULT_OPT)).to.be.equal('CREATE TABLE `Test` (`id` INT(11) NOT NULL, `name` VARCHAR(255) NOT NULL, PRIMARY KEY (`id`), UNIQUE (`name`))');
  });
  it('should support create view', function () {
    var sql = 'create view v1 as select * from t1';
    expect(getParsedSql(sql)).to.be.equal('CREATE VIEW `v1` AS SELECT * FROM `t1`');
    sql = 'create temp view if not exists s.v1(a, b, c) as select * from t1';
    expect(getParsedSql(sql)).to.be.equal('CREATE TEMP VIEW IF NOT EXISTS `s`.`v1` (`a`, `b`, `c`) AS SELECT * FROM `t1`');
  });
});

/***/ }),

/***/ "./test/transactsql.spec.js":
/*!**********************************!*\
  !*** ./test/transactsql.spec.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(/*! chai */ "chai"),
  expect = _require.expect;
var _require2 = __webpack_require__(/*! ../src/tables */ "./src/tables.js"),
  tableHintToSQL = _require2.tableHintToSQL;
var Parser = __webpack_require__(/*! ../src/parser */ "./src/parser.js")["default"];
describe('transactsql', function () {
  var parser = new Parser();
  var tsqlOpt = {
    database: 'transactsql'
  };
  function getParsedSql(sql) {
    var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : tsqlOpt;
    var ast = parser.astify(sql, opt);
    return parser.sqlify(ast, opt);
  }
  it('should support select top n', function () {
    var sql = 'select top 3 * from tableA';
    expect(getParsedSql(sql)).to.equal('SELECT TOP 3 * FROM [tableA]');
    sql = "SELECT DISTINCT TOP 2 FirstName, LastName FROM Students WHERE GraduationYear = 2003 ORDER BY GradePointAverage DESC;";
    expect(getParsedSql(sql)).to.equal('SELECT DISTINCT TOP 2 [FirstName], [LastName] FROM [Students] WHERE [GraduationYear] = 2003 ORDER BY [GradePointAverage] DESC');
  });
  it('should support select top n percent', function () {
    var sql = 'select top 3 percent * from tableA';
    expect(getParsedSql(sql)).to.equal('SELECT TOP 3 PERCENT * FROM [tableA]');
    sql = 'SELECT TOP (10) PERCENT * FROM myTable';
    expect(getParsedSql(sql)).to.equal('SELECT TOP (10) PERCENT * FROM [myTable]');
    sql = 'SELECT TOP 10 * FROM myTable;';
    expect(getParsedSql(sql)).to.equal('SELECT TOP 10 * FROM [myTable]');
  });
  it('should support select count', function () {
    var sql = 'select count(*);';
    expect(getParsedSql(sql)).to.equal('SELECT COUNT(*)');
    sql = 'SELECT COUNT(DISTINCT foo);';
    expect(getParsedSql(sql)).to.equal('SELECT COUNT(DISTINCT [foo])');
    sql = 'SELECT COUNT(*) as foo;';
    expect(getParsedSql(sql)).to.equal('SELECT COUNT(*) AS [foo]');
  });
  it('should support comment before', function () {
    var sql = "-- +migrate Up\n    CREATE TABLE test (\n      id BIGINT NOT NULL PRIMARY KEY IDENTITY(1, 1)\n    );";
    expect(getParsedSql(sql)).to.equal('CREATE TABLE [test] ([id] BIGINT NOT NULL IDENTITY(1, 1) PRIMARY KEY)');
  });
  it('should support nested block comments', function () {
    var sql = "select col /* /* */ /* */ */ FROM tbl";
    expect(getParsedSql(sql)).to.equal('SELECT [col] FROM [tbl]');
  });
  it('should properly escape column aliases that contain special characters', function () {
    var sql = "select column_name as [Column Name] from table_name";
    expect(getParsedSql(sql)).to.equal('SELECT [column_name] AS [Column Name] FROM [table_name]');
  });
  it('should support exec stmt', function () {
    var sql = "EXEC msdb.dbo.sp_delete_database_backuphistory @database_name = N'Test'\n    GO";
    expect(getParsedSql(sql)).to.equal("EXEC [msdb].[dbo].[sp_delete_database_backuphistory] @database_name = N'Test' GO");
  });
  it('should support execute stmt without parameters', function () {
    var sql = "EXECUTE sys.sp_who";
    expect(getParsedSql(sql)).to.equal("EXECUTE [sys].[sp_who]");
  });
  it('should support over in aggregation function', function () {
    var sql = "select sum(order_rate) over(\n      order by quarter_time\n      rows between 4 preceding and 1 preceding -- window frame\n    ) as new_sum from t\n    ";
    expect(getParsedSql(sql)).to.equal("SELECT SUM([order_rate]) OVER (ORDER BY [quarter_time] ASC ROWS BETWEEN 4 PRECEDING AND 1 PRECEDING) AS [new_sum] FROM [t]");
    sql = 'SELECT syscolumns.name, ROW_NUMBER() OVER(PARTITION BY id ORDER BY colid) rowNo from sysColumns';
    expect(getParsedSql(sql)).to.equal("SELECT [syscolumns].[name], ROW_NUMBER() OVER (PARTITION BY [id] ORDER BY [colid] ASC) AS [rowNo] FROM [sysColumns]");
  });
  it('should support status as column or table name, left and right as function name', function () {
    var sql = 'select * from status where 1=1';
    expect(getParsedSql(sql)).to.equal("SELECT * FROM [status] WHERE 1 = 1");
    sql = 'select status from test where 1=1';
    expect(getParsedSql(sql)).to.equal("SELECT [status] FROM [test] WHERE 1 = 1");
    sql = "select LEFT('test',2) ,RIGHT('test', 2) from [test]";
    expect(getParsedSql(sql)).to.equal("SELECT LEFT('test', 2), RIGHT('test', 2) FROM [test]");
  });
  it('should support distinct without parentheses', function () {
    var sql = 'select count(DISTINCT ISNULL([email],-1)) from demo';
    expect(getParsedSql(sql)).to.equal("SELECT COUNT(DISTINCT ISNULL([email], -1)) FROM [demo]");
  });
  it('should support drop table if exists', function () {
    var sql = 'DROP TABLE IF EXISTS event_log';
    expect(getParsedSql(sql)).to.equal("DROP TABLE IF EXISTS [event_log]");
  });
  it('should support left join', function () {
    var sql = "select\n    trpriv_seq, trpriv_titulo, trpriv_id, trprivc_data\n    from termos_privacidade\n    left join termos_privacidade_versoes on (trprivv_trpriv_id = trpriv_id and trprivv_unidg_id is null and trprivv_inicio <= '2022-08-16T15:00:04.832Z' and (trprivv_fim >= '2022-08-16T15:00:04.832Z' or trprivv_fim is null))\n    left join termos_privacidade_consentimentos on (trprivc_trprivv_id = trprivv_id and trpriv_individual = 0 and trprivc_pes_id = 'null')\n    where 1 = 1 AND trprivv_id is not null   AND 1 = 2\n    order by 1,2";
    var ast = parser.astify(sql, tsqlOpt);
    expect(ast.from[1].join).to.equal('LEFT JOIN');
    expect(parser.sqlify(ast, tsqlOpt)).to.equal("SELECT [trpriv_seq], [trpriv_titulo], [trpriv_id], [trprivc_data] FROM [termos_privacidade] LEFT JOIN [termos_privacidade_versoes] ON ([trprivv_trpriv_id] = [trpriv_id] AND [trprivv_unidg_id] IS NULL AND [trprivv_inicio] <= '2022-08-16T15:00:04.832Z' AND ([trprivv_fim] >= '2022-08-16T15:00:04.832Z' OR [trprivv_fim] IS NULL)) LEFT JOIN [termos_privacidade_consentimentos] ON ([trprivc_trprivv_id] = [trprivv_id] AND [trpriv_individual] = 0 AND [trprivc_pes_id] = 'null') WHERE 1 = 1 AND [trprivv_id] IS NOT NULL AND 1 = 2 ORDER BY 1 ASC, 2 ASC");
  });
  it('should support inner join without inner', function () {
    var sql = "WITH t1 AS\n    (SELECT date_sold,\n            amount_sold AS cake_sold\n      FROM desserts\n      WHERE product = 'Cake' ),\n        t2 AS\n      (SELECT date_sold,\n              isnull(amount_sold, 0) AS pie_sold\n      FROM desserts\n      WHERE product = 'Pie' ),\n        t3 AS\n      (SELECT t1.date_sold,\n              t1.cake_sold,\n              t2.pie_sold\n      FROM t1\n      JOIN t2 ON t1.date_sold = t2.date_sold)\n    SELECT date_sold,\n          ABS(CAST(cake_sold AS BIGINT) - CAST(pie_sold AS BIGINT)) AS difference,\n          CASE\n              WHEN cake_sold > pie_sold THEN 'Cake'\n              ELSE 'Pie'\n          END AS sold_more\n    FROM t3";
    expect(getParsedSql(sql)).to.equal("WITH [t1] AS (SELECT [date_sold], [amount_sold] AS [cake_sold] FROM [desserts] WHERE [product] = 'Cake'), [t2] AS (SELECT [date_sold], isnull([amount_sold], 0) AS [pie_sold] FROM [desserts] WHERE [product] = 'Pie'), [t3] AS (SELECT [t1].[date_sold], [t1].[cake_sold], [t2].[pie_sold] FROM [t1] JOIN [t2] ON [t1].[date_sold] = [t2].[date_sold]) SELECT [date_sold], ABS(CAST([cake_sold] AS BIGINT) - CAST([pie_sold] AS BIGINT)) AS [difference], CASE WHEN [cake_sold] > [pie_sold] THEN 'Cake' ELSE 'Pie' END AS [sold_more] FROM [t3]");
  });
  it('should support table schema', function () {
    var sql = "INSERT INTO source.dbo.movie (genre_id, title, release_date)\n    VALUES (@param1, @param2, @param3), (@param1, @param2, @param3);";
    expect(getParsedSql(sql)).to.equal("INSERT INTO [source].[dbo].[movie] (genre_id, title, release_date) VALUES ([@param1],[@param2],[@param3]), ([@param1],[@param2],[@param3])");
    sql = "INSERT INTO server.db.owner.movie (genre_id, title, release_date)\n    VALUES (@param1, @param2, @param3), (@param1, @param2, @param3);";
    expect(getParsedSql(sql)).to.equal("INSERT INTO [server].[db].[owner].[movie] (genre_id, title, release_date) VALUES ([@param1],[@param2],[@param3]), ([@param1],[@param2],[@param3])");
  });
  it('should support full-qualified form in column', function () {
    var sql = 'SELECT dbo.movie.id FROM dbo.movie';
    expect(getParsedSql(sql)).to.equal('SELECT [dbo].[movie].[id] FROM [dbo].[movie]');
    sql = 'SELECT source.dbo.movie.id FROM source.dbo.movie';
    expect(getParsedSql(sql)).to.equal('SELECT [source].[dbo].[movie].[id] FROM [source].[dbo].[movie]');
    sql = 'SELECT * FROM source.dbo.movie WHERE source.dbo.movie.genre_id = 1';
    expect(getParsedSql(sql)).to.equal('SELECT * FROM [source].[dbo].[movie] WHERE [source].[dbo].[movie].[genre_id] = 1');
    sql = 'SELECT TOP 1000 [production].[categories].[category_name], COUNT([production].[products].[product_id]) AS [product_count]\n' + 'FROM [production].[products]\n' + 'INNER JOIN [production].[categories] ON [production].[products].[category_id] = [production].[categories].[category_id]\n' + 'GROUP BY [production].[categories].[category_name]';
    expect(getParsedSql(sql)).to.be.equal("SELECT TOP 1000 [production].[categories].[category_name], COUNT([production].[products].[product_id]) AS [product_count] FROM [production].[products] INNER JOIN [production].[categories] ON [production].[products].[category_id] = [production].[categories].[category_id] GROUP BY [production].[categories].[category_name]");
  });
  it('should support with clause', function () {
    var sql = "WITH mycte (a, b, c) AS\n    (SELECT DISTINCT z.a, z.b, z.c FROM mytable)\n  SELECT a from mycte";
    expect(getParsedSql(sql)).to.equal("WITH [mycte]([a], [b], [c]) AS (SELECT DISTINCT [z].[a], [z].[b], [z].[c] FROM [mytable]) SELECT [a] FROM [mycte]");
  });
  describe('table hint', function () {
    it('should support table hint', function () {
      var sql = "SELECT title FROM dbo.movie WITH (nolock) WHERE release_date >= '01/01/2021';";
      expect(getParsedSql(sql)).to.equal("SELECT [title] FROM [dbo].[movie] WITH (NOLOCK) WHERE [release_date] >= '01/01/2021'");
      sql = "select title FROM dbo.MyTable WITH (FORCESEEK (MyIndex (col1, col2, col3))) WHERE [release_date] >= '01/01/2021'";
      expect(getParsedSql(sql)).to.equal("SELECT [title] FROM [dbo].[MyTable] WITH (FORCESEEK ([MyIndex] ([col1], [col2], [col3]))) WHERE [release_date] >= '01/01/2021'");
      sql = "select title FROM dbo.MyTable WITH (NOEXPAND INDEX (MyIndex, MyIndex2)) WHERE [release_date] >= '01/01/2021'";
      expect(getParsedSql(sql)).to.equal("SELECT [title] FROM [dbo].[MyTable] WITH (NOEXPAND INDEX ([MyIndex], [MyIndex2])) WHERE [release_date] >= '01/01/2021'");
      sql = "select title FROM dbo.MyTable WITH (INDEX = MyIndex) WHERE [release_date] >= '01/01/2021'";
      expect(getParsedSql(sql)).to.equal("SELECT [title] FROM [dbo].[MyTable] WITH (INDEX = [MyIndex]) WHERE [release_date] >= '01/01/2021'");
      sql = "SELECT\n      '' AS InetSalePaymentBroker,\n       null AS InetSalePaymentDate,\n        '' AS SenderMersisNo,\n      '' AS SenderIsletmeMerkezi,\n      '' AS SenderTicaretSicilNo,\n  NULL AS isExport,\n      NULL AS IhracKayitKodu\n\n      FROM LG_001_01_INVOICE INV\n        LEFT OUTER JOIN LG_001_CLCARD AS CLIENT ON (CLIENT.LOGICALREF = INV.CLIENTREF)\n      LEFT OUTER JOIN LG_001_01_STFICHE AS STFICHE (nolock)  ON (INV.FICHENO = STFICHE.INVNO)\n        WHERE\n        INV.TRCODE IN (3,6,7,8,9, 13)\n        AND INV.DATE_ BETWEEN Convert(datetime,'',102) AND Convert(datetime,'',102)";
      expect(getParsedSql(sql)).to.equal("SELECT '' AS [InetSalePaymentBroker], NULL AS [InetSalePaymentDate], '' AS [SenderMersisNo], '' AS [SenderIsletmeMerkezi], '' AS [SenderTicaretSicilNo], NULL AS [isExport], NULL AS [IhracKayitKodu] FROM [LG_001_01_INVOICE] AS [INV] LEFT OUTER JOIN [LG_001_CLCARD] AS [CLIENT] ON ([CLIENT].[LOGICALREF] = [INV].[CLIENTREF]) LEFT OUTER JOIN [LG_001_01_STFICHE] AS [STFICHE] (NOLOCK) ON ([INV].[FICHENO] = [STFICHE].[INVNO]) WHERE [INV].[TRCODE] IN (3, 6, 7, 8, 9, 13) AND [INV].[DATE_] BETWEEN Convert([datetime], '', 102) AND Convert([datetime], '', 102)");
      sql = "select title FROM dbo.MyTable WITH (spatial_window_max_cells = 12) WHERE [release_date] >= '01/01/2021'";
      expect(getParsedSql(sql)).to.equal("SELECT [title] FROM [dbo].[MyTable] WITH (SPATIAL_WINDOW_MAX_CELLS = 12) WHERE [release_date] >= '01/01/2021'");
      expect(tableHintToSQL()).to.be.undefined;
    });
  });
  it('should support type as column name', function () {
    var sql = "ALTER TABLE test ADD\n    [type] varchar(255) NOT NULL DEFAULT ('default');";
    expect(getParsedSql(sql)).to.equal("ALTER TABLE [test] ADD [type] VARCHAR(255) NOT NULL DEFAULT ('default')");
    sql = "SELECT tipo, [120232] AS 'INTERNAL_FIELD'\n    FROM (\n         SELECT 'Realizado' AS tipo,  'DESIRED_VALUE' AS [120232]\n         FROM docs                -- <<  Replace docs with any table of yours\n         WHERE doc_id = '1'\n    ) AS result";
    expect(getParsedSql(sql)).to.equal("SELECT [tipo], [120232] AS [INTERNAL_FIELD] FROM (SELECT 'Realizado' AS [tipo], 'DESIRED_VALUE' AS [120232] FROM [docs] WHERE [doc_id] = '1') AS [result]");
  });
  it('should support create table', function () {
    var sql = "CREATE TABLE [test] (\n      [id] [bigint] IDENTITY(1,1) NOT NULL,\n      [session_id] [int] NOT NULL,\n    PRIMARY KEY CLUSTERED\n    (\n      [id] ASC\n    ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) on [PRIMARY]\n    ) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]";
    expect(getParsedSql(sql)).to.equal("CREATE TABLE [test] ([id] BIGINT NOT NULL IDENTITY(1, 1), [session_id] INT NOT NULL, PRIMARY KEY CLUSTERED ([id] ASC) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]");
  });
  it('should support alter table', function () {
    var sql = "ALTER TABLE [Class]\n    ADD CONSTRAINT [chk_quizId_or_QuizLink]\n    CHECK (\n        ([quizId] IS NOT NULL AND [QuizLink] IS NULL) OR\n        ([quizId] IS NULL AND [QuizLink] IS NOT NULL)\n    );";
    expect(getParsedSql(sql)).to.equal("ALTER TABLE [Class] ADD CONSTRAINT [chk_quizId_or_QuizLink] CHECK (([quizId] IS NOT NULL AND [QuizLink] IS NULL) OR ([quizId] IS NULL AND [QuizLink] IS NOT NULL))");
  });
  it('should support pviot and unpviot clause', function () {
    var sql = "SELECT VendorID, [250] AS Emp1, [251] AS Emp2, [256] AS Emp3, [257] AS Emp4, [260] AS Emp5\n    FROM\n    (SELECT PurchaseOrderID, EmployeeID, VendorID  FROM Purchasing.PurchaseOrderHeader) p\n    PIVOT  (  COUNT (PurchaseOrderID)  FOR EmployeeID IN  ( [250], [251], [256], [257], [260] )  ) AS pvt\n    ORDER BY pvt.VendorID ";
    expect(getParsedSql(sql)).to.be.equal('SELECT [VendorID], [250] AS [Emp1], [251] AS [Emp2], [256] AS [Emp3], [257] AS [Emp4], [260] AS [Emp5] FROM (SELECT [PurchaseOrderID], [EmployeeID], [VendorID] FROM [Purchasing].[PurchaseOrderHeader]) AS [p] PIVOT(COUNT([PurchaseOrderID]) FOR [EmployeeID] IN ([250], [251], [256], [257], [260])) AS [pvt] ORDER BY [pvt].[VendorID] ASC');
    sql = "SELECT VendorID, [250] AS Emp1, [251] AS Emp2, [256] AS Emp3, [257] AS Emp4, [260] AS Emp5\n    FROM\n    (SELECT PurchaseOrderID, EmployeeID, VendorID  FROM Purchasing.PurchaseOrderHeader) p\n    UNPIVOT  ( pvt.VendorID FOR EmployeeID IN  ( [250], [251], [256], [257], [260] )  ) AS pvt\n    ORDER BY pvt.VendorID ";
    expect(getParsedSql(sql)).to.be.equal('SELECT [VendorID], [250] AS [Emp1], [251] AS [Emp2], [256] AS [Emp3], [257] AS [Emp4], [260] AS [Emp5] FROM (SELECT [PurchaseOrderID], [EmployeeID], [VendorID] FROM [Purchasing].[PurchaseOrderHeader]) AS [p] UNPIVOT([pvt].[VendorID] FOR [EmployeeID] IN ([250], [251], [256], [257], [260])) AS [pvt] ORDER BY [pvt].[VendorID] ASC');
  });
  it('should support with clause before update stmt', function () {
    var sql = "WITH rank_update AS (\n      SELECT\n          [rank],\n          ROW_NUMBER() OVER (\n              PARTITION BY class_id\n              ORDER BY section_id, [rank] ASC, [segment_id], [id]\n          ) AS row_rank\n      FROM\n          [class_segment_class]\n      WHERE\n          [section_id] IS NOT NULL\n    )\n    UPDATE [rank_update]\n    SET [rank] = [row_rank];";
    expect(getParsedSql(sql)).to.be.equal('WITH [rank_update] AS (SELECT [rank], ROW_NUMBER() OVER (PARTITION BY [class_id] ORDER BY [section_id] ASC, [rank] ASC, [segment_id] ASC, [id] ASC) AS [row_rank] FROM [class_segment_class] WHERE [section_id] IS NOT NULL) UPDATE [rank_update] SET [rank] = [row_rank]');
  });
  it('should support alter view', function () {
    var sql = "ALTER VIEW [dbo].[reporting_class]\n    AS\n    SELECT\n      [ClassHexID],\n      [DepartmentID] AS class_source\n    FROM [Class]\n    WHERE [Class].[active] = 1";
    expect(getParsedSql(sql)).to.be.equal('ALTER VIEW [dbo].[reporting_class] AS SELECT [ClassHexID], [DepartmentID] AS [class_source] FROM [Class] WHERE [Class].[active] = 1');
    sql = 'ALTER VIEW [dbo].[reporting_class] (id, active) with ENCRYPTION, SCHEMABINDING AS SELECT [ClassHexID], [DepartmentID] AS class_source FROM [Class] WHERE [Class].[active] = 1 with check option';
    expect(getParsedSql(sql)).to.be.equal('ALTER VIEW [dbo].[reporting_class] ([id], [active]) WITH ENCRYPTION, SCHEMABINDING AS SELECT [ClassHexID], [DepartmentID] AS [class_source] FROM [Class] WHERE [Class].[active] = 1 WITH CHECK OPTION');
  });
  it('should support cast datatime2', function () {
    var sql = "INSERT [dbo].[testtable] ([NodeID], [Timestamp], [ResponseTime], [PercentLoss], [Availability], [Weight]) VALUES (2, CAST(N'2023-04-11T22:17:13.0864249' AS DateTime2), 0, 0, 100, 120)";
    expect(getParsedSql(sql)).to.be.equal("INSERT INTO [dbo].[testtable] (NodeID, Timestamp, ResponseTime, PercentLoss, Availability, Weight) VALUES (2,CAST(N'2023-04-11T22:17:13.0864249' AS DATETIME2),0,0,100,120)");
  });
  it('should support hex string', function () {
    var sql = 'INSERT INTO [dbo].[mytable]([value]) values( 0x11 );';
    expect(getParsedSql(sql)).to.be.equal('INSERT INTO [dbo].[mytable] (value) VALUES (0x11)');
  });
  it('should support for xml', function () {
    var base = "SELECT Cust.CustomerID,\n        OrderHeader.CustomerID,\n        OrderHeader.SalesOrderID,\n        OrderHeader.Status\n    FROM Sales.Customer Cust\n    INNER JOIN Sales.SalesOrderHeader OrderHeader\n    ON Cust.CustomerID = OrderHeader.CustomerID";
    var sql = [base, 'for xml auto'].join('\n');
    var sqlfiyBase = "SELECT [Cust].[CustomerID], [OrderHeader].[CustomerID], [OrderHeader].[SalesOrderID], [OrderHeader].[Status] FROM [Sales].[Customer] AS [Cust] INNER JOIN [Sales].[SalesOrderHeader] AS [OrderHeader] ON [Cust].[CustomerID] = [OrderHeader].[CustomerID]";
    expect(getParsedSql(sql)).to.be.equal("".concat(sqlfiyBase, " FOR XML AUTO"));
    sql = [base, 'for xml path'].join('\n');
    expect(getParsedSql(sql)).to.be.equal("".concat(sqlfiyBase, " FOR XML PATH"));
    sql = [base, 'for xml path(rowName)'].join('\n');
    expect(getParsedSql(sql)).to.be.equal("".concat(sqlfiyBase, " FOR XML PATH([rowName])"));
    sql = [base, 'for xml path(\'\')'].join('\n');
    expect(getParsedSql(sql)).to.be.equal("".concat(sqlfiyBase, " FOR XML PATH('')"));
  });
  it('should support cross and outer apply', function () {
    var applies = ['cross', 'outer'];
    for (var _i = 0, _applies = applies; _i < _applies.length; _i++) {
      var apply = _applies[_i];
      var sql = "SELECT SampleParentTable.SampleColumn, SUB.SampleColumn FROM SampleParentTable ".concat(apply, " APPLY (SELECT TOP 1 SampleColumn FROM SampleChildTable) SUB");
      expect(getParsedSql(sql)).to.be.equal("SELECT [SampleParentTable].[SampleColumn], [SUB].[SampleColumn] FROM [SampleParentTable] ".concat(apply.toUpperCase(), " APPLY (SELECT TOP 1 [SampleColumn] FROM [SampleChildTable]) AS [SUB]"));
    }
  });
  describe('if else', function () {
    it('should support if only statement', function () {
      var sql = "IF EXISTS(SELECT 1 from sys.views where name='MyView' and type='v')\n          DROP view MyView;\n        GO";
      expect(getParsedSql(sql)).to.be.equal("IF EXISTS(SELECT 1 FROM [sys].[views] WHERE [name] = 'MyView' AND [type] = 'v') DROP VIEW [MyView]; GO");
    });
    it('should support if else statement', function () {
      var sql = "IF DATENAME(weekday, GETDATE()) IN (N'Saturday', N'Sunday')\n                        SELECT 'Weekend';\n                  ELSE\n                        SELECT 'Weekday';";
      expect(getParsedSql(sql)).to.be.equal("IF DATENAME([weekday], GETDATE()) IN (N'Saturday', N'Sunday') SELECT 'Weekend'; ELSE SELECT 'Weekday';");
    });
  });
  describe('from values', function () {
    it('should support from values', function () {
      var sql = "select * from (values (0, 0), (1, null), (null, 2), (3, 4)) as t(a,b)";
      expect(getParsedSql(sql)).to.be.equal("SELECT * FROM (VALUES (0,0), (1,NULL), (NULL,2), (3,4)) AS [t(a, b)]");
    });
  });
});

/***/ }),

/***/ "./test/trino.spec.js":
/*!****************************!*\
  !*** ./test/trino.spec.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(/*! chai */ "chai"),
  expect = _require.expect;
var Parser = __webpack_require__(/*! ../src/parser */ "./src/parser.js")["default"];
describe('trino', function () {
  var parser = new Parser();
  var opt = {
    database: 'trino'
  };
  function getParsedSql(sql, opt) {
    var ast = parser.astify(sql, opt);
    return parser.sqlify(ast, opt);
  }
  var SQL_LIST = [{
    title: 'lambda expression',
    sql: ["SELECT numbers,\n        transform(numbers, n -> n * n) as squared_numbers\n        FROM (\n            VALUES\n                (ARRAY[1, 2]),\n                (ARRAY[3, 4]),\n                (ARRAY[5, 6, 7])\n        ) AS t(numbers);", 'SELECT numbers, transform(numbers, n -> n * n) AS "squared_numbers" FROM (VALUES (ARRAY[1,2]), (ARRAY[3,4]), (ARRAY[5,6,7])) AS "t(numbers)"']
  }, {
    title: 'lambda expression args',
    sql: ["SELECT reduce_agg(value, 0, (a, b) -> a + b, (a, b) -> a + b) sum_values\n        FROM (\n            VALUES (1), (2), (3), (4), (5)\n        ) AS t(value);", 'SELECT reduce_agg(value, 0, (a, b) -> a + b, (a, b) -> a + b) AS "sum_values" FROM (VALUES (1), (2), (3), (4), (5)) AS "t(value)"']
  }, {
    title: 'lambda expression in where clause',
    sql: ["SELECT numbers\n        FROM (\n            VALUES\n                (ARRAY[1,NULL,3]),\n                (ARRAY[10,20,30]),\n                (ARRAY[100,200,300])\n        ) AS t(numbers)\n        WHERE any_match(numbers, n ->  COALESCE(n, 0) > 100);", 'SELECT numbers FROM (VALUES (ARRAY[1,NULL,3]), (ARRAY[10,20,30]), (ARRAY[100,200,300])) AS "t(numbers)" WHERE any_match(numbers, n -> COALESCE(n, 0) > 100)']
  }, {
    title: 'lambda expression complex function',
    sql: ["SELECT xvalues,\n        \"a\",\n        b,\n        transform(xvalues, x -> IF(x > 0, a * x + b, a * (-x) + b)) as linear_function_values\n        FROM (\n            VALUES\n                (ARRAY[1, 2], 10, 5),\n                (ARRAY[3, 4], 4, 2)\n        ) AS t(xvalues, a, b);", 'SELECT xvalues, "a", b, transform(xvalues, x -> IF(x > 0, a * x + b, a * (-x) + b)) AS "linear_function_values" FROM (VALUES (ARRAY[1,2],10,5), (ARRAY[3,4],4,2)) AS "t(xvalues, a, b)"']
  }, {
    title: 'window function',
    sql: ['select sum(a) over (partition by b rows between unbounded preceding and current row)', 'SELECT SUM(a) OVER (PARTITION BY b ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)']
  }];
  SQL_LIST.forEach(function (sqlInfo) {
    var title = sqlInfo.title,
      sql = sqlInfo.sql;
    it("should support ".concat(title), function () {
      expect(getParsedSql(sql[0], opt)).to.equal(sql[1]);
    });
  });
  it('should throw error when lambda expression is invalid', function () {
    var sql = 'SELECT numbers, transform(numbers, n -> max(n)) as squared_numbers FROM (VALUES (ARRAY[1, 2]),(ARRAY[3, 4]),(ARRAY[5, 6, 7])) AS t(numbers);';
    expect(parser.astify.bind(parser, sql, opt)).to["throw"]('Aggregations are not supported in lambda expressions');
    sql = 'SELECT numbers, transform(numbers, n -> 2 + (select 3)) as squared_numbers FROM (VALUES (ARRAY[1, 2]),(ARRAY[3, 4]),(ARRAY[5, 6, 7])) AS t(numbers);';
    expect(parser.astify.bind(parser, sql, opt)).to["throw"]('Subqueries are not supported in lambda expressions');
  });
  it('should support deep nest function call', function () {
    this.timeout(100);
    var sql = "WITH\n    \"Quiz Attempts 8 1\" AS (\n      SELECT\n        \"attemptid\" AS \"AttemptId\",\n        \"quizid\" AS \"QuizId\",\n        \"userid\" AS \"UserId\",\n        \"orgunitid\" AS \"OrgUnitId\",\n        \"attemptnumber\" AS \"AttemptNumber\",\n        CAST(\"timestarted\" AS timestamp) AS \"TimeStarted\",\n        CAST(\"timecompleted\" AS timestamp) AS \"TimeCompleted\",\n        \"score\" AS \"Score\",\n        \"isgraded\" AS \"IsGraded\",\n        \"oldattemptnumber\" AS \"OldAttemptNumber\",\n        \"isdeleted\" AS \"IsDeleted\",\n        \"possiblescore\" AS \"PossibleScore\",\n        \"isretakeincorrectonly\" AS \"IsRetakeIncorrectOnly\",\n        CAST(\"duedate\" AS timestamp) AS \"DueDate\",\n        \"timelimit\" AS \"TimeLimit\",\n        \"timelimitenforced\" AS \"TimeLimitEnforced\",\n        \"graceperiod\" AS \"GracePeriod\",\n        \"graceperiodexceededbehaviour\" AS \"GracePeriodExceededBehaviour\",\n        \"extendeddeadline\" AS \"ExtendedDeadline\"\n      FROM\n        \"brightspace_data_sets_4c829df9_d432_4ae3_bf08_363f82e8793c\".\"quizattempts_8_13_2\"\n    ),\n    \"Filter by Quiz ID 2\" AS (\n      SELECT\n        *\n      FROM\n        \"Quiz Attempts 8 1\"\n      WHERE\n        \"QuizId\" = 319058\n    ),\n    \"Quiz User Answer Responses 8 3\" AS (\n      SELECT\n        \"attemptid\" AS \"AttemptId\",\n        \"attemptnumber\" AS \"AttemptNumber\",\n        \"questionid\" AS \"QuestionId\",\n        \"questionversionid\" AS \"QuestionVersionId\",\n        \"answerid\" AS \"AnswerId\",\n        \"sortorder\" AS \"SortOrder\",\n        \"iscorrect\" AS \"IsCorrect\",\n        \"userselection\" AS \"UserSelection\",\n        \"useranswer\" AS \"UserAnswer\",\n        \"filesetid\" AS \"FileSetId\"\n      FROM\n        \"brightspace_data_sets_4c829df9_d432_4ae3_bf08_363f82e8793c\".\"quizuseranswerresponses_8_13_2\"\n    ),\n    \"Select Columns 4\" AS (\n      SELECT\n        \"AttemptId\",\n        \"QuestionId\",\n        \"QuestionVersionId\",\n        \"UserSelection\",\n        \"UserAnswer\",\n        \"AnswerId\"\n      FROM\n        \"Quiz User Answer Responses 8 3\"\n    ),\n    \"Question Library 8 5\" AS (\n      SELECT\n        \"questionid\" AS \"QuestionId\",\n        \"questionversionid\" AS \"QuestionVersionId\",\n        \"isautograded\" AS \"IsAutoGraded\",\n        \"templatetypeid\" AS \"TemplateTypeId\",\n        \"questiontype\" AS \"QuestionType\",\n        \"name\" AS \"Name\",\n        \"question\" AS \"Question\",\n        \"comment\" AS \"Comment\",\n        \"answerkey\" AS \"AnswerKey\",\n        CAST(\"creationdate\" AS timestamp) AS \"CreationDate\",\n        \"version\" AS \"Version\",\n        \"allowsattachments\" AS \"AllowsAttachments\"\n      FROM\n        \"brightspace_data_sets_4c829df9_d432_4ae3_bf08_363f82e8793c\".\"questionlibrary_8_13_2\"\n    ),\n    \"Joining Question Library 6\" AS (\n      SELECT\n        \"T1\".\"AttemptId\",\n        \"T1\".\"QuestionId\",\n        \"T1\".\"QuestionVersionId\",\n        \"T1\".\"AnswerId\",\n        \"T1\".\"UserSelection\",\n        \"T1\".\"UserAnswer\",\n        \"T2\".\"QuestionId\",\n        \"T2\".\"QuestionVersionId\" AS \"Question Library 8.QuestionVersionId\",\n        \"T2\".\"IsAutoGraded\",\n        \"T2\".\"TemplateTypeId\",\n        \"T2\".\"QuestionType\",\n        \"T2\".\"Name\",\n        \"T2\".\"Question\",\n        \"T2\".\"Comment\",\n        \"T2\".\"AnswerKey\",\n        \"T2\".\"CreationDate\",\n        \"T2\".\"Version\",\n        \"T2\".\"AllowsAttachments\"\n      FROM\n        \"Select Columns 4\" AS \"T1\"\n        INNER JOIN \"Question Library 8 5\" AS \"T2\" ON \"T1\".\"QuestionId\" = \"T2\".\"QuestionId\"\n    ),\n    \"Join Data 7\" AS (\n      SELECT\n        \"T1\".\"AttemptId\",\n        \"T1\".\"QuestionId\",\n        \"T1\".\"QuestionVersionId\",\n        \"T1\".\"AnswerId\",\n        \"T1\".\"UserSelection\",\n        \"T1\".\"UserAnswer\",\n        \"T1\".\"QuestionId\",\n        \"T1\".\"IsAutoGraded\",\n        \"T1\".\"TemplateTypeId\",\n        \"T1\".\"QuestionType\",\n        \"T1\".\"Name\",\n        \"T1\".\"Question\",\n        \"T1\".\"Comment\",\n        \"T1\".\"AnswerKey\",\n        \"T1\".\"CreationDate\",\n        \"T1\".\"Version\",\n        \"T1\".\"AllowsAttachments\",\n        \"T1\".\"Question Library 8.QuestionVersionId\",\n        \"T2\".\"AttemptId\" AS \"AttemptId_1\",\n        \"T2\".\"QuizId\",\n        \"T2\".\"UserId\",\n        \"T2\".\"OrgUnitId\",\n        \"T2\".\"AttemptNumber\" AS \"AttemptNumber_1\",\n        \"T2\".\"TimeStarted\",\n        \"T2\".\"TimeCompleted\",\n        \"T2\".\"Score\",\n        \"T2\".\"IsGraded\",\n        \"T2\".\"OldAttemptNumber\",\n        \"T2\".\"IsDeleted\",\n        \"T2\".\"PossibleScore\",\n        \"T2\".\"IsRetakeIncorrectOnly\",\n        \"T2\".\"DueDate\",\n        \"T2\".\"TimeLimit\",\n        \"T2\".\"TimeLimitEnforced\",\n        \"T2\".\"GracePeriod\",\n        \"T2\".\"GracePeriodExceededBehaviour\",\n        \"T2\".\"ExtendedDeadline\"\n      FROM\n        \"Joining Question Library 6\" AS \"T1\"\n        INNER JOIN \"Filter by Quiz ID 2\" AS \"T2\" ON \"T1\".\"AttemptId\" = \"T2\".\"AttemptId\"\n    ),\n    \"Replace Text 1 8\" AS (\n      SELECT\n        \"AttemptId\",\n        \"QuestionId\",\n        \"QuestionVersionId\",\n        \"AnswerId\",\n        \"UserSelection\",\n        \"QuestionId\",\n        \"IsAutoGraded\",\n        \"TemplateTypeId\",\n        \"QuestionType\",\n        \"Name\",\n        \"Question\",\n        \"Comment\",\n        \"AnswerKey\",\n        \"CreationDate\",\n        \"Version\",\n        \"AllowsAttachments\",\n        \"Question Library 8.QuestionVersionId\",\n        \"QuizId\",\n        \"UserId\",\n        \"OrgUnitId\",\n        \"TimeStarted\",\n        \"TimeCompleted\",\n        \"Score\",\n        \"IsGraded\",\n        \"OldAttemptNumber\",\n        \"IsDeleted\",\n        \"PossibleScore\",\n        \"IsRetakeIncorrectOnly\",\n        \"DueDate\",\n        \"TimeLimit\",\n        \"TimeLimitEnforced\",\n        \"GracePeriod\",\n        \"GracePeriodExceededBehaviour\",\n        \"ExtendedDeadline\",\n        \"AttemptNumber_1\",\n        regexp_replace(\n          regexp_replace(\n            regexp_replace(\n              regexp_replace(\n                regexp_replace(\n                  regexp_replace(\n                    regexp_replace(\n                      regexp_replace(\n                        regexp_replace(\n                          regexp_replace(\n                            regexp_replace(\n                              regexp_replace(\n                                regexp_replace(\n                                  regexp_replace(\n                                    regexp_replace(\n                                      regexp_replace(\n                                        regexp_replace(\n                                          regexp_replace(\n                                            regexp_replace(\n                                              regexp_replace(\n                                                regexp_replace(\n                                                  regexp_replace(\n                                                    regexp_replace(\n                                                      regexp_replace(\n                                                        regexp_replace(\n                                                          regexp_replace(\n                                                            regexp_replace(\n                                                              regexp_replace(\n                                                                regexp_replace(\n                                                                  regexp_replace(\n                                                                    regexp_replace(\n                                                                      regexp_replace(\n                                                                        regexp_replace(\n                                                                          regexp_replace(\n                                                                            regexp_replace(\n                                                                              regexp_replace(\n                                                                                regexp_replace(\n                                                                                  regexp_replace(\n                                                                                    regexp_replace(\n                                                                                      regexp_replace(\n                                                                                        regexp_replace(\n                                                                                          regexp_replace(\n                                                                                            regexp_replace(\"UserAnswer\", '(?i)&hellip;', '...'),\n                                                                                            '(?i)&#x',\n                                                                                            'x'\n                                                                                          ),\n                                                                                          '(?i)ldquo',\n                                                                                          '\"'\n                                                                                        ),\n                                                                                        '(?i)rdquo',\n                                                                                        '\"'\n                                                                                      ),\n                                                                                      '(?i)&nbsp',\n                                                                                      ''\n                                                                                    ),\n                                                                                    '(?i)<p>',\n                                                                                    ''\n                                                                                  ),\n                                                                                  '(?i)</p>',\n                                                                                  ''\n                                                                                ),\n                                                                                '(?i)<strong>',\n                                                                                ''\n                                                                              ),\n                                                                              '(?i)</strong>',\n                                                                              ''\n                                                                            ),\n                                                                            '(?i)<div>',\n                                                                            ''\n                                                                          ),\n                                                                          '(?i)</div>',\n                                                                          ''\n                                                                        ),\n                                                                        '(?i)<ul>',\n                                                                        ''\n                                                                      ),\n                                                                      '(?i)</ul>',\n                                                                      ''\n                                                                    ),\n                                                                    '(?i)<u>',\n                                                                    ''\n                                                                  ),\n                                                                  '(?i)</u>',\n                                                                  ''\n                                                                ),\n                                                                '(?i)<br/>',\n                                                                ''\n                                                              ),\n                                                              '(?i)<li>',\n                                                              ''\n                                                            ),\n                                                            '(?i)</li>',\n                                                            ''\n                                                          ),\n                                                          '(?i)<em>',\n                                                          ''\n                                                        ),\n                                                        '(?i)</em>',\n                                                        ''\n                                                      ),\n                                                      '(?i)<span>',\n                                                      ''\n                                                    ),\n                                                    '(?i)</span>',\n                                                    ''\n                                                  ),\n                                                  '(?i)<span style=\"font-family: arial, helvetica, sans-serif;\">',\n                                                  ''\n                                                ),\n                                                '(?i)<span style=\"font-family: arial, helvetica, sans-serif; font-size: 14pt;\">',\n                                                ''\n                                              ),\n                                              '(?i)&mdash;',\n                                              '-'\n                                            ),\n                                            '(?i)&ndash;',\n                                            '-'\n                                          ),\n                                          '(?i)<span style=\"font-size: 14pt;\">',\n                                          ''\n                                        ),\n                                        '(?i)<span style=\"font-size: 16.0px;\">',\n                                        ''\n                                      ),\n                                      '(?i)<span style=\"font-size: 12.0pt;\">',\n                                      ''\n                                    ),\n                                    '(?i)<span style=\"font-family: times new roman;\">',\n                                    ''\n                                  ),\n                                  '(?i)&amp;',\n                                  '&'\n                                ),\n                                '(?i)<p style=\"font-size: 14.4px;\">',\n                                ''\n                              ),\n                              '(?i)&iquest;',\n                              '\xBF'\n                            ),\n                            '(?i)&\u200Ceacute;',\n                            '\xE9'\n                          ),\n                          '(?i)&oacute;',\n                          '\xF3'\n                        ),\n                        '(?i)&iacute;',\n                        '\xED'\n                      ),\n                      '(?i)&aacute;',\n                      '\xE1'\n                    ),\n                    '(?i)&iexcl;',\n                    '\xA1'\n                  ),\n                  '(?i)<span style=\"text-decoration: underline;\">',\n                  ''\n                ),\n                '(?i)<p style=\"margin: 0in; font-size: 12pt; font-family: Calibri, sans-serif;\">',\n                ''\n              ),\n              '(?i)<span style=\"font-size: 11.0pt; font-family: Arial, sans-serif; color: black;\">',\n              ''\n            ),\n            '(?i)<p style=\"margin: 0.1pt 0in; font-size: 10pt; font-family: Times;\">',\n            ''\n          ),\n          '(?i)<span style=\"font-size: 14.0pt; font-family: Arial, sans-serif;\">',\n          ''\n        ) AS \"UserAnswer\"\n      FROM\n        \"Join Data 7\"\n    ),\n    \"UserTable v4 9\" AS (\n      SELECT\n        \"QuestionId\",\n        \"QuestionVersionId\",\n        \"AnswerId\",\n        \"UserSelection\",\n        \"UserAnswer\",\n        \"IsAutoGraded\",\n        \"TemplateTypeId\",\n        \"QuestionType\",\n        \"Name\",\n        \"Question\",\n        \"Comment\",\n        \"AnswerKey\",\n        \"CreationDate\",\n        \"Version\",\n        \"AllowsAttachments\",\n        \"Question Library 8.QuestionVersionId\",\n        \"QuizId\",\n        \"UserId\",\n        \"OrgUnitId\",\n        \"TimeStarted\",\n        \"TimeCompleted\",\n        \"Score\",\n        \"IsGraded\",\n        \"OldAttemptNumber\",\n        \"IsDeleted\",\n        \"PossibleScore\",\n        \"IsRetakeIncorrectOnly\",\n        \"DueDate\",\n        \"TimeLimit\",\n        \"TimeLimitEnforced\",\n        \"GracePeriod\",\n        \"GracePeriodExceededBehaviour\",\n        \"ExtendedDeadline\",\n        \"AttemptNumber_1\",\n        \"AttemptId\" AS \"AttemptId\",\n        \"QuestionId\" AS \"QuestionId_1\"\n      FROM\n        \"Replace Text 1 8\"\n    )\n    SELECT\n    \"QuestionId\",\n    \"QuestionVersionId\",\n    \"AnswerId\",\n    \"UserSelection\",\n    \"UserAnswer\",\n    \"IsAutoGraded\",\n    \"TemplateTypeId\",\n    \"QuestionType\",\n    \"Name\",\n    \"Question\",\n    \"Comment\",\n    \"AnswerKey\",\n    \"CreationDate\",\n    \"Version\",\n    \"AllowsAttachments\",\n    \"Question Library 8.QuestionVersionId\",\n    \"QuizId\",\n    \"UserId\",\n    \"OrgUnitId\",\n    \"TimeStarted\",\n    \"TimeCompleted\",\n    \"Score\",\n    \"IsGraded\",\n    \"OldAttemptNumber\",\n    \"IsDeleted\",\n    \"PossibleScore\",\n    \"IsRetakeIncorrectOnly\",\n    \"DueDate\",\n    \"TimeLimit\",\n    \"TimeLimitEnforced\",\n    \"GracePeriod\",\n    \"GracePeriodExceededBehaviour\",\n    \"ExtendedDeadline\",\n    \"AttemptNumber_1\",\n    \"AttemptId\",\n    \"QuestionId_1\"\n    FROM\n    \"UserTable v4 9\"";
    var backSQL = "WITH \"Quiz Attempts 8 1\" AS (SELECT \"attemptid\" AS \"AttemptId\", \"quizid\" AS \"QuizId\", \"userid\" AS \"UserId\", \"orgunitid\" AS \"OrgUnitId\", \"attemptnumber\" AS \"AttemptNumber\", CAST(\"timestarted\" AS TIMESTAMP) AS \"TimeStarted\", CAST(\"timecompleted\" AS TIMESTAMP) AS \"TimeCompleted\", \"score\" AS \"Score\", \"isgraded\" AS \"IsGraded\", \"oldattemptnumber\" AS \"OldAttemptNumber\", \"isdeleted\" AS \"IsDeleted\", \"possiblescore\" AS \"PossibleScore\", \"isretakeincorrectonly\" AS \"IsRetakeIncorrectOnly\", CAST(\"duedate\" AS TIMESTAMP) AS \"DueDate\", \"timelimit\" AS \"TimeLimit\", \"timelimitenforced\" AS \"TimeLimitEnforced\", \"graceperiod\" AS \"GracePeriod\", \"graceperiodexceededbehaviour\" AS \"GracePeriodExceededBehaviour\", \"extendeddeadline\" AS \"ExtendedDeadline\" FROM \"brightspace_data_sets_4c829df9_d432_4ae3_bf08_363f82e8793c\".\"quizattempts_8_13_2\"), \"Filter by Quiz ID 2\" AS (SELECT * FROM \"Quiz Attempts 8 1\" WHERE \"QuizId\" = 319058), \"Quiz User Answer Responses 8 3\" AS (SELECT \"attemptid\" AS \"AttemptId\", \"attemptnumber\" AS \"AttemptNumber\", \"questionid\" AS \"QuestionId\", \"questionversionid\" AS \"QuestionVersionId\", \"answerid\" AS \"AnswerId\", \"sortorder\" AS \"SortOrder\", \"iscorrect\" AS \"IsCorrect\", \"userselection\" AS \"UserSelection\", \"useranswer\" AS \"UserAnswer\", \"filesetid\" AS \"FileSetId\" FROM \"brightspace_data_sets_4c829df9_d432_4ae3_bf08_363f82e8793c\".\"quizuseranswerresponses_8_13_2\"), \"Select Columns 4\" AS (SELECT \"AttemptId\", \"QuestionId\", \"QuestionVersionId\", \"UserSelection\", \"UserAnswer\", \"AnswerId\" FROM \"Quiz User Answer Responses 8 3\"), \"Question Library 8 5\" AS (SELECT \"questionid\" AS \"QuestionId\", \"questionversionid\" AS \"QuestionVersionId\", \"isautograded\" AS \"IsAutoGraded\", \"templatetypeid\" AS \"TemplateTypeId\", \"questiontype\" AS \"QuestionType\", \"name\" AS \"Name\", \"question\" AS \"Question\", \"comment\" AS \"Comment\", \"answerkey\" AS \"AnswerKey\", CAST(\"creationdate\" AS TIMESTAMP) AS \"CreationDate\", \"version\" AS \"Version\", \"allowsattachments\" AS \"AllowsAttachments\" FROM \"brightspace_data_sets_4c829df9_d432_4ae3_bf08_363f82e8793c\".\"questionlibrary_8_13_2\"), \"Joining Question Library 6\" AS (SELECT \"T1\".\"AttemptId\", \"T1\".\"QuestionId\", \"T1\".\"QuestionVersionId\", \"T1\".\"AnswerId\", \"T1\".\"UserSelection\", \"T1\".\"UserAnswer\", \"T2\".\"QuestionId\", \"T2\".\"QuestionVersionId\" AS \"Question Library 8.QuestionVersionId\", \"T2\".\"IsAutoGraded\", \"T2\".\"TemplateTypeId\", \"T2\".\"QuestionType\", \"T2\".\"Name\", \"T2\".\"Question\", \"T2\".\"Comment\", \"T2\".\"AnswerKey\", \"T2\".\"CreationDate\", \"T2\".\"Version\", \"T2\".\"AllowsAttachments\" FROM \"Select Columns 4\" AS \"T1\" INNER JOIN \"Question Library 8 5\" AS \"T2\" ON \"T1\".\"QuestionId\" = \"T2\".\"QuestionId\"), \"Join Data 7\" AS (SELECT \"T1\".\"AttemptId\", \"T1\".\"QuestionId\", \"T1\".\"QuestionVersionId\", \"T1\".\"AnswerId\", \"T1\".\"UserSelection\", \"T1\".\"UserAnswer\", \"T1\".\"QuestionId\", \"T1\".\"IsAutoGraded\", \"T1\".\"TemplateTypeId\", \"T1\".\"QuestionType\", \"T1\".\"Name\", \"T1\".\"Question\", \"T1\".\"Comment\", \"T1\".\"AnswerKey\", \"T1\".\"CreationDate\", \"T1\".\"Version\", \"T1\".\"AllowsAttachments\", \"T1\".\"Question Library 8.QuestionVersionId\", \"T2\".\"AttemptId\" AS \"AttemptId_1\", \"T2\".\"QuizId\", \"T2\".\"UserId\", \"T2\".\"OrgUnitId\", \"T2\".\"AttemptNumber\" AS \"AttemptNumber_1\", \"T2\".\"TimeStarted\", \"T2\".\"TimeCompleted\", \"T2\".\"Score\", \"T2\".\"IsGraded\", \"T2\".\"OldAttemptNumber\", \"T2\".\"IsDeleted\", \"T2\".\"PossibleScore\", \"T2\".\"IsRetakeIncorrectOnly\", \"T2\".\"DueDate\", \"T2\".\"TimeLimit\", \"T2\".\"TimeLimitEnforced\", \"T2\".\"GracePeriod\", \"T2\".\"GracePeriodExceededBehaviour\", \"T2\".\"ExtendedDeadline\" FROM \"Joining Question Library 6\" AS \"T1\" INNER JOIN \"Filter by Quiz ID 2\" AS \"T2\" ON \"T1\".\"AttemptId\" = \"T2\".\"AttemptId\"), \"Replace Text 1 8\" AS (SELECT \"AttemptId\", \"QuestionId\", \"QuestionVersionId\", \"AnswerId\", \"UserSelection\", \"QuestionId\", \"IsAutoGraded\", \"TemplateTypeId\", \"QuestionType\", \"Name\", \"Question\", \"Comment\", \"AnswerKey\", \"CreationDate\", \"Version\", \"AllowsAttachments\", \"Question Library 8.QuestionVersionId\", \"QuizId\", \"UserId\", \"OrgUnitId\", \"TimeStarted\", \"TimeCompleted\", \"Score\", \"IsGraded\", \"OldAttemptNumber\", \"IsDeleted\", \"PossibleScore\", \"IsRetakeIncorrectOnly\", \"DueDate\", \"TimeLimit\", \"TimeLimitEnforced\", \"GracePeriod\", \"GracePeriodExceededBehaviour\", \"ExtendedDeadline\", \"AttemptNumber_1\", regexp_replace(regexp_replace(regexp_replace(regexp_replace(regexp_replace(regexp_replace(regexp_replace(regexp_replace(regexp_replace(regexp_replace(regexp_replace(regexp_replace(regexp_replace(regexp_replace(regexp_replace(regexp_replace(regexp_replace(regexp_replace(regexp_replace(regexp_replace(regexp_replace(regexp_replace(regexp_replace(regexp_replace(regexp_replace(regexp_replace(regexp_replace(regexp_replace(regexp_replace(regexp_replace(regexp_replace(regexp_replace(regexp_replace(regexp_replace(regexp_replace(regexp_replace(regexp_replace(regexp_replace(regexp_replace(regexp_replace(regexp_replace(regexp_replace(regexp_replace(\"UserAnswer\", '(?i)&hellip;', '...'), '(?i)&#x', 'x'), '(?i)ldquo', '\"'), '(?i)rdquo', '\"'), '(?i)&nbsp', ''), '(?i)<p>', ''), '(?i)</p>', ''), '(?i)<strong>', ''), '(?i)</strong>', ''), '(?i)<div>', ''), '(?i)</div>', ''), '(?i)<ul>', ''), '(?i)</ul>', ''), '(?i)<u>', ''), '(?i)</u>', ''), '(?i)<br/>', ''), '(?i)<li>', ''), '(?i)</li>', ''), '(?i)<em>', ''), '(?i)</em>', ''), '(?i)<span>', ''), '(?i)</span>', ''), '(?i)<span style=\"font-family: arial, helvetica, sans-serif;\">', ''), '(?i)<span style=\"font-family: arial, helvetica, sans-serif; font-size: 14pt;\">', ''), '(?i)&mdash;', '-'), '(?i)&ndash;', '-'), '(?i)<span style=\"font-size: 14pt;\">', ''), '(?i)<span style=\"font-size: 16.0px;\">', ''), '(?i)<span style=\"font-size: 12.0pt;\">', ''), '(?i)<span style=\"font-family: times new roman;\">', ''), '(?i)&amp;', '&'), '(?i)<p style=\"font-size: 14.4px;\">', ''), '(?i)&iquest;', '\xBF'), '(?i)&\u200Ceacute;', '\xE9'), '(?i)&oacute;', '\xF3'), '(?i)&iacute;', '\xED'), '(?i)&aacute;', '\xE1'), '(?i)&iexcl;', '\xA1'), '(?i)<span style=\"text-decoration: underline;\">', ''), '(?i)<p style=\"margin: 0in; font-size: 12pt; font-family: Calibri, sans-serif;\">', ''), '(?i)<span style=\"font-size: 11.0pt; font-family: Arial, sans-serif; color: black;\">', ''), '(?i)<p style=\"margin: 0.1pt 0in; font-size: 10pt; font-family: Times;\">', ''), '(?i)<span style=\"font-size: 14.0pt; font-family: Arial, sans-serif;\">', '') AS \"UserAnswer\" FROM \"Join Data 7\"), \"UserTable v4 9\" AS (SELECT \"QuestionId\", \"QuestionVersionId\", \"AnswerId\", \"UserSelection\", \"UserAnswer\", \"IsAutoGraded\", \"TemplateTypeId\", \"QuestionType\", \"Name\", \"Question\", \"Comment\", \"AnswerKey\", \"CreationDate\", \"Version\", \"AllowsAttachments\", \"Question Library 8.QuestionVersionId\", \"QuizId\", \"UserId\", \"OrgUnitId\", \"TimeStarted\", \"TimeCompleted\", \"Score\", \"IsGraded\", \"OldAttemptNumber\", \"IsDeleted\", \"PossibleScore\", \"IsRetakeIncorrectOnly\", \"DueDate\", \"TimeLimit\", \"TimeLimitEnforced\", \"GracePeriod\", \"GracePeriodExceededBehaviour\", \"ExtendedDeadline\", \"AttemptNumber_1\", \"AttemptId\" AS \"AttemptId\", \"QuestionId\" AS \"QuestionId_1\" FROM \"Replace Text 1 8\") SELECT \"QuestionId\", \"QuestionVersionId\", \"AnswerId\", \"UserSelection\", \"UserAnswer\", \"IsAutoGraded\", \"TemplateTypeId\", \"QuestionType\", \"Name\", \"Question\", \"Comment\", \"AnswerKey\", \"CreationDate\", \"Version\", \"AllowsAttachments\", \"Question Library 8.QuestionVersionId\", \"QuizId\", \"UserId\", \"OrgUnitId\", \"TimeStarted\", \"TimeCompleted\", \"Score\", \"IsGraded\", \"OldAttemptNumber\", \"IsDeleted\", \"PossibleScore\", \"IsRetakeIncorrectOnly\", \"DueDate\", \"TimeLimit\", \"TimeLimitEnforced\", \"GracePeriod\", \"GracePeriodExceededBehaviour\", \"ExtendedDeadline\", \"AttemptNumber_1\", \"AttemptId\", \"QuestionId_1\" FROM \"UserTable v4 9\"";
    expect(getParsedSql(sql, opt)).to.be.eql(backSQL);
  });
});

/***/ }),

/***/ "./test/update.spec.js":
/*!*****************************!*\
  !*** ./test/update.spec.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(/*! chai */ "chai"),
  expect = _require.expect;
var Parser = __webpack_require__(/*! ../src/parser */ "./src/parser.js")["default"];
describe('update', function () {
  var parser = new Parser();
  function getParsedSql(sql, opt) {
    var ast = parser.astify(sql, opt);
    return parser.sqlify(ast, opt);
  }
  it('should parse baisc usage', function () {
    var _parser$parse = parser.parse('UPDATE a set id = 1'),
      tableList = _parser$parse.tableList,
      columnList = _parser$parse.columnList,
      ast = _parser$parse.ast;
    expect(tableList).to.eql(["update::null::a"]);
    expect(columnList).to.eql(["update::null::id"]);
    expect(ast.type).to.be.eql('update');
    expect(ast.table).to.be.eql([{
      "db": null,
      "table": "a",
      "as": null
    }]);
    expect(ast.set).to.eql([{
      column: 'id',
      table: null,
      value: {
        type: 'number',
        value: 1
      }
    }]);
    expect(ast.where).to.be["null"];
  });
  it('should parse baisc usage', function () {
    var _parser$parse2 = parser.parse('UPDATE a set a.id = 1'),
      tableList = _parser$parse2.tableList,
      columnList = _parser$parse2.columnList,
      ast = _parser$parse2.ast;
    expect(tableList).to.eql(["update::null::a"]);
    expect(columnList).to.eql(["update::a::id"]);
    expect(ast.type).to.be.eql('update');
    expect(ast.table).to.be.eql([{
      "db": null,
      "table": "a",
      "as": null
    }]);
    expect(ast.set).to.eql([{
      column: 'id',
      table: 'a',
      value: {
        type: 'number',
        value: 1
      }
    }]);
    expect(ast.where).to.be["null"];
  });
  it('should parse function expression', function () {
    var _parser$parse3 = parser.parse("UPDATE t SET col1 = concat(name, '名字')"),
      tableList = _parser$parse3.tableList,
      columnList = _parser$parse3.columnList,
      ast = _parser$parse3.ast;
    expect(tableList).to.eql(["update::null::t"]);
    expect(columnList).to.eql(["select::null::name", "update::null::col1"]);
    expect(ast.type).to.be.eql('update');
    expect(ast.table).to.be.eql([{
      "db": null,
      "table": "t",
      "as": null
    }]);
    expect(ast.set).to.eql([{
      column: "col1",
      table: null,
      value: {
        type: "function",
        name: {
          name: [{
            type: 'default',
            value: 'concat'
          }]
        },
        over: null,
        args: {
          type: "expr_list",
          value: [{
            type: "column_ref",
            table: null,
            column: "name"
          }, {
            type: "single_quote_string",
            value: "名字"
          }]
        }
      }
    }]);
    expect(ast.where).to.be["null"];
  });
  it('should parser set is null', function () {
    var set = [{
      "column": "id",
      "table": null
    }];
    var value = {
      "type": "number",
      "value": 1
    };
    var ast = {
      "type": "update",
      "table": [{
        "db": null,
        "table": "a",
        "as": null
      }],
      "where": null
    };
    expect(parser.sqlify(ast)).to.be.equal('UPDATE `a`');
    ast.set = [];
    expect(parser.sqlify(ast)).to.be.equal('UPDATE `a` SET ');
    ast.set = set;
    expect(parser.sqlify(ast)).to.be.equal('UPDATE `a` SET `id`');
    set[0].value = value;
    expect(parser.sqlify(ast)).to.be.equal('UPDATE `a` SET `id` = 1');
  });
  it('should parse cross-table update', function () {
    var _parser$parse4 = parser.parse("UPDATE Reservations r JOIN Train t ON (r.Train = t.TrainID) SET t.Capacity = t.Capacity + r.NoSeats WHERE r.ReservationID = 12"),
      tableList = _parser$parse4.tableList,
      columnList = _parser$parse4.columnList,
      ast = _parser$parse4.ast;
    expect(tableList).to.eql(["update::null::Reservations", "select::null::Train", "update::null::Train"]);
    expect(columnList).to.eql(["select::Reservations::Train", "select::Train::TrainID", "select::Train::Capacity", "select::Reservations::NoSeats", "select::Reservations::ReservationID", "update::Train::Capacity"]);
    expect(ast.type).to.be.eql('update');
    expect(ast.table).to.be.eql([{
      "db": null,
      "table": "Reservations",
      "as": "r"
    }, {
      "db": null,
      "table": "Train",
      "as": "t",
      "join": "INNER JOIN",
      "on": {
        "type": "binary_expr",
        "operator": "=",
        "left": {
          "type": "column_ref",
          "table": "r",
          "column": "Train"
        },
        "right": {
          "type": "column_ref",
          "table": "t",
          "column": "TrainID"
        },
        "parentheses": true
      }
    }]);
    expect(ast.set).to.eql([{
      "column": "Capacity",
      "value": {
        "type": "binary_expr",
        "operator": "+",
        "left": {
          "type": "column_ref",
          "table": "t",
          "column": "Capacity"
        },
        "right": {
          "type": "column_ref",
          "table": "r",
          "column": "NoSeats"
        }
      },
      "table": "t"
    }]);
    expect(ast.where).to.be.eql({
      "type": "binary_expr",
      "operator": "=",
      "left": {
        "type": "column_ref",
        "table": "r",
        "column": "ReservationID"
      },
      "right": {
        "type": "number",
        "value": 12
      }
    });
  });
  it('should support set value', function () {
    expect(getParsedSql('update a set id = 123, name = values(abc) where age > 15 order by name')).to.be.equal('UPDATE `a` SET `id` = 123, `name` = values(`abc`) WHERE `age` > 15 ORDER BY `name` ASC');
  });
  it('should support order by and limit in update sql', function () {
    expect(getParsedSql('update a set id = 123 where age > 15 order by name')).to.be.equal('UPDATE `a` SET `id` = 123 WHERE `age` > 15 ORDER BY `name` ASC');
    expect(getParsedSql('update a set id = 123 order by name')).to.be.equal('UPDATE `a` SET `id` = 123 ORDER BY `name` ASC');
    expect(getParsedSql('update a set id = 123 limit 10')).to.be.equal('UPDATE `a` SET `id` = 123 LIMIT 10');
    expect(getParsedSql('update a set id = 123 order by name limit 10')).to.be.equal('UPDATE `a` SET `id` = 123 ORDER BY `name` ASC LIMIT 10');
  });
  it('should support parse pg update returning', function () {
    var sql = 'update account set id = 1 where name = "abc" returning id';
    var ast = parser.astify(sql, {
      database: 'postgresql'
    });
    var backSQL = parser.sqlify(ast);
    expect(backSQL).to.be.equal('UPDATE `account` SET id = 1 WHERE name = "abc" RETURNING id');
  });
  it('should get tableList in right action', function () {
    var sql = "UPDATE empdb.employees t1 INNER JOIN empdb.merits t2 ON t1.performance = t2.performance SET t1.salary = t1.salary + t1.salary * t2.percentage;";
    var ast = parser.parse(sql);
    expect(ast.tableList).to.eql(["update::empdb::employees", "select::empdb::merits"]);
    expect(ast.columnList).to.eql(["select::employees::performance", "select::merits::performance", "select::employees::salary", "select::merits::percentage", "update::employees::salary"]);
  });
  sql = "UPDATE empdb.employees t1 INNER JOIN (select t2.percentage,t2.performance from empdb.merits t2) as t3 ON t1.performance = t3.performance SET t1.salary = t1.salary + t1.salary * t3.percentage;";
  ast = parser.parse(sql);
  expect(ast.tableList).to.eql(["select::empdb::merits", "update::empdb::employees"]);
  expect(ast.columnList).to.eql(["select::merits::percentage", "select::merits::performance", "select::employees::performance", "select::t3::performance", "select::employees::salary", "select::t3::percentage", "update::employees::salary"]);
  sql = "DELETE t1 FROM t1 INNER JOIN  t2 ON t2.ref = t1.id;";
  ast = parser.parse(sql);
  expect(ast.tableList).to.eql(["delete::null::t1", "select::null::t2"]);
  expect(ast.columnList).to.eql(["select::t2::ref", "select::t1::id", "delete::t1::(.*)"]);
});

/***/ }),

/***/ "./test/util.spec.js":
/*!***************************!*\
  !*** ./test/util.spec.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(/*! chai */ "chai"),
  expect = _require.expect;
var _require2 = __webpack_require__(/*! ../src/util */ "./src/util.js"),
  columnIdentifierToSql = _require2.columnIdentifierToSql,
  createValueExpr = _require2.createValueExpr,
  createBinaryExpr = _require2.createBinaryExpr,
  literalToSQL = _require2.literalToSQL,
  commentToSQL = _require2.commentToSQL,
  identifierToSql = _require2.identifierToSql,
  setParserOpt = _require2.setParserOpt;
var _require3 = __webpack_require__(/*! ../src/over */ "./src/over.js"),
  overToSQL = _require3.overToSQL;
describe('util function test', function () {
  it('should throw error when type is unkonwn', function () {
    expect(createValueExpr.bind(null, {})).to["throw"]('Cannot convert value "object" to SQL');
  });
  it('should sqlify when right do not has type', function () {
    expect(createBinaryExpr('=', {
      type: 'left'
    }, 2)).to.be.eql({
      operator: '=',
      type: 'binary_expr',
      left: {
        type: 'left'
      },
      right: {
        type: 'number',
        value: 2
      }
    });
  });
  it('should sqlify when type if boolean has parentheses', function () {
    expect(literalToSQL({
      type: 'boolean',
      parentheses: true,
      value: 1
    })).to.equal('(TRUE)');
  });
  it('should comment with symbol', function () {
    var comment = commentToSQL({
      keyword: 'comment',
      value: {
        type: 'string',
        value: '123'
      },
      symbol: '='
    });
    expect(comment).to.equal("COMMENT = '123'");
  });
  it('should support default back quote', function () {
    setParserOpt({
      "database": "default"
    });
    expect(identifierToSql('db')).to.be.equal('`db`');
    setParserOpt({});
    expect(identifierToSql('db')).to.be.equal('`db`');
  });
  it('should support columnIdentifierToSql without ident', function () {
    expect(columnIdentifierToSql()).to.be.undefined;
  });
  it('should sqlify backticks_quote_string', function () {
    expect(literalToSQL({
      type: 'backticks_quote_string',
      parentheses: true,
      value: "abc"
    })).to.equal('(`abc`)');
  });
});
describe('over to sql', function () {
  it('should throw new error when type is unknown', function () {
    expect(function () {
      return overToSQL({
        type: 'unknown'
      });
    }).to["throw"]('unknown over type');
  });
});

/***/ }),

/***/ "./tests-index.js":
/*!************************!*\
  !*** ./tests-index.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var req = __webpack_require__("./test sync recursive \\.spec.js$");
req.keys().forEach(req);
__webpack_require__(/*! vscode-mocha-hmr */ "vscode-mocha-hmr")(module);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ 0:
/*!***************************************************!*\
  !*** multi webpack/hot/poll?100 ./tests-index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! webpack/hot/poll?100 */"./node_modules/webpack/hot/poll.js?100");
module.exports = __webpack_require__(/*! ./tests-index.js */"./tests-index.js");


/***/ }),

/***/ "chai":
/*!***********************!*\
  !*** external "chai" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("chai");

/***/ }),

/***/ "vscode-mocha-hmr":
/*!***********************************!*\
  !*** external "vscode-mocha-hmr" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("vscode-mocha-hmr");

/***/ })

/******/ })));
//# sourceMappingURL=tests.js.map