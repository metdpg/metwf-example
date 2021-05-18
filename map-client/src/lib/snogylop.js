
import L  from "leaflet";

export default function InvertPolygonExtension() {
    // Use public isFlat if available, else fall back to private _flat
    var isFlat = L.LineUtil.isFlat ? L.LineUtil.isFlat : L.LineUtil._flat;

    function defineSnogylop(L) {

        var worldLatlngs = [
            L.latLng([90, 180]),
            L.latLng([90, -180]),
            L.latLng([-90, -180]),
            L.latLng([-90, 180])
        ];

        var OriginalPolygon = {
            toGeoJSON: L.Polygon.prototype.toGeoJSON
        };
        L.extend(L.Polygon.prototype, {
            _setLatLngs: function(latlngs) {
                this._originalLatLngs = latlngs;
                if (isFlat(this._originalLatLngs)) {
                    this._originalLatLngs = [this._originalLatLngs];
                }
                worldLatlngs = (this.options.worldLatLngs ?
                    this.options.worldLatLngs :
                    worldLatlngs);
                // Create a new set of latlngs, adding our world-sized ring
                // first
                var newLatlngs = [];
                newLatlngs.push(worldLatlngs);
                for (var l in latlngs) {
                    newLatlngs.push(latlngs[l]);
                }
                latlngs = [newLatlngs];
                L.Polyline.prototype._setLatLngs.call(this, latlngs);
            },
            getBounds: function () {
                if (this._originalLatLngs) {
                    // Don't return the world-sized ring's bounds, that's not
                    // helpful!
                    return new L.LatLngBounds(this._originalLatLngs);
                }
                return new L.LatLngBounds(this.getLatLngs());
            },
            getLatLngs: function() {
                return this._originalLatLngs;
            },
            toGeoJSON: function (precision) {
                var holes = !isFlat(this._originalLatLngs),
                    multi = holes && !isFlat(this._originalLatLngs[0]);
                var coords = L.GeoJSON.latLngsToCoords(this._originalLatLngs, multi ? 2 : holes ? 1 : 0, true, precision);
                if (!holes) {
                    coords = [coords];
                }
                return L.GeoJSON.getFeature(this, {
                    type: (multi ? 'Multi' : '') + 'Polygon',
                    coordinates: coords
                });
            }
        });
    }

     defineSnogylop(L);
};
