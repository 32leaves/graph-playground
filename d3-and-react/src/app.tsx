import * as React from "react";
import * as d3 from "d3";
import { ELK, ElkPoint, ElkNode, ElkExtendedEdge } from "elkjs/lib/elk-api";
import ElkConstructor from 'elkjs/lib/elk-api';

interface AppState {
    nodes: Map<string, Node>;
}

type NodeStatus = "built" | "building" | "waiting";

interface Node {
    id: string;
    status: NodeStatus;
}

export class App extends React.Component<{}, AppState> {
    protected ref: HTMLDivElement;
    protected canvas: HTMLCanvasElement;
    protected nodes: d3.Selection<SVGRectElement, ElkNode, SVGSVGElement, unknown> | undefined;
    protected elk: ELK;

    constructor() {
        super({});
        this.elk = new ElkConstructor({
            algorithms: ['layered'],
            workerUrl: "elk/elk-worker.min.js",
        });

        this.state = {
            nodes: new Map<string, Node>([
                ["pd233b1c6592ac23f8abf3ada06aee78ce13e24b6", { "id": "pd233b1c6592ac23f8abf3ada06aee78ce13e24b6", status: 'built' }],
                ["p8d5696e3ea143b6e940ec8a919dc5798b3da2bd9", { "id": "p8d5696e3ea143b6e940ec8a919dc5798b3da2bd9", status: 'built' }],
                ["p84d19f36563e51e287b6e430edbcdbb8d4d18949", { "id": "p84d19f36563e51e287b6e430edbcdbb8d4d18949", status: 'built' }],
                ["pdc990a10cc39d8ac481e0e49a08508d5dcbb2604", { "id": "pdc990a10cc39d8ac481e0e49a08508d5dcbb2604", status: 'built' }],
                ["pf36160bcbf0baa79986adbfcc5faa831e8e9452d", { "id": "pf36160bcbf0baa79986adbfcc5faa831e8e9452d", status: 'built' }],
                ["pa7fb93e5ba57c4a069b2d586edd468693756489b", { "id": "pa7fb93e5ba57c4a069b2d586edd468693756489b", status: 'built' }],
                ["p2e4b77180ab512414192653658a770d3bf50e145", { "id": "p2e4b77180ab512414192653658a770d3bf50e145", status: 'built' }],
                ["pe1b299334b8ef06907b7ff1b89447dc3df893d3d", { "id": "pe1b299334b8ef06907b7ff1b89447dc3df893d3d", status: 'built' }],
                ["p6d18aef6ae1a5f0e9676866dd1148c851c22e7b0", { "id": "p6d18aef6ae1a5f0e9676866dd1148c851c22e7b0", status: 'building' }],
                ["pe70e11e6c0a6a738efbecd36ad0785d256604ea2", { "id": "pe70e11e6c0a6a738efbecd36ad0785d256604ea2", status: 'built' }],
                ["p99f69aae3b525dd15d39f983f6b344962c88d73f", { "id": "p99f69aae3b525dd15d39f983f6b344962c88d73f", status: 'built' }],
                ["p1b50eaf6caf11b5f74971be7b205fdfc60663202", { "id": "p1b50eaf6caf11b5f74971be7b205fdfc60663202", status: 'built' }],
                ["p53c97e025a9fffbc3634a6f3870e37e518f49181", { "id": "p53c97e025a9fffbc3634a6f3870e37e518f49181", status: 'built' }],
                ["p5a52b83f4e509401b3bab7c52f0ce7a86c86d7ad", { "id": "p5a52b83f4e509401b3bab7c52f0ce7a86c86d7ad", status: 'built' }],
                ["paeaf13a43eccf1e3f2ae17c9a505227ba004559f", { "id": "paeaf13a43eccf1e3f2ae17c9a505227ba004559f", status: 'built' }],
                ["pd2e88fbaffb9f2052fd3ff427676692f27abbc18", { "id": "pd2e88fbaffb9f2052fd3ff427676692f27abbc18", status: 'built' }],
                ["pacc768fbcfd136c3e2db38f3a89a167ceef22bf0", { "id": "pacc768fbcfd136c3e2db38f3a89a167ceef22bf0", status: 'built' }],
                ["p6b870b0ea7f281d1d20d801b7cedc7f4ad2bb35c", { "id": "p6b870b0ea7f281d1d20d801b7cedc7f4ad2bb35c", status: 'built' }],
                ["pf0ea2a7075e6420e4fde019e375b6aaf22b18dc1", { "id": "pf0ea2a7075e6420e4fde019e375b6aaf22b18dc1", status: 'built' }],
                ["p6331858af4f637c1c637daffe291a2a47b2e1358", { "id": "p6331858af4f637c1c637daffe291a2a47b2e1358", status: 'built' }],
                ["p090cf435716903883090fd97738b53cbf2b6d90d", { "id": "p090cf435716903883090fd97738b53cbf2b6d90d", status: 'built' }],
                ["pc22f403b5f4478578e5585e675d8a72caea0a054", { "id": "pc22f403b5f4478578e5585e675d8a72caea0a054", status: 'built' }],
                ["p852562f92265adff984022611069bab6223fa2e4", { "id": "p852562f92265adff984022611069bab6223fa2e4", status: 'built' }],
                ["pe81af62d7e8a9640e9256ca97f4a0f2909ca2cf8", { "id": "pe81af62d7e8a9640e9256ca97f4a0f2909ca2cf8", status: 'built' }],
                ["p244af486010babf741193c0e2c6c1b56f5abb5ab", { "id": "p244af486010babf741193c0e2c6c1b56f5abb5ab", status: 'built' }],
                ["p495608fe85647e1e7f5271f7b9289229d7bad6e4", { "id": "p495608fe85647e1e7f5271f7b9289229d7bad6e4", status: 'built' }],
                ["pfaa5afa2b716f7bab75d1613a88ea2450c13af14", { "id": "pfaa5afa2b716f7bab75d1613a88ea2450c13af14", status: 'built' }],
                ["pde50d032fd2f520375331121c28d8ac6bf390768", { "id": "pde50d032fd2f520375331121c28d8ac6bf390768", status: 'built' }],
                ["p66473a1ac285c5ac495e6f9224db22a438b9fd85", { "id": "p66473a1ac285c5ac495e6f9224db22a438b9fd85", status: 'built' }],
                ["p89ec3ac28196af9a4a8efc297d0ff2f85b6b6588", { "id": "p89ec3ac28196af9a4a8efc297d0ff2f85b6b6588", status: 'built' }],
                ["peb1f6acff4e8d5b010f3e694d84b9b19e79c8829", { "id": "peb1f6acff4e8d5b010f3e694d84b9b19e79c8829", status: 'built' }],
                ["p721583733d29bd754dc35584f041f37d94776220", { "id": "p721583733d29bd754dc35584f041f37d94776220", status: 'building' }],
                ["p1f97ca204c36c439a1a33e2604a5d0b68dd5e24b", { "id": "p1f97ca204c36c439a1a33e2604a5d0b68dd5e24b", status: 'built' }],
                ["p8f000ac8289d7bd87bcb625485b84bfddba1aaa2", { "id": "p8f000ac8289d7bd87bcb625485b84bfddba1aaa2", status: 'built' }],
                ["pb1437bf66b0ba44424160872865ade472b994287", { "id": "pb1437bf66b0ba44424160872865ade472b994287", status: 'built' }],
                ["p246c31ce470605a7ec098c5f51fa749a081e54d8", { "id": "p246c31ce470605a7ec098c5f51fa749a081e54d8", status: 'built' }],
                ["p0fc0dd4ad67b91d214cc573c63f1373cea8b8df2", { "id": "p0fc0dd4ad67b91d214cc573c63f1373cea8b8df2", status: 'built' }],
                ["paa675959f9dc43b343b6dd4ec4d7cf107727cccd", { "id": "paa675959f9dc43b343b6dd4ec4d7cf107727cccd", status: 'built' }],
                ["p70f78767b6a49e9eb9b5a56999a67e817b83dd4d", { "id": "p70f78767b6a49e9eb9b5a56999a67e817b83dd4d", status: 'built' }],
                ["p4b712fdef386c9634e0c5f32e8f05f935aaf049a", { "id": "p4b712fdef386c9634e0c5f32e8f05f935aaf049a", status: 'built' }],
                ["p45ef3a25c5e1ce3cd6abb935dfa866c7bf854a23", { "id": "p45ef3a25c5e1ce3cd6abb935dfa866c7bf854a23", status: 'built' }],
                ["pd4e82afd4f6a66e1fc157bda466fbec1f4d00d47", { "id": "pd4e82afd4f6a66e1fc157bda466fbec1f4d00d47", status: 'built' }],
                ["p5cfb6047731abfdd4452a0faa58492443177ba7c", { "id": "p5cfb6047731abfdd4452a0faa58492443177ba7c", status: 'built' }],
                ["p228b60e985309a6463d060a349c5aad8ad89f2e9", { "id": "p228b60e985309a6463d060a349c5aad8ad89f2e9", status: 'waiting' }],
                ["p86df6e3abf17cdbf71c05051bbfc1aafd221d76c", { "id": "p86df6e3abf17cdbf71c05051bbfc1aafd221d76c", status: 'waiting' }],
                ["pe684b11f1572d1046cd3f3c73165ae27b3270863", { "id": "pe684b11f1572d1046cd3f3c73165ae27b3270863", status: 'built' }],
                ["pd15424127bcd9083700b4af03d2bfaa4aac42895", { "id": "pd15424127bcd9083700b4af03d2bfaa4aac42895", status: 'built' }],
                ["pdacc1168634f1edeec01b353286cf4fa13d9e0b1", { "id": "pdacc1168634f1edeec01b353286cf4fa13d9e0b1", status: 'built' }],
                ["p5d28c51ad48ab2fb1ed987cef43218d48e9f19e5", { "id": "p5d28c51ad48ab2fb1ed987cef43218d48e9f19e5", status: 'built' }],
                ["pf8724f217733c85c0553449462e3bb9dd7f86128", { "id": "pf8724f217733c85c0553449462e3bb9dd7f86128", status: 'built' }],
                ["p9820a23c18fbd147dac9674fddffab50efb80be4", { "id": "p9820a23c18fbd147dac9674fddffab50efb80be4", status: 'built' }],
                ["pd18d147392e9c9466bac1f5fbaddd26fb6d6d3a1", { "id": "pd18d147392e9c9466bac1f5fbaddd26fb6d6d3a1", status: 'built' }],
                ["p429885c07cb14917e3bd0319271988cf1c78c3fd", { "id": "p429885c07cb14917e3bd0319271988cf1c78c3fd", status: 'built' }],
                ["p330d24433d5573f2e3d1ad6f8e7b0156330b1515", { "id": "p330d24433d5573f2e3d1ad6f8e7b0156330b1515", status: 'built' }],
                ["p2bb91242206b674e19c92ff7ee92b0090f4b78ef", { "id": "p2bb91242206b674e19c92ff7ee92b0090f4b78ef", status: 'built' }],
                ["p3c495e9979288d5daf7714b5baddf01d713e11d6", { "id": "p3c495e9979288d5daf7714b5baddf01d713e11d6", status: 'built' }],
                ["p81619e2a3f4fb7ca29a3c7a06d9dcbd3f00c9934", { "id": "p81619e2a3f4fb7ca29a3c7a06d9dcbd3f00c9934", status: 'built' }],
                ["p7477c2e7394196663d3e457ce388709bd2e82a10", { "id": "p7477c2e7394196663d3e457ce388709bd2e82a10", status: 'built' }],
                ["p3cbea8e42380fdfa96585229754b40045a9a71ba", { "id": "p3cbea8e42380fdfa96585229754b40045a9a71ba", status: 'built' }],
                ["p6334369e9d1b6b55061bbbc3129534c42948073d", { "id": "p6334369e9d1b6b55061bbbc3129534c42948073d", status: 'built' }],
                ["p20df4030efc217c1a24c9467cadd6351a581c90e", { "id": "p20df4030efc217c1a24c9467cadd6351a581c90e", status: 'built' }],
            ])
        }

        this.updateDimensions = this.updateDimensions.bind(this);
    }

