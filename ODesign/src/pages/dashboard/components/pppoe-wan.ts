/* eslint-disable spaced-comment */
/* eslint-disable func-names */
/* eslint-disable prefer-template */
/* eslint-disable block-scoped-var */
/* eslint-disable no-restricted-properties */
/* eslint-disable no-caller */
/* eslint-disable dot-notation */
/* eslint-disable operator-assignment */
/* eslint-disable vars-on-top */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-var */
import { ref } from 'vue';

import { getRealtimeBandwidthStatus } from '@/api/apm';
import { StringExtensions as String } from '@/utils/cbi';
// import { XHR } from '@/utils/XHR';
// eslint-disable-next-line spaced-comment
//<![CDATA[
// var bwxhr = new XHR();

var G;
var TIME = 0;
var RXB = 1;
var RXP = 2;
var TXB = 3;
var TXP = 4;

var width = 760;
var height = 300;
var step = 5;

var data_wanted = Math.floor(width / step);
var data_fill = 0;
var data_stamp = 0;

var data_rx = [] as any;
var data_tx = [] as any;

var line_rx: any;
var line_tx: any;

var label_25: any;
var label_50: any;
var label_75: any;

var label_rx_cur: any;
var label_rx_avg: any;
var label_rx_peak: any;

var label_tx_cur: any;
var label_tx_avg: any;
var label_tx_peak: any;

var label_scale;

function bandwidth_label(bytes: any, br?: any): any {
  var uby = 'kB/s';
  var kby = bytes / 1024;

  if (kby >= 1024) {
    uby = 'MB/s';
    // eslint-disable-next-line operator-assignment
    kby = kby / 1024;
  }

  var ubi = 'kbit/s';
  var kbi = (bytes * 8) / 1024;

  if (kbi >= 1024) {
    ubi = 'Mbit/s';
    kbi = kbi / 1024;
  }

  return String.format('%f %s%s(%f %s)', kbi.toFixed(2), ubi, br ? '<br />' : ' ', kby.toFixed(2), uby);
}