    protected updateDimensions() {
        if (!this.ref) {
            return;
        }

        d3.select(this.ref).select("svg")
            .attr("height", () => this.ref.getBoundingClientRect().width)
            .attr("width", () => this.ref.getBoundingClientRect().height);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    async componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);

        const graph: ElkNode = {
            id: "1",
            children: Array.from(this.state.nodes.values()).map(e => {
                const r: ElkNode = {
                    id: e.id,
                    width: this.canvas.getContext("2d").measureText(e.id).width,
                    height: 20,
                };
                return r;
            }),
            edges: [
                { id: "replace-me", "sources": ["p84d19f36563e51e287b6e430edbcdbb8d4d18949"], "targets": ["p86df6e3abf17cdbf71c05051bbfc1aafd221d76c"] },
                { id: "replace-me", "sources": ["p84d19f36563e51e287b6e430edbcdbb8d4d18949"], "targets": ["p6d18aef6ae1a5f0e9676866dd1148c851c22e7b0"] },
                { id: "replace-me", "sources": ["p84d19f36563e51e287b6e430edbcdbb8d4d18949"], "targets": ["p228b60e985309a6463d060a349c5aad8ad89f2e9"] },
                { id: "replace-me", "sources": ["p84d19f36563e51e287b6e430edbcdbb8d4d18949"], "targets": ["p8f000ac8289d7bd87bcb625485b84bfddba1aaa2"] },
                { id: "replace-me", "sources": ["pa7fb93e5ba57c4a069b2d586edd468693756489b"], "targets": ["p1f97ca204c36c439a1a33e2604a5d0b68dd5e24b"] },
                { id: "replace-me", "sources": ["p2e4b77180ab512414192653658a770d3bf50e145"], "targets": ["p6d18aef6ae1a5f0e9676866dd1148c851c22e7b0"] },
                { id: "replace-me", "sources": ["p2e4b77180ab512414192653658a770d3bf50e145"], "targets": ["p81619e2a3f4fb7ca29a3c7a06d9dcbd3f00c9934"] },
                { id: "replace-me", "sources": ["p2e4b77180ab512414192653658a770d3bf50e145"], "targets": ["p228b60e985309a6463d060a349c5aad8ad89f2e9"] },
                { id: "replace-me", "sources": ["p2e4b77180ab512414192653658a770d3bf50e145"], "targets": ["p86df6e3abf17cdbf71c05051bbfc1aafd221d76c"] },
                { id: "replace-me", "sources": ["p2e4b77180ab512414192653658a770d3bf50e145"], "targets": ["pacc768fbcfd136c3e2db38f3a89a167ceef22bf0"] },
                { id: "replace-me", "sources": ["pe1b299334b8ef06907b7ff1b89447dc3df893d3d"], "targets": ["pf36160bcbf0baa79986adbfcc5faa831e8e9452d"] },
                { id: "replace-me", "sources": ["p6d18aef6ae1a5f0e9676866dd1148c851c22e7b0"], "targets": ["p86df6e3abf17cdbf71c05051bbfc1aafd221d76c"] },
                { id: "replace-me", "sources": ["pe70e11e6c0a6a738efbecd36ad0785d256604ea2"], "targets": ["p721583733d29bd754dc35584f041f37d94776220"] },
                { id: "replace-me", "sources": ["pa7fb93e5ba57c4a069b2d586edd468693756489b"], "targets": ["p1f97ca204c36c439a1a33e2604a5d0b68dd5e24b"] },
                { id: "replace-me", "sources": ["p99f69aae3b525dd15d39f983f6b344962c88d73f"], "targets": ["p86df6e3abf17cdbf71c05051bbfc1aafd221d76c"] },
                { id: "replace-me", "sources": ["p99f69aae3b525dd15d39f983f6b344962c88d73f"], "targets": ["pfaa5afa2b716f7bab75d1613a88ea2450c13af14"] },
                { id: "replace-me", "sources": ["p1b50eaf6caf11b5f74971be7b205fdfc60663202"], "targets": ["pdacc1168634f1edeec01b353286cf4fa13d9e0b1"] },
                { id: "replace-me", "sources": ["p53c97e025a9fffbc3634a6f3870e37e518f49181"], "targets": ["p6334369e9d1b6b55061bbbc3129534c42948073d"] },
                { id: "replace-me", "sources": ["p53c97e025a9fffbc3634a6f3870e37e518f49181"], "targets": ["pe1b299334b8ef06907b7ff1b89447dc3df893d3d"] },
                { id: "replace-me", "sources": ["p5a52b83f4e509401b3bab7c52f0ce7a86c86d7ad"], "targets": ["p89ec3ac28196af9a4a8efc297d0ff2f85b6b6588"] },
                { id: "replace-me", "sources": ["p5a52b83f4e509401b3bab7c52f0ce7a86c86d7ad"], "targets": ["p090cf435716903883090fd97738b53cbf2b6d90d"] },
                { id: "replace-me", "sources": ["p5a52b83f4e509401b3bab7c52f0ce7a86c86d7ad"], "targets": ["p246c31ce470605a7ec098c5f51fa749a081e54d8"] },
                { id: "replace-me", "sources": ["paeaf13a43eccf1e3f2ae17c9a505227ba004559f"], "targets": ["p1f97ca204c36c439a1a33e2604a5d0b68dd5e24b"] },
                { id: "replace-me", "sources": ["pd2e88fbaffb9f2052fd3ff427676692f27abbc18"], "targets": ["p852562f92265adff984022611069bab6223fa2e4"] },
                { id: "replace-me", "sources": ["pacc768fbcfd136c3e2db38f3a89a167ceef22bf0"], "targets": ["p228b60e985309a6463d060a349c5aad8ad89f2e9"] },
                { id: "replace-me", "sources": ["pacc768fbcfd136c3e2db38f3a89a167ceef22bf0"], "targets": ["p86df6e3abf17cdbf71c05051bbfc1aafd221d76c"] },
                { id: "replace-me", "sources": ["p6b870b0ea7f281d1d20d801b7cedc7f4ad2bb35c"], "targets": ["p84d19f36563e51e287b6e430edbcdbb8d4d18949"] },
                { id: "replace-me", "sources": ["pf0ea2a7075e6420e4fde019e375b6aaf22b18dc1"], "targets": ["p6331858af4f637c1c637daffe291a2a47b2e1358"] },
                { id: "replace-me", "sources": ["p6331858af4f637c1c637daffe291a2a47b2e1358"], "targets": ["p86df6e3abf17cdbf71c05051bbfc1aafd221d76c"] },
                { id: "replace-me", "sources": ["p090cf435716903883090fd97738b53cbf2b6d90d"], "targets": ["p89ec3ac28196af9a4a8efc297d0ff2f85b6b6588"] },
                { id: "replace-me", "sources": ["pc22f403b5f4478578e5585e675d8a72caea0a054"], "targets": ["p86df6e3abf17cdbf71c05051bbfc1aafd221d76c"] },
                { id: "replace-me", "sources": ["pc22f403b5f4478578e5585e675d8a72caea0a054"], "targets": ["p244af486010babf741193c0e2c6c1b56f5abb5ab"] },
                { id: "replace-me", "sources": ["pc22f403b5f4478578e5585e675d8a72caea0a054"], "targets": ["p8f000ac8289d7bd87bcb625485b84bfddba1aaa2"] },
                { id: "replace-me", "sources": ["p852562f92265adff984022611069bab6223fa2e4"], "targets": ["p1f97ca204c36c439a1a33e2604a5d0b68dd5e24b"] },
                { id: "replace-me", "sources": ["pe81af62d7e8a9640e9256ca97f4a0f2909ca2cf8"], "targets": ["p1f97ca204c36c439a1a33e2604a5d0b68dd5e24b"] },
                { id: "replace-me", "sources": ["pe81af62d7e8a9640e9256ca97f4a0f2909ca2cf8"], "targets": ["p852562f92265adff984022611069bab6223fa2e4"] },
                { id: "replace-me", "sources": ["p244af486010babf741193c0e2c6c1b56f5abb5ab"], "targets": ["p86df6e3abf17cdbf71c05051bbfc1aafd221d76c"] },
                { id: "replace-me", "sources": ["p495608fe85647e1e7f5271f7b9289229d7bad6e4"], "targets": ["p228b60e985309a6463d060a349c5aad8ad89f2e9"] },
                { id: "replace-me", "sources": ["p495608fe85647e1e7f5271f7b9289229d7bad6e4"], "targets": ["p86df6e3abf17cdbf71c05051bbfc1aafd221d76c"] },
                { id: "replace-me", "sources": ["p495608fe85647e1e7f5271f7b9289229d7bad6e4"], "targets": ["pacc768fbcfd136c3e2db38f3a89a167ceef22bf0"] },
                { id: "replace-me", "sources": ["pfaa5afa2b716f7bab75d1613a88ea2450c13af14"], "targets": ["p86df6e3abf17cdbf71c05051bbfc1aafd221d76c"] },
                { id: "replace-me", "sources": ["pde50d032fd2f520375331121c28d8ac6bf390768"], "targets": ["pb1437bf66b0ba44424160872865ade472b994287"] },
                { id: "replace-me", "sources": ["p66473a1ac285c5ac495e6f9224db22a438b9fd85"], "targets": ["pd2e88fbaffb9f2052fd3ff427676692f27abbc18"] },
                { id: "replace-me", "sources": ["p66473a1ac285c5ac495e6f9224db22a438b9fd85"], "targets": ["p852562f92265adff984022611069bab6223fa2e4"] },
                { id: "replace-me", "sources": ["p66473a1ac285c5ac495e6f9224db22a438b9fd85"], "targets": ["p429885c07cb14917e3bd0319271988cf1c78c3fd"] },
                { id: "replace-me", "sources": ["p89ec3ac28196af9a4a8efc297d0ff2f85b6b6588"], "targets": ["p86df6e3abf17cdbf71c05051bbfc1aafd221d76c"] },
                { id: "replace-me", "sources": ["p89ec3ac28196af9a4a8efc297d0ff2f85b6b6588"], "targets": ["pfaa5afa2b716f7bab75d1613a88ea2450c13af14"] },
                { id: "replace-me", "sources": ["p89ec3ac28196af9a4a8efc297d0ff2f85b6b6588"], "targets": ["p99f69aae3b525dd15d39f983f6b344962c88d73f"] },
                { id: "replace-me", "sources": ["peb1f6acff4e8d5b010f3e694d84b9b19e79c8829"], "targets": ["pc22f403b5f4478578e5585e675d8a72caea0a054"] },
                { id: "replace-me", "sources": ["peb1f6acff4e8d5b010f3e694d84b9b19e79c8829"], "targets": ["pd15424127bcd9083700b4af03d2bfaa4aac42895"] },
                { id: "replace-me", "sources": ["p721583733d29bd754dc35584f041f37d94776220"], "targets": ["p1f97ca204c36c439a1a33e2604a5d0b68dd5e24b"] },
                { id: "replace-me", "sources": ["p8f000ac8289d7bd87bcb625485b84bfddba1aaa2"], "targets": ["p6d18aef6ae1a5f0e9676866dd1148c851c22e7b0"] },
                { id: "replace-me", "sources": ["p8f000ac8289d7bd87bcb625485b84bfddba1aaa2"], "targets": ["p86df6e3abf17cdbf71c05051bbfc1aafd221d76c"] },
                { id: "replace-me", "sources": ["pb1437bf66b0ba44424160872865ade472b994287"], "targets": ["p6d18aef6ae1a5f0e9676866dd1148c851c22e7b0"] },
                { id: "replace-me", "sources": ["p246c31ce470605a7ec098c5f51fa749a081e54d8"], "targets": ["p0fc0dd4ad67b91d214cc573c63f1373cea8b8df2"] },
                { id: "replace-me", "sources": ["p246c31ce470605a7ec098c5f51fa749a081e54d8"], "targets": ["pdc990a10cc39d8ac481e0e49a08508d5dcbb2604"] },
                { id: "replace-me", "sources": ["p4b712fdef386c9634e0c5f32e8f05f935aaf049a"], "targets": ["pe81af62d7e8a9640e9256ca97f4a0f2909ca2cf8"] },
                { id: "replace-me", "sources": ["p45ef3a25c5e1ce3cd6abb935dfa866c7bf854a23"], "targets": ["pd18d147392e9c9466bac1f5fbaddd26fb6d6d3a1"] },
                { id: "replace-me", "sources": ["pd4e82afd4f6a66e1fc157bda466fbec1f4d00d47"], "targets": ["p2e4b77180ab512414192653658a770d3bf50e145"] },
                { id: "replace-me", "sources": ["p228b60e985309a6463d060a349c5aad8ad89f2e9"], "targets": ["p86df6e3abf17cdbf71c05051bbfc1aafd221d76c"] },
                { id: "replace-me", "sources": ["pe684b11f1572d1046cd3f3c73165ae27b3270863"], "targets": ["paeaf13a43eccf1e3f2ae17c9a505227ba004559f"] },
                { id: "replace-me", "sources": ["pdacc1168634f1edeec01b353286cf4fa13d9e0b1"], "targets": ["p1f97ca204c36c439a1a33e2604a5d0b68dd5e24b"] },
                { id: "replace-me", "sources": ["p5d28c51ad48ab2fb1ed987cef43218d48e9f19e5"], "targets": ["p6d18aef6ae1a5f0e9676866dd1148c851c22e7b0"] },
                { id: "replace-me", "sources": ["p5d28c51ad48ab2fb1ed987cef43218d48e9f19e5"], "targets": ["p228b60e985309a6463d060a349c5aad8ad89f2e9"] },
                { id: "replace-me", "sources": ["p5d28c51ad48ab2fb1ed987cef43218d48e9f19e5"], "targets": ["p86df6e3abf17cdbf71c05051bbfc1aafd221d76c"] },
                { id: "replace-me", "sources": ["p5d28c51ad48ab2fb1ed987cef43218d48e9f19e5"], "targets": ["p495608fe85647e1e7f5271f7b9289229d7bad6e4"] },
                { id: "replace-me", "sources": ["p5d28c51ad48ab2fb1ed987cef43218d48e9f19e5"], "targets": ["pacc768fbcfd136c3e2db38f3a89a167ceef22bf0"] },
                { id: "replace-me", "sources": ["pf8724f217733c85c0553449462e3bb9dd7f86128"], "targets": ["pa7fb93e5ba57c4a069b2d586edd468693756489b"] },
                { id: "replace-me", "sources": ["pf8724f217733c85c0553449462e3bb9dd7f86128"], "targets": ["pa7fb93e5ba57c4a069b2d586edd468693756489b"] },
                { id: "replace-me", "sources": ["p9820a23c18fbd147dac9674fddffab50efb80be4"], "targets": ["p5cfb6047731abfdd4452a0faa58492443177ba7c"] },
                { id: "replace-me", "sources": ["pd18d147392e9c9466bac1f5fbaddd26fb6d6d3a1"], "targets": ["p86df6e3abf17cdbf71c05051bbfc1aafd221d76c"] },
                { id: "replace-me", "sources": ["pd18d147392e9c9466bac1f5fbaddd26fb6d6d3a1"], "targets": ["p7477c2e7394196663d3e457ce388709bd2e82a10"] },
                { id: "replace-me", "sources": ["p330d24433d5573f2e3d1ad6f8e7b0156330b1515"], "targets": ["p3c495e9979288d5daf7714b5baddf01d713e11d6"] },
                { id: "replace-me", "sources": ["p2bb91242206b674e19c92ff7ee92b0090f4b78ef"], "targets": ["p5d28c51ad48ab2fb1ed987cef43218d48e9f19e5"] },
                { id: "replace-me", "sources": ["p3c495e9979288d5daf7714b5baddf01d713e11d6"], "targets": ["p6d18aef6ae1a5f0e9676866dd1148c851c22e7b0"] },
                { id: "replace-me", "sources": ["p3c495e9979288d5daf7714b5baddf01d713e11d6"], "targets": ["p8f000ac8289d7bd87bcb625485b84bfddba1aaa2"] },
                { id: "replace-me", "sources": ["p3c495e9979288d5daf7714b5baddf01d713e11d6"], "targets": ["p244af486010babf741193c0e2c6c1b56f5abb5ab"] },
                { id: "replace-me", "sources": ["p3c495e9979288d5daf7714b5baddf01d713e11d6"], "targets": ["p86df6e3abf17cdbf71c05051bbfc1aafd221d76c"] },
                { id: "replace-me", "sources": ["p81619e2a3f4fb7ca29a3c7a06d9dcbd3f00c9934"], "targets": ["p86df6e3abf17cdbf71c05051bbfc1aafd221d76c"] },
                { id: "replace-me", "sources": ["p81619e2a3f4fb7ca29a3c7a06d9dcbd3f00c9934"], "targets": ["p228b60e985309a6463d060a349c5aad8ad89f2e9"] },
                { id: "replace-me", "sources": ["p7477c2e7394196663d3e457ce388709bd2e82a10"], "targets": ["p86df6e3abf17cdbf71c05051bbfc1aafd221d76c"] },
                { id: "replace-me", "sources": ["p6334369e9d1b6b55061bbbc3129534c42948073d"], "targets": ["p8f000ac8289d7bd87bcb625485b84bfddba1aaa2"] },
                { id: "replace-me", "sources": ["p6334369e9d1b6b55061bbbc3129534c42948073d"], "targets": ["p6d18aef6ae1a5f0e9676866dd1148c851c22e7b0"] },
                { id: "replace-me", "sources": ["p6334369e9d1b6b55061bbbc3129534c42948073d"], "targets": ["p81619e2a3f4fb7ca29a3c7a06d9dcbd3f00c9934"] },
                { id: "replace-me", "sources": ["p6334369e9d1b6b55061bbbc3129534c42948073d"], "targets": ["p228b60e985309a6463d060a349c5aad8ad89f2e9"] },
                { id: "replace-me", "sources": ["p6334369e9d1b6b55061bbbc3129534c42948073d"], "targets": ["p244af486010babf741193c0e2c6c1b56f5abb5ab"] },
                { id: "replace-me", "sources": ["p6334369e9d1b6b55061bbbc3129534c42948073d"], "targets": ["p86df6e3abf17cdbf71c05051bbfc1aafd221d76c"] },
                { id: "replace-me", "sources": ["p6334369e9d1b6b55061bbbc3129534c42948073d"], "targets": ["p495608fe85647e1e7f5271f7b9289229d7bad6e4"] },
                { id: "replace-me", "sources": ["p6334369e9d1b6b55061bbbc3129534c42948073d"], "targets": ["pacc768fbcfd136c3e2db38f3a89a167ceef22bf0"] },
                { id: "replace-me", "sources": ["p20df4030efc217c1a24c9467cadd6351a581c90e"], "targets": ["pf8724f217733c85c0553449462e3bb9dd7f86128"] },
                { id: "replace-me", "sources": ["p20df4030efc217c1a24c9467cadd6351a581c90e"], "targets": ["p6b870b0ea7f281d1d20d801b7cedc7f4ad2bb35c"] },
                { id: "replace-me", "sources": ["p20df4030efc217c1a24c9467cadd6351a581c90e"], "targets": ["pde50d032fd2f520375331121c28d8ac6bf390768"] },
                { id: "replace-me", "sources": ["p20df4030efc217c1a24c9467cadd6351a581c90e"], "targets": ["pf0ea2a7075e6420e4fde019e375b6aaf22b18dc1"] },
                { id: "replace-me", "sources": ["p20df4030efc217c1a24c9467cadd6351a581c90e"], "targets": ["peb1f6acff4e8d5b010f3e694d84b9b19e79c8829"] },
                { id: "replace-me", "sources": ["p20df4030efc217c1a24c9467cadd6351a581c90e"], "targets": ["pd4e82afd4f6a66e1fc157bda466fbec1f4d00d47"] },
                { id: "replace-me", "sources": ["p20df4030efc217c1a24c9467cadd6351a581c90e"], "targets": ["p1b50eaf6caf11b5f74971be7b205fdfc60663202"] },
                { id: "replace-me", "sources": ["p20df4030efc217c1a24c9467cadd6351a581c90e"], "targets": ["paa675959f9dc43b343b6dd4ec4d7cf107727cccd"] },
                { id: "replace-me", "sources": ["p20df4030efc217c1a24c9467cadd6351a581c90e"], "targets": ["p330d24433d5573f2e3d1ad6f8e7b0156330b1515"] },
                { id: "replace-me", "sources": ["p20df4030efc217c1a24c9467cadd6351a581c90e"], "targets": ["p5cfb6047731abfdd4452a0faa58492443177ba7c"] },
                { id: "replace-me", "sources": ["p20df4030efc217c1a24c9467cadd6351a581c90e"], "targets": ["p53c97e025a9fffbc3634a6f3870e37e518f49181"] },
                { id: "replace-me", "sources": ["p20df4030efc217c1a24c9467cadd6351a581c90e"], "targets": ["pe70e11e6c0a6a738efbecd36ad0785d256604ea2"] },
                { id: "replace-me", "sources": ["p20df4030efc217c1a24c9467cadd6351a581c90e"], "targets": ["p5a52b83f4e509401b3bab7c52f0ce7a86c86d7ad"] },
                { id: "replace-me", "sources": ["p20df4030efc217c1a24c9467cadd6351a581c90e"], "targets": ["pd233b1c6592ac23f8abf3ada06aee78ce13e24b6"] },
                { id: "replace-me", "sources": ["p20df4030efc217c1a24c9467cadd6351a581c90e"], "targets": ["p70f78767b6a49e9eb9b5a56999a67e817b83dd4d"] },
                { id: "replace-me", "sources": ["p20df4030efc217c1a24c9467cadd6351a581c90e"], "targets": ["p4b712fdef386c9634e0c5f32e8f05f935aaf049a"] },
                { id: "replace-me", "sources": ["p20df4030efc217c1a24c9467cadd6351a581c90e"], "targets": ["p2bb91242206b674e19c92ff7ee92b0090f4b78ef"] },
                { id: "replace-me", "sources": ["p20df4030efc217c1a24c9467cadd6351a581c90e"], "targets": ["p45ef3a25c5e1ce3cd6abb935dfa866c7bf854a23"] },
                { id: "replace-me", "sources": ["p20df4030efc217c1a24c9467cadd6351a581c90e"], "targets": ["pe684b11f1572d1046cd3f3c73165ae27b3270863"] },
                { id: "replace-me", "sources": ["p20df4030efc217c1a24c9467cadd6351a581c90e"], "targets": ["p66473a1ac285c5ac495e6f9224db22a438b9fd85"] },
                { id: "replace-me", "sources": ["p20df4030efc217c1a24c9467cadd6351a581c90e"], "targets": ["p8d5696e3ea143b6e940ec8a919dc5798b3da2bd9"] },
                { id: "replace-me", "sources": ["p20df4030efc217c1a24c9467cadd6351a581c90e"], "targets": ["p3cbea8e42380fdfa96585229754b40045a9a71ba"] },
                { id: "replace-me", "sources": ["p20df4030efc217c1a24c9467cadd6351a581c90e"], "targets": ["p9820a23c18fbd147dac9674fddffab50efb80be4"] },
            ].map((e, i) => {
                e.id = `e${i}`;
                const { sources, targets } = e;
                e.sources = targets;
                e.targets = sources;
                return e;
            }) as ElkExtendedEdge[]
        }

        const res = await this.elk.layout(graph, { layoutOptions: { direction: "right" } });

        const container = d3.select(this.ref).append("svg")
            .attr("width", () => this.ref.getBoundingClientRect().width)
            .attr("height", () => this.ref.getBoundingClientRect().height);
        container.append("svg:defs").append("svg:marker")
            .attr("id", "triangle")
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 10)
            .attr("refY", 0)
            .attr("markerWidth", 4)
            .attr("markerHeight", 4)
            .append("path")
            .attr("d", "M0,-5L10,0L0,5")
            .style("fill", "black");

        var edges = res.edges.map((edge: ElkExtendedEdge) => {
            const sec = edge.sections[0];

            const coords: ElkPoint[] = [];
            coords.push(sec.startPoint);
            (sec.bendPoints || []).forEach(p => coords.push(p));
            coords.push(sec.endPoint);
            return coords;
        });
        container.selectAll("edges")
            .data(edges)
            .enter()
            .append("path")
            .attr("d", edge =>
                d3.line<ElkPoint>()
                    .x(p => p.x)
                    .y(p => p.y)
                    .curve(d3.curveStep)(edge))
            .attr("stroke", "#343779")
            .attr("stroke-width", 1)
            .attr("fill", "none")
            .attr("marker-end", "url(#triangle)");

        this.nodes = container.selectAll("nodes")
            .data(res.children, (n: ElkNode) => n.id)
            .enter()
            .append("rect")
            .attr("x", n => n.x)
            .attr("y", n => n.y)
            .attr("width", n => n.width)
            .attr("height", n => n.height)
            .style("stroke", "white")
            .on("click", (n) => {
                const status = this.state.nodes.get(n.id).status;
                if (status == "building") {
                    this.setNodeStatus(n.id, "built");
                } else if (status == "built") {
                    this.setNodeStatus(n.id, "waiting");
                } else {
                    this.setNodeStatus(n.id, "building");
                }
            });
        container.selectAll("text")
            .data(res.children, (n: ElkNode) => n.id)
            .enter()
            .append("text")
            .style("font-size", "10")
            .style("font-familty", "sans-serif")
            .style("text-align", "center")
            .style("color", "white")
            .attr("x", n => n.x + 2)
            .attr("y", n => n.y + 16)
            .attr("width", n => n.width)
            .attr("height", n => n.height - 4)
            .text(n => n.id);
        this.updateNodes();
    }

    protected updateNodes() {
        if (!this.nodes) {
            return;
        }

        this.nodes
            .transition()
            .duration(400)
            .style("fill", n => {
                console.log("fill", n.id)
                const status = this.state.nodes.get(n.id).status;
                let fill = "";
                if (status == "building") {
                    fill = "#FFA646";
                } else if (status == "built") {
                    fill = "#33A9AC";
                } else {
                    fill = "#F86041";
                }
                return fill;
            });
    }

    protected setNodeStatus(id: string, status: NodeStatus) {
        const nodes = this.state.nodes;
        const node = nodes.get(id);
        if (!node) {
            return;
        }

        node.status = status;
        nodes.set(id, node);
        this.setState({ nodes });
    }

    render() {
        this.updateNodes();

        const style = { width: "100vh", height: "100vw", };
        return <React.Fragment>
            <canvas style={{ display: "none" }} ref={mountPoint => (this.canvas = mountPoint)}></canvas>
            <div style={style} ref={mountPoint => (this.ref = mountPoint)} />
        </React.Fragment>;
    }

}