// eslint-disable-next-line import/no-mutable-exports
const realtimeBandwidthStatusMonitorStartingRef = ref(false);
export function stopRealtimeBandwidthStatusMonitor() {
  realtimeBandwidthStatusMonitorStartingRef.value = false;
}
/* wait for SVG */
export function startRealtimeBandwidthStatusMonitor(): any {
  realtimeBandwidthStatusMonitorStartingRef.value = true;

  var svg = document.getElementById('bwsvg') as any;

  try {
    G = svg.getSVGDocument ? svg.getSVGDocument() : svg.contentDocument;
  } catch (e) {
    G = (document as any).embeds['bwsvg'].getSVGDocument();
  }

  if (!G) {
    return; // window.setTimeout(arguments.callee, 1000);
  }

  /* find sizes */
  width = svg.offsetWidth - 2;
  height = svg.offsetHeight - 2;
  data_wanted = Math.ceil(width / step);

  /* prefill datasets */
  for (var i = 0; i < data_wanted; i++) {
    data_rx[i] = 0;
    data_tx[i] = 0;
  }

  /* find svg elements */
  line_rx = G.getElementById('rx');
  line_tx = G.getElementById('tx');

  label_25 = G.getElementById('label_25');
  label_50 = G.getElementById('label_50');
  label_75 = G.getElementById('label_75');

  label_rx_cur = document.getElementById('rx_bw_cur');
  label_rx_avg = document.getElementById('rx_bw_avg');
  label_rx_peak = document.getElementById('rx_bw_peak');

  label_tx_cur = document.getElementById('tx_bw_cur');
  label_tx_avg = document.getElementById('tx_bw_avg');
  label_tx_peak = document.getElementById('tx_bw_peak');

  label_scale = document.getElementById('scale');

  /* plot horizontal time interval lines */
  for (var i = width % (step * 60); i < width; i += step * 60) {
    var line = G.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', i);
    line.setAttribute('y1', 0);
    line.setAttribute('x2', i);
    line.setAttribute('y2', '100%');
    line.setAttribute('style', 'stroke:black;stroke-width:0.1');

    var text = G.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', i + 5);
    text.setAttribute('y', 15);
    text.setAttribute('style', 'fill:#999999; font-size:9pt');
    text.appendChild(G.createTextNode(Math.round((width - i) / step / 60) + 'm'));

    label_25.parentNode.appendChild(line);
    label_25.parentNode.appendChild(text);
  }

  label_scale.innerHTML = String.format('（最近 %d 分钟信息，每 %d 秒刷新）', data_wanted / 60, 3);

  const fnGetRealtimeBandwidthStatusInterval = 3000;
  const fnGetRealtimeBandwidthStatus = async () => {
    try {
      if (!realtimeBandwidthStatusMonitorStartingRef.value) {
        return;
      }
      const getResult = await getRealtimeBandwidthStatus('pppoe-wan');

      console.log('fnGetRealtimeBandwidthStatus: ', getResult.data);

      var data = getResult.data as any;

      var data_max = 0;
      var data_scale = 0;

      var data_rx_avg = 0;
      var data_tx_avg = 0;

      var data_rx_peak = 0;
      var data_tx_peak = 0;

      for (var i = data_stamp ? 0 : 1; i < data.length; i++) {
        /* skip overlapping entries */
        if (data[i][TIME] <= data_stamp) continue;

        /* normalize difference against time interval */
        if (i > 0) {
          var time_delta = data[i][TIME] - data[i - 1][TIME];
          if (time_delta) {
            data_rx.push((data[i][RXB] - data[i - 1][RXB]) / time_delta);
            data_tx.push((data[i][TXB] - data[i - 1][TXB]) / time_delta);
          }
        }
      }

      /* cut off outdated entries */
      data_rx = data_rx.slice(data_rx.length - data_wanted, data_rx.length);
      data_tx = data_tx.slice(data_tx.length - data_wanted, data_tx.length);

      /* find peak */
      for (var i = 0; i < data_rx.length; i++) {
        data_max = Math.max(data_max, data_rx[i]);
        data_max = Math.max(data_max, data_tx[i]);

        data_rx_peak = Math.max(data_rx_peak, data_rx[i]);
        data_tx_peak = Math.max(data_tx_peak, data_tx[i]);

        if (i > 0) {
          data_rx_avg = (data_rx_avg + data_rx[i]) / 2;
          data_tx_avg = (data_tx_avg + data_tx[i]) / 2;
        } else {
          data_rx_avg = data_rx[i];
          data_tx_avg = data_tx[i];
        }
      }

      /* remember current timestamp, calculate horizontal scale */
      data_stamp = data[data.length - 1][TIME];
      data_scale = height / (data_max * 1.1);

      /* plot data */
      var pt_rx = '0,' + height;
      var pt_tx = '0,' + height;

      var y_rx = 0;
      var y_tx = 0;

      for (var i = 0; i < data_rx.length; i++) {
        var x: any = i * step;

        y_rx = height - Math.floor(data_rx[i] * data_scale);
        y_tx = height - Math.floor(data_tx[i] * data_scale);

        pt_rx += ' ' + x + ',' + y_rx;
        pt_tx += ' ' + x + ',' + y_tx;
      }

      pt_rx += ' ' + width + ',' + y_rx + ' ' + width + ',' + height;
      pt_tx += ' ' + width + ',' + y_tx + ' ' + width + ',' + height;

      line_rx.setAttribute('points', pt_rx);
      line_tx.setAttribute('points', pt_tx);

      label_25.firstChild.data = bandwidth_label(1.1 * 0.25 * data_max);
      label_50.firstChild.data = bandwidth_label(1.1 * 0.5 * data_max);
      label_75.firstChild.data = bandwidth_label(1.1 * 0.75 * data_max);

      label_rx_cur.innerHTML = bandwidth_label(data_rx[data_rx.length - 1], true);
      label_tx_cur.innerHTML = bandwidth_label(data_tx[data_tx.length - 1], true);

      label_rx_avg.innerHTML = bandwidth_label(data_rx_avg, true);
      label_tx_avg.innerHTML = bandwidth_label(data_tx_avg, true);

      label_rx_peak.innerHTML = bandwidth_label(data_rx_peak, true);
      label_tx_peak.innerHTML = bandwidth_label(data_tx_peak, true);
    } catch (error) {
      console.error(error);
    }
    window.setTimeout(fnGetRealtimeBandwidthStatus, fnGetRealtimeBandwidthStatusInterval);
  };
  fnGetRealtimeBandwidthStatus();
  /* render datasets, start update interval */
}
//]]>